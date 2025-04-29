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
import { ChangeEvent, useEffect, useState } from "react"
import { Label } from "@radix-ui/react-label"

type ValueType = {
    name: string,
    about: string,
    social_media: string,
}

type ProfileType = {
    profiles: UserType[]
}

type UserType = {
    user_id: string,
}

type CurrentProfileType = {
    name: string,
    about: string,
    social_media_url: string,
    avatar_image: string
}

const UpdateProfileInfo = () => {

    const params = useParams();
    const [currentProfile, setCurrentProfile] = useState<CurrentProfileType>();
    const [profileId, setProfileId] = useState("");
    const [file, setFile] = useState<File | string>("");
    const [imageUrl, setImageUrl] = useState(currentProfile?.avatar_image)

    const getPrevInfo = async () => {
        const prev = await axios.get(`${BASE_URL}/profiles`);
        const profile = prev.data.profiles.map((profile: ProfileType) => profile).filter((pro: UserType) => {
            if (pro.user_id === params.id) {
                return pro
            }
        });
        setCurrentProfile(profile[0]);
        setProfileId(profile[0].id);
    };

    useEffect(() => {
        getPrevInfo();
    }, [params.id]);

    const formSchema = z.object({
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
        values: {
            name: `${currentProfile?.name ?? ""}`,
            about: `${currentProfile?.about ?? ""}`,
            social_media: `${currentProfile?.social_media_url ?? ""}`,
        }
    });

    const handleImage = (event: ChangeEvent) => {
        const file = ((event.target as HTMLInputElement).files as FileList)[0]
        setImageUrl(window.URL.createObjectURL(file));
        setFile(file)
    }

    const UPLOAD_PRESET = "ml_default";
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", UPLOAD_PRESET);

    const onSubmit = async (value: ValueType) => {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        )

        const { url } = await response.json();

        const profile = await axios.put(`${BASE_URL}/profiles`, { id: profileId, name: value.name, about: value.about, avatar_image: url, social_media_url: value.social_media, user_id: params.id });
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
                Personal info
            </h1>
            <div>
                <div>
                    <Label htmlFor="avatar_image">
                        <p>Add photo</p>
                        {imageUrl ? <img src={imageUrl} className="w-40 h-40 rounded-full" />
                            : <div className="w-40 h-40 rounded-full border border-dashed"></div>}
                    </Label>
                    <input id="avatar_image" className="hidden" type="file" onChange={handleImage}></input>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                            <Button type="submit" className="w-full">Save changes</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default UpdateProfileInfo 