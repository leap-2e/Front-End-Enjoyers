"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import React from "react";
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
import { RightSide } from "../_components/RightSide";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserType = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

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

  const onSubmit = async (value: UserType) => {

    try {
      const res = await axios.post<{ message: string, token: string }>(`${BASE_URL}/auth/login`, {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem('token', res.data.token)
      router.push("/");

    } catch (error) {
      toast((error as Error).message);
    }

  };

  return (
    <div>
      <div className="fixed top-0 bg-transparent flex w-full h-[56px] items-center justify-center">
        <div className="w-[90%] h-[40px] flex justify-between items-center">
          <div className="w-[151px] h-[24px] flex gap-2 items-center">
            <Coffee />
            <p className="text-black font-bold">Buy Me Coffee</p>
          </div>
          <div>
            <Link href="signup">
              <Button variant="secondary" className="bg-secondary">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex">
        <RightSide />
        <div className="w-1/2 h-screen flex items-center justify-center">
          <div className="w-1/2 space-y-6">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
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
                          <Input placeholder="Enter password here" {...field} />
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
        </div>
      </div>
    </div>
  );
};

export default Login;
