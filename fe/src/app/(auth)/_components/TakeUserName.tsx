"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { BASE_URL } from '@/constants'
import { toast } from 'sonner'

type ValueType = {
  userName: string,
}

type UserType = {
  card_id: string,
  created_at: Date,
  email: string,
  id: number,
  password: string,
  profile_id: string,
  updated_at: Date,
  username: string,
}

const TakeUserName = ({ currentStep, setCurrentStep }) => {
  const formSchema = z.object({
    userName: z.string().min(6, {
      message: "User name must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  const onSubmit = async (value: ValueType) => {

    const getUsers = await axios.get(`${BASE_URL}/users`);;

    const data = getUsers.data.users.map((d: UserType) => (d.username));
    if (data.includes(value.userName)) {
     console.log("Username taken")
    } else {
      console.log("Success");
      localStorage.setItem("username", value.userName);
      setCurrentStep(currentStep + 1);
    }

  }
  return (
    <div className="w-1/2 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Create your account
        </h1>
        <p className='text-sm text-muted-foreground'>
          Chooose a username for your page
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
            <Button type="submit" className="w-full mt-3">Continue</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { TakeUserName }