"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type ValueType = {
  name: string;
  about: string;
  social_media: string;
};

const CreateProfileInfo = () => {
  const params = useParams();
  const router = useRouter();

  const [file, setFile] = useState<File | string>("");
  const [imageUrl, setImageUrl] = useState("");

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
    defaultValues: {
      name: "",
      about: "",
      social_media: "",
    },
  });

  const handleImage = (event: ChangeEvent) => {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    setImageUrl(window.URL.createObjectURL(file));
    setFile(file);
  };
 

  // const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const UPLOAD_PRESET = "ml_default";
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const user_id = params.id;
  const onSubmit = async (value: ValueType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const { url } = await response.json();

    const profileResponse = await axios.post(`${BASE_URL}/profiles`, {
      id: uuidv4(),
      name: value.name,
      about: value.about,
      avatar_image: url,
      social_media_url: value.social_media,
      user_id: params.id,
    });

    toast(`${profileResponse.data.message}`)

    router.push(`/bank-card/${user_id}`);
  };

  return (
    <div className="space-y-6 w-1/3  place-self-center my-70">
      <h1 className="text-2xl font-semibold">Complete your profile page</h1>
      <div>
        <div>
          <Label htmlFor="avatar_image">
            <p> Add photo</p>
            <div>
              {imageUrl ? (
                <img src={imageUrl} className="w-40 h-40 rounded-full" />
              ) : (
                <div className="w-40 h-40 rounded-full border border-dashde"></div>
              )}
            </div>
          </Label>
          <input
            className="hidden"
            type="file"
            id="avatar_image"
            onChange={handleImage}
          ></input>
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
                    <Textarea
                      placeholder="Write about yourself here"
                      {...field}
                    />
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
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProfileInfo;
