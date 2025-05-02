"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type ValueType = {
  email: string;
  password: string;
};

const TakeUserInfo = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const username = localStorage.getItem("username") as string;
    setUserName(username);
  }, []);

  const user_id = uuidv4();
  localStorage.setItem("user_id", user_id);

  const onSubmit = async (value: ValueType) => {
    const user = await axios.post(`${BASE_URL}/auth/register`, {
      id: user_id,
      username: userName,
      email: value.email,
      password: value.password,
    });
    router.push(`/create-profile/${user_id}`);
  };

  return (
    <div className="w-1/2 space-y-6">
      <h1 className="text-2xl font-semibold">{` Welcome, ${userName}`}</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-3">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { TakeUserInfo };
