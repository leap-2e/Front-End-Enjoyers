"use client"

import { Header } from "@/app/_components/Header";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { CreatorType } from "@/app/_components/Explore";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from "jwt-decode";
import { DecodeType } from "../../view/page";
import { toast } from "sonner";

type ValueType = {
    social_media_url: string,
    special_message: string,
}

export default function ExploreOthers() {
    const params = useParams();
    const [userId, setUserId] = useState("");
    const [creator, setCreator] = useState<CreatorType>();
    const [buttonValue, setButtonValue] = useState<number>();
    const [donorId, setDonorId] = useState("")

    useEffect(() => {
        const getUserId = async () => {
            const response = await axios.get(`${BASE_URL}/users?username=${params.name}`);
            setUserId(response.data.users[0].id)
        }
        getUserId();
    }, [params.name])

    useEffect(() => {
        const getCreatorInfo = async () => {
            const response = await axios.get(`${BASE_URL}/profiles?user_id=${userId}`);
            setCreator(response.data.profile[0])
        }
        getCreatorInfo()
    }, [userId])

    // console.log(creator);

    const formSchema = z.object({
        social_media_url: z.string(),
        special_message: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            social_media_url: "",
            special_message: "",
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            const decode: DecodeType = jwtDecode(token)
            setDonorId(decode.id)
        }
    }, [])

    const onSubmit = async (value: ValueType) => {
        const response = await axios.post(`${BASE_URL}/donations`, {
            id: uuidv4(),
            amount: buttonValue,
            special_message: value.special_message,
            social_media_url: value.social_media_url,
            donor_id: donorId,
            recipient_id: userId,
        })
        toast(`${response.data.message}`)
    }

    return (
        <div className="w-full h-screen">
            <Header />


            <div className="w-full h-[319px] bg-[#F4F4F5] flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${creator?.background_image ? creator?.background_image : ""})` }}>
            </div>

            <div className="w-[90%] gap-5 mt-[-100px] mx-auto flex">
                <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-5 justify-self-center">
                    <div className="w-full h-[233px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <div className="w-full h-[48px] flex justify-between">
                            <div className="w-[107px] h-[48px] flex gap-3 items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="w-[83px] h-[20px] font-bold">{`${creator?.name}`}</p>
                            </div>
                        </div>

                        <div className="w-full h-[33px] flex justify-center items-center">
                            <Separator />
                        </div>

                        <div className="w-full h-[88px]">
                            <h6 className="w-full h-[36px] self-center text-black font-semibold">
                                {`About ${creator?.name}`}
                            </h6>
                            <p className="w-full h-fit">
                                {creator?.about}
                            </p>
                        </div>
                    </div>

                    <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <h6 className="w-full h-[36px] self-center text-black font-semibold">
                            Social media URL
                        </h6>
                        <p>{creator?.social_media_url}</p>
                    </div>

                    <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
                        <h6 className="w-full h-[36px] self-center text-black font-semibold">
                            Recent Supporters
                        </h6>
                        <div className="w-full h-[140px] border border-[#F4F4F5] rounded-md flex justify-center items-center">
                            <div>
                                <p className="justify-self-center">
                                    <Heart fill="black" />
                                </p>
                                <h6 className="text-black font-semibold">
                                    {`Be the first one to support ${creator?.name}`}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-8 border border-[#F4F4F5] p-6">
                    <div className="w-full h-[122px]">
                        <h1 className="w-[full] h-[36px] text-black font-bold mb-6">
                            Buy Jake a Coffee
                        </h1>
                        <div className="w-full h-[62px]">
                            <p>Select amount:</p>
                            <div className="h-[40px] flex gap-3">
                                <button onClick={() => setButtonValue(1)} className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $1
                                </button>
                                <button onClick={() => setButtonValue(2)} className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $2
                                </button>
                                <button onClick={() => setButtonValue(5)} className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $5
                                </button>
                                <button onClick={() => setButtonValue(10)} className="bg-[#F4F4F5] rounded-md flex gap-2 items-center py-2 px-4">
                                    <Coffee /> $10
                                </button>
                            </div>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="social_media_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter buy coffee or social media URL</FormLabel>
                                        <FormControl>
                                            <Input type="url" placeholder="buymecoffee.com/" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="special_message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Please write your message here"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Support
                            </Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}