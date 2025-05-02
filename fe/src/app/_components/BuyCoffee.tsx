"use client";

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
import { Coffee } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function BuyCoffee() {
  const [border, setBorder] = useState(0);
  const form = useForm();

  const buttonOne = () => {
    setBorder(1)
  };
  const buttonTwo = () => {
    setBorder(2)
  };
  const buttonFive = () => {
    setBorder(5)
  };
  const buttonTen = () => {
    setBorder(10)
  };

  return (
    <div className="w-1/2 h-fit rounded-lg bg-white flex flex-col gap-8 border border-[#F4F4F5] p-6">
      <Form {...form}>
        <div className="flex flex-col gap-8">
          <div className="w-full h-[122px]">
            <h1 className="w-[full] h-[36px] text-black font-bold mb-6">
              Buy Jake a Coffee
            </h1>
            <div className="w-full h-[62px]">
              <p>Select amount:</p>
              <div className="h-[40px] flex gap-3 [&>*]:bg-[#F4F4F5] [&>*]:rounded-md [&>*]:flex [&>*]:gap-2 [&>*]:items-center [&>*]:py-2 [&>*]:px-4 [&>*]:border-2">
                <button onClick={buttonOne} className={`${border === 1 ? "border-black" : "border-transparent"}`}>
                  <Coffee /> $1
                </button>
                <button onClick={buttonTwo} className={`${border === 2 ? "border-black" : "border-transparent"}`}>
                  <Coffee /> $2
                </button>
                <button onClick={buttonFive} className={`${border === 5 ? "border-black" : "border-transparent"}`}>
                  <Coffee /> $5
                </button>
                <button onClick={buttonTen} className={`${border === 10 ? "border-black" : "border-transparent"}`}>
                  <Coffee /> $10
                </button>
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter BuyMeCoffee or social acount URL:</FormLabel>
                <FormControl>
                  <Input disabled placeholder="buymeacoffee.com/" {...field} />
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
                <FormLabel>Special message:</FormLabel>
                <FormControl>
                  <textarea disabled
                    placeholder="Please write your message here"
                    className="h-[131px] border rounded-md py-2 px-3"
                  ></textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Support</Button>
        </div>
      </Form>
    </div>
  );
};
