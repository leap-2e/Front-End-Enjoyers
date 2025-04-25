"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { BASE_URL } from "@/constants"
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "next/navigation"
import Link from "next/link"

// type ValueType = {
//     id: string, 
//     name: string, 
//     about: string, 
//     avatar_image: string, 
//     photo: string,
//     social_media: string,
// }

const CreateProfileInfo = () => {

    const params = useParams();

    const formSchema = z.object({
        photo: z.string(),
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        about: z.string().min(10, {
            message: "About yourself must be at least 10 characters.",
        }),
        social_media: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            photo: "",
            name: "",
            about: "",
            social_media: "",
        },
    });

    const onSubmit = async (value) => {
        const user_id = params.id;
        const profile = await axios.post(`${BASE_URL}/profiles`, { id: uuidv4(), name: value.name, about: value.about, avatar_image: value.photo, social_media_url: value.social_media, user_id });
    }

    return (
        <div className="space-y-6 w-1/3  place-self-center my-70">
            <h1 className="text-2xl font-semibold">
                Complete your profile page
            </h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="photo">
                                        <div className="flex flex-col space-y-3">
                                            <p>Add photo</p>
                                            <div className="border border-dashed rounded-full w-40 h-40"></div>
                                        </div>
                                    </FormLabel>
                                    <FormControl className="hidden">
                                        <Input id="photo" type="file" placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write about yourself here" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="social_media"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Social media URL</FormLabel>
                                    <FormControl>
                                        <Input type="url" placeholder="https://" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <div className="w-full flex justify-end mt-5">
                            <Link href={`/bank-card/${params.id}`} className="w-1/2"><Button type="submit" className="w-full">Continue</Button></Link>
                        </div>
                    </form>
                </Form>


            </div>
        </div>
    )
}

export default CreateProfileInfo 