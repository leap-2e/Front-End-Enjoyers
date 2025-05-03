"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreatorType } from "./Explore";
import { toast } from "sonner";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { ValueType } from "./UpdateProfileInfo";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";

export function EditProfile({ currentProfile }: { currentProfile?: CreatorType | undefined }) {

  const [file, setFile] = useState<File | string>("");
  const [imageUrl, setImageUrl] = useState(currentProfile?.avatar_image);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token as string)
  }, []);


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
    },
  });

  const handleImage = (event: ChangeEvent) => {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    setImageUrl(window.URL.createObjectURL(file));
    setFile(file);
  };

  const UPLOAD_PRESET = "ml_default";
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const formData = new FormData();
  formData.append("file", file as File);
  formData.append("upload_preset", UPLOAD_PRESET);

  const onSubmit = async (value: ValueType) => {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const { url } = await response.json();

    const res = await axios.put(`${BASE_URL}/profiles`, {
      id: currentProfile?.id,
      name: value.name,
      about: value.about,
      avatar_image: url,
      social_media_url: value.social_media,
      user_id: currentProfile?.user_id

    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast(`${res.data.message}`)
  }

  return (
    <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-5 justify-self-center">
      <div>
        <div className="w-full h-[233px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
          <div className="w-full h-[48px] flex justify-between">
            <div className="w-[107px] h-[48px] flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={currentProfile?.avatar_image} />
                <AvatarFallback>{currentProfile?.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="w-[83px] h-[20px] font-bold">{currentProfile?.name}</p>
            </div>

            <Dialog>
              <DialogTrigger>
                <div className="bg-[#F4F4F5] py-2 px-3 rounded-md hover:bg-black hover:text-white">
                  Edit page
                </div>
              </DialogTrigger>
              <DialogContent className="w-3/5 h-fit flex flex-col gap-7">
                <DialogHeader className="h-fit">
                  <DialogTitle>Edit profile</DialogTitle>
                  <p className="text-[#71717A]">
                    Make changes to your profile here. Click save when you're
                    done.
                  </p>
                </DialogHeader>

                <div className="flex justify-start">
                  <Label htmlFor="avatar_image" className="flex flex-col">
                    <p className="font-[500] text-sm text-start">Add photo</p>
                    <div className="w-40 h-40 rounded-full border bg-cover bg-center mt-3 mb-3" style={{ backgroundImage: `url('${imageUrl ? imageUrl : "../assets/user.jpg"}')` }}>
                    </div>
                  </Label>
                  <input
                    id="avatar_image"
                    className="hidden"
                    type="file"
                    onChange={handleImage}
                  ></input>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name..."
                                {...field}
                              />
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
                              <textarea
                                {...field}
                                placeholder="Update your info here"
                                className="h-[131px] border rounded-md py-2 px-3"
                              ></textarea>
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
                              <Input
                                placeholder="Update your social account..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-3 justify-end items-center">
                      <button className="bg-[#F4F4F5] py-[6px] px-4 rounded-md hover:bg-black hover:text-white">
                        Cancel
                      </button>
                      <Button className="py-2 px-4">Save changes</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="w-full h-[33px] flex justify-center items-center">
            <Separator />
          </div>

          <div className="w-full h-[88px]">
            <h6 className="w-full h-[36px] self-center text-black font-semibold">
              {`About ${currentProfile?.name}`}
            </h6>
            <p className="w-full h-fit">
              {currentProfile?.about}
            </p>
          </div>
        </div>

        <div className="w-full min-h-[116px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
          <h6 className="w-full h-[36px] self-center text-black font-semibold">
            Social media URL
          </h6>
          <p>{currentProfile?.social_media_url}</p>
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
                {`Be the first one to support ${currentProfile?.name}`}
              </h6>
            </div>
          </div>
        </div></div>
    </div>
  );
}