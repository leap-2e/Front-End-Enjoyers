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
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/constants";

export type NewPasswordType = {
  confirmPassword: string,
  newPassword: string
}

export type UserType = {
  username: string,
  email: string,
  password: string,
}

const UpdatePassword = () => {
  const formSchema = z.object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (value: NewPasswordType) => {
    if (value.confirmPassword !== value.newPassword) {
      console.log("Password not match");
    } else {
      const username = localStorage.getItem("username");
      const getUsers = await axios.get(`${BASE_URL}/users`);
      const getEmail = getUsers.data.users.filter(
        (user: UserType) => user.username === username
      );
      const email = getEmail[0].email;

      const setNewPassword = await axios.put(`${BASE_URL}/users/new-password`, {
        email: email,
        password: value.newPassword,
      });
      toast("amjilttai");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Set a new password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePassword;
