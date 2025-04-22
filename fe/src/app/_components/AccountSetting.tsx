import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Coffee } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowUpRight } from "lucide-react";


const AccountSetting = () => {
    return (
        <div>
      <div className="flex justify-between p-[30px] ">
            <div className="flex gap-2">
                <Coffee />
                <p className="text-[16px] font-bold">Buy me coffee</p>

            </div>
            <div className="flex justify-between gap-[80px]">
              <div className="flex gap-2">
              <Avatar className="w-10 h-10">
                    <AvatarImage src="https://s3-alpha-sig.figma.com/img/a8aa/a0a8/9e2cb6e8ec344dea3ade469a624a90ef?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IlePVJEwwkw5qq~ooB~u~Nm8o9S74OpqhC02jqpInVOEB-2YGBFS3K76c-4iPOYv6HzLg5TQJdoxGgXkESIMurWsKyyAQu0JktYNpoOxmbRBq5XxaFtfBhdhIM4Z-p4xM7WtbBTmPGMaesFvy2Yo-nOAmgkjmBwkxCn2IAFvopBwKcEcxLIYsiN-DlqVWNOSlzZa1js0mG9JV12QTQxLhhfjy6WQjqblgozGNciHmEmivO-z7rhfgFrVP6p3Ze~oGkhgGFjxryqA83OrHoIW7OHTcu3b~7Bzn380a3EB8LW9o5XUhsiAE4aXdolCORY2BtGNUUok9Rlw4MoSh3Eeng__" alt="@shadcn" />
                  
                </Avatar>
                <p className="mt-1.5 font-semibold">Jack</p>
              </div>
                
                <ChevronDown color="#000000"  className="mt-1.5"/>



            </div>

        </div>
      <div className="flex justify-between">
      <div className="w-[250px] p-[30px]">
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                    <AccordionTrigger>Home</AccordionTrigger>
                    
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Explore</AccordionTrigger>
                    
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>View page</AccordionTrigger>
                    
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Account setting</AccordionTrigger>
                    
                </AccordionItem>
            </Accordion>

        </div>
        <div>
          <p className="font-bold text-[24px mb-[40px]">My Account</p>
          <Tabs defaultValue="account" className="w-[650px]">
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Info</CardTitle>
                  <CardDescription className="mt-[15px] text-black font-semibold">
                    Add Photo
                  </CardDescription>
                  <div className="">
                    <Avatar className="w-[160px] h-[160px]">
                      <AvatarImage src="https://s3-alpha-sig.figma.com/img/a8aa/a0a8/9e2cb6e8ec344dea3ade469a624a90ef?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IlePVJEwwkw5qq~ooB~u~Nm8o9S74OpqhC02jqpInVOEB-2YGBFS3K76c-4iPOYv6HzLg5TQJdoxGgXkESIMurWsKyyAQu0JktYNpoOxmbRBq5XxaFtfBhdhIM4Z-p4xM7WtbBTmPGMaesFvy2Yo-nOAmgkjmBwkxCn2IAFvopBwKcEcxLIYsiN-DlqVWNOSlzZa1js0mG9JV12QTQxLhhfjy6WQjqblgozGNciHmEmivO-z7rhfgFrVP6p3Ze~oGkhgGFjxryqA83OrHoIW7OHTcu3b~7Bzn380a3EB8LW9o5XUhsiAE4aXdolCORY2BtGNUUok9Rlw4MoSh3Eeng__" alt="@shadcn" />

                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Jack" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">About</Label>
                    <Textarea
                      defaultValue="I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
                      className="h-40 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Social media URL</Label>
                    <Input defaultValue="https://buymeacoffee.com/baconpancakes1" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

          </Tabs>

          <div className="mt-[50px]">
            <Card className="w-[650px]">
              <CardHeader>
                <CardTitle>Set a new password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" type="password" placeholder="Enter your new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="password" placeholder="Confirm your password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save changes</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-[50px]">

            <Card className="w-[650px]">
              <CardHeader>
                <CardTitle>Payment details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Select Country */}
                <div className="space-y-2">
                  <Label htmlFor="country">Select Country </Label>
                  <Select>
                    <SelectTrigger id="country" className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mn">Mongolia</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      {/* Нэмэх орнуудаа энд оруулна */}
                    </SelectContent>
                  </Select>
                </div>

                {/* First name & Last name in one row */}
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Jack" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Mulligan" />
                  </div>
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Enter Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    maxLength={19}
                  />
                </div>

                {/* Expiry / Year / CVC */}
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="expMonth">Expires</Label>
                    <Input id="expMonth" placeholder="MM" maxLength={2} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="expYear">Year</Label>
                    <Input id="expYear" placeholder="YYYY" maxLength={4} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" maxLength={3} />
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">Save changes</Button>
              </CardFooter>
            </Card>

          </div>
          <div className="mt-[50px]">
          <Card className="w-[650px]">
      <CardHeader>
        <CardTitle>Success Page</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="confirmation">Confirmation message</Label>
          <Textarea
            id="confirmation"
            className="min-h-[120px]"
            defaultValue={`Thank you for supporting me! It means a lot to have your support. It’s a step toward creating a more inclusive and accepting community of artists.`}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Save changes</Button>
      </CardFooter>
    </Card>

          </div>
        </div>
        <div>

        </div>

      </div>

    </div>
    )

}
export default AccountSetting;