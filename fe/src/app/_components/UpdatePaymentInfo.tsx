"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BASE_URL, countries, months, years } from "@/constants"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const bankCardSchema = z.object({
    country: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    card_number: z.string().length(12, {
        message: "Card number must be exactly 12 characters long"
    }),
    expiry_month: z.string(),
    expiry_year: z.string(),
    cvv: z.string().length(3, {
        message: "CVV must be exactly 3 characters long"
    }),
});

type BankCard = z.infer<typeof bankCardSchema>;

const bankCardUpdateSchema = bankCardSchema.pick({
    country: true,
    first_name: true,
    last_name: true,
    card_number: true,
    expiry_month: true,
    expiry_year: true,
    cvv: true,
})

type BankCardUpdate = z.infer<typeof bankCardUpdateSchema>;


const UpdatePaymentInfo = () => {

    const [cardInfo, setCardInfo] = useState<BankCardUpdate>();
    const [cardId, setCardId] = useState();

    const params = useParams();

    const getCards = async () => {
        const cards = await axios.get(`${BASE_URL}/cards`);
        const card = cards.data.cards.filter((card) => (card.user_id === params.id))
        setCardInfo(card[0]);
        setCardId(card[0].id)
    }
    useEffect(() => {
        getCards();
    }, [params.id])
    console.log(cardInfo, "cardInfo")


    const formSchema = z.object({
        country: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        cardNumber: z.string().length(12, {
            message: "Card number must be exactly 12 characters long"
        }),
        expires: z.string(),
        year: z.string(),
        cvv: z.string().length(3, {
            message: "CVV must be exactly 3 characters long"
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            country: `${cardInfo?.country ?? ""}`,
            firstName: `${cardInfo?.first_name ?? ""}`,
            lastName: `${cardInfo?.last_name ?? ""}`,
            cardNumber: `${cardInfo?.card_number ?? ""}`,
            expires: `${cardInfo?.expiry_month ?? ""}`,
            year: `${cardInfo?.expiry_year ?? ""}`,
            cvv: `${cardInfo?.cvv ?? ""}`,
        }, ///error type nice
    });

    const onSubmit = async (value) => {
        const cardInfo = await axios.put(`${BASE_URL}/cards`, { id: cardId, country: value.country, first_name: value.firstName, last_name: value.lastName, card_number: value.cardNumber, expiry_year: value.year, expiry_month: value.expires, cvv: value.cvv, user_id: params.id });

        toast("Amjilttai shinechlegdlee")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    Payment details
                </h1>
                <p className="text-muted-foreground">
                    Enter your location and payment details
                </p>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select country</FormLabel>
                                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            {countries.map((country) => {
                                                return (
                                                    <SelectItem value={`${country}`} key={uuidv4()}>{country}</SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter your card number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="XXXX-XXXX-XXXX-XXXX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <div className="grid grid-cols-3 gap-3">
                            <FormField
                                control={form.control}
                                name="expires"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expires</FormLabel>
                                        <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                {months.map((month) => {
                                                    return (
                                                        <SelectItem value={`${month}`} key={uuidv4()}>{month}</SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                {years.map((year) => {
                                                    return (
                                                        <SelectItem value={`${year}`} key={uuidv4()}>{year}</SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="CVV" type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                        </div>
                        <div className="w-full flex justify-end mt-5">
                            <Button type="submit" className="w-full">Save changes</Button>
                        </div>
                    </form>
                </Form>


            </div>
        </div>
    )
}

export default UpdatePaymentInfo 