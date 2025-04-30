"use client";
import { useEffect, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { BASE_URL } from "@/constants";
import Link from "next/link";

export type CreatorType = {
  id: string,
  about: string,
  avatar_image: string,
  name: string,
  social_media_url: string,
  user_id: string,
}

export function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [creators, setCreators] = useState([])

  useEffect(() => {
    const getCreators = async () => {
      const response = await axios.get(`${BASE_URL}/profiles/all`);
      setCreators(response.data.profiles)
    }
    getCreators();
  }, [])

  const filteredCreators = creators.filter((creator: CreatorType) =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-3/4 max-h-screen overflow-auto">
      <div className="max-w-4xl mx-auto p-6 pt-[100px]">
        <h1 className="text-2xl font-bold mb-6">Explore creators</h1>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search name"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {filteredCreators.map((creator: CreatorType) => (
            <Card key={creator.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={creator.avatar_image} alt={creator.name} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{creator.name}</h3>
                    </div>
                  </div>
                  <Link href={`/explore-creators/${creator.user_id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      View profile
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">About {creator.name}</h4>
                    <p className="text-sm text-gray-600">{creator.about}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Social media URL</h4>
                    <a
                      href={creator.social_media_url}
                      className="text-sm text-blue-600 break-all hover:underline"
                    >
                      {creator.social_media_url}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
