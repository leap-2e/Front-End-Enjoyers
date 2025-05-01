"use client";

import { BASE_URL } from "@/constants";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type DecodeType = {
    email: string,
    id: string,
    username: string
}

export function SideBarComponent() {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode: DecodeType = jwtDecode(token);
            setUserId(decode.id)
        }
    }, []);

    return (
        <div className="min-w-[260px] max-w-[300px] h-screen">
            <nav className="mt-[100px]">
                <ul className="space-y-2">
                    <li>
                        <Link href={`/?user_id=${userId}`}>
                            <span className="block p-2 rounded-md hover:bg-[#F4F4F5]">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/explore">
                            <span className="block p-2 rounded-md hover:bg-[#F4F4F5]">Explore</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/view?user_id=${userId}`}>
                            <span className="flex items-center gap-1 p-2 rounded-md hover:bg-[#F4F4F5]">
                                View page
                                <ExternalLink size={15} />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/settings/${userId}`}>
                            <span className="block p-2 rounded hover:bg-[#F4F4F5]">Account settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
