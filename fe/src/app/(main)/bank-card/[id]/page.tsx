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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BASE_URL, countries, months, years } from "@/constants"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { CardType } from "@/types"

const CreatePaymentInfo = () => {

    const router = useRouter();
    const params = useParams();

    const formSchema = z.object({
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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "",
            first_name: "",
            last_name: "",
            card_number: "",
            expiry_month: "",
            expiry_year: "",
            cvv: "",
        },
    });

    const onSubmit = async (value: CardType) => {
         const cardInfo = await axios.post(`${BASE_URL}/cards`, { id: uuidv4(), country: value.country, first_name: value.first_name, last_name: value.last_name, card_number: value.card_number, expiry_year: value.expiry_year, expiry_month: value.expiry_month, cvv: value.cvv, user_id: params.id });
         
        toast("Amjilttai burtgegdlee")
        router.push("/dashboard")
    }

    return (
        <div className="w-1/3 place-self-center my-70 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    How would you like to paid
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
                                name="first_name"
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
                                name="last_name"
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
                            name="card_number"
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
                                name="expiry_month"
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
                                name="expiry_year"
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
                                            <Input {...field} placeholder="CVV" type="number"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                        </div>
                        <div className="w-full flex justify-end mt-5">
                            <Button type="submit" className="w-1/2">Continue</Button>
                        </div>
                    </form>
                </Form>


            </div>
        </div>
    )
}

export default CreatePaymentInfo 