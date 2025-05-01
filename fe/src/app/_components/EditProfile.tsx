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

export function EditProfile({ currentProfile }: { currentProfile?: CreatorType | undefined }) {
  const form = useForm();

  return (
    <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-5 justify-self-center">
      <div>
        <div className="w-full h-[233px] p-6 gap-2 border border-[#F4F4F5] rounded-md">
          <div className="w-full h-[48px] flex justify-between">
            <div className="w-[107px] h-[48px] flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={currentProfile?.avatar_image} />
                <AvatarFallback>CN</AvatarFallback>
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

                <Form {...form}>
                  <form className="flex flex-col gap-6">
                    <div>Add photo</div>
                    <Avatar className="w-[160px] h-[160px]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>name</FormLabel>
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
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                              <textarea
                                placeholder="Please write your message here"
                                className="h-[131px] border rounded-md py-2 px-3"
                              ></textarea>
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
                            <FormLabel>Social media URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your social account..."
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
