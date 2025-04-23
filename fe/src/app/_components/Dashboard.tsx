"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 200;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const text =
    "Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn’t that much money it’s all I can contribute at the moment. When I become successful I will be sure to buy you more gifts and donations. Thank you again. ";

  const isLongText = text.length > limit;
  const displayText =
    isExpanded || !isLongText ? text : text.slice(0, limit) + "...";

  const options: any = [
    { label: "$1", value: "1" },
    { label: "$2", value: "2" },
    { label: "$5", value: "5" },
    { label: "$10", value: "10" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>([]);
  const dropdownRef: any = useRef(null);

  const toggleOption = (value: any) => {
    setSelected((prev: any) =>
      prev.includes(value)
        ? prev.filter((v: any) => v !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-3/4">
      <div className="w-full h-[257px] p-6 mt-[100px]">
        <Card>
          <CardHeader>
            <div className="">
              <div className="flex justify-between">
                <div className="flex  gap-1">
                  <img className="w-12 h-12" src="AvatarImage.png" alt="" />
                  <div className="flex flex-col  ml-2 mt-2 gap-1">
                    <CardTitle>Jake </CardTitle>
                    <CardDescription>
                      <p>buymeacoffee.com/baconpancakes1</p>
                    </CardDescription>
                  </div>
                </div>
                <div>
                  <button className="w-[159px] h-[40px] bg-black text-white rounded-lg ">
                    <p>
                      <img
                        className="inline-block mr-3"
                        src="copy.png"
                        alt=""
                      />
                      Share page link
                    </p>
                  </button>
                </div>
              </div>
              <Separator className="m-7" />
              <div>
                <div className="flex gap-4">
                  <h4 className="mt-1">Earnings</h4>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Last 30 days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Last 30 days</SelectItem>
                      <SelectItem value="dark">Last 90 days</SelectItem>
                      <SelectItem value="system">All times</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <h1 className="font-bold text-4xl mt-4">$450</h1>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="w-full h-[716px] p-6">
        <div className="flex justify-between pt-4  pb-1">
          <h1 className="font-semibold text-base">Recent transactions</h1>
          <div className="relative mb-2">
            <button
              className="w-[109px] h-[36px] border px-4 py-2 text-left rounded-md bg-white shadow flex justify-center items-center gap-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* <img className="w-2 h-1 mt-2" src="Vector.png" alt="" /> */}
              <ChevronDown />
              {selected.length > 0
                ? selected.map((val: any) => `$${val}`).join(", ")
                : "Amount"}
            </button>

            {isOpen && (
              <div
                className="absolute z-10 mt-1 w-full border rounded bg-white shadow"
                ref={dropdownRef}
              >
                {options.map((option: any) => (
                  <label
                    key={option.value}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(selected || []).includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-[12px] p-3">
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <img className="w-10 h-10" src="Avatarcn.png" alt="" />
                    <div className="flex flex-col  ml-1 mt-1 gap-1">
                      <CardTitle>Guest</CardTitle>
                      <CardDescription>
                        <p>instagram.com/welesey</p>
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-base ">+$1</span>
                    <p className="text-[#71717A]">10 hours ago</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm">
                    Thank you for being so awesome everyday! You always manage
                    to brighten up my day when I’m feeling down. Although $1
                    isn’t that much money it’s all I can contribute at the
                    moment{" "}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <img className="w-10 h-10" src="AvatarImage.png" alt="" />
                    <div className="flex flex-col  ml-1 mt-1 gap-1">
                      <CardTitle>John Doe</CardTitle>
                      <CardDescription>
                        <p>buymeacoffee.com/bdsadas</p>
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-base ">+$10</span>
                    <p className="text-[#71717A]">10 hours ago</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm">
                    Thank you for being so awesome everyday!
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-1">
                  <img className="w-10 h-10" src="Avatarcn.png" alt="" />
                  <div className="flex flex-col  ml-1 mt-1 gap-1">
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>
                      <p>buymeacoffee.com/bdsadas</p>
                    </CardDescription>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-base ">+$2</span>
                  <p className="text-[#71717A]">10 hours ago</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-1">
                  <img className="w-10 h-10" src="AvatarImage.png" alt="" />
                  <div className="flex flex-col  ml-1 mt-1 gap-1">
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>
                      <p>buymeacoffee.com/bdsadas</p>
                    </CardDescription>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-base ">+$5</span>
                  <p className="text-[#71717A]">10 hours ago</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <img className="w-10 h-10" src="Avatar.png" alt="" />
                    <div className="flex flex-col  ml-1 mt-1 gap-1">
                      <CardTitle>John Doe</CardTitle>
                      <CardDescription>
                        <p>buymeacoffee.com/bdsadas</p>
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-base ">+$10</span>
                    <p className="text-[#71717A]">10 hours ago</p>
                  </div>
                </div>
                <div className="text-sm ">
                  <p>{displayText}</p>
                  {isLongText && (
                    <button className="underline" onClick={toggleExpand}>
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <img className="w-10 h-10" src="Avatarcn.png" alt="" />
                  <div className="flex flex-col  ml-1 mt-1 gap-1">
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>
                      <p>buymeacoffee.com/bdsadas</p>
                    </CardDescription>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-base ">+$2</span>
                  <p className="text-[#71717A]">10 hours ago</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
