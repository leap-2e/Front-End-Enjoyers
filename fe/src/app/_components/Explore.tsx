'use client';

import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function Explore() {
  const [searchTerm, setSearchTerm] = useState('');

  const creators = [
    {
      id: 1,
      name: 'Space ranger',
      avatar: '/api/placeholder/50/50',
      about: 'All day, every day, we\'re watching, listening to, reading and absorbing politics. It\'s exhausting. We then report on what we\'ve seen in a way that\'s as chill as possible. None of the sensationalism and division you\'ll find elsewhere. It\'s about clarity.',
      socialUrl: 'https://buymeacoffee.com/baconpancakes1'
    },
    {
      id: 2,
      name: 'Purple monster',
      avatar: '/api/placeholder/50/50',
      about: 'Purple monster is for everyone. It handles all the painful experiences and helps people.',
      socialUrl: 'https://buymeacoffee.com/ifmonster23'
    },
    {
      id: 3,
      name: 'Alien Conspiracy',
      avatar: '/api/placeholder/50/50',
      about: 'Show your support ❤️and buy me a coffee! & keep project a live!',
      socialUrl: 'https://buymeacoffee.com/roooaaaamm'
    },
    {
      id: 4,
      name: 'Teams',
      avatar: '/api/placeholder/50/50',
      about: 'Joel 1:14 "Sanctify a fast, call a solemn assembly, gather the elders and all the inhabitants of the land. Cry out to the LORD."My purpose is clear: To seek God\'s face, every Thursday for all my Subscribers to align with His will, and to step into the destiny He has for us.',
      socialUrl: 'https://buymeacoffee.com/kaka0'
    },
    {
      id: 5,
      name: 'Dragons1',
      avatar: '/api/placeholder/50/50',
      about: 'Hello',
      socialUrl: 'https://buymeacoffee.com/dragons1'
    }
  ];

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-3/4'>
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
          {filteredCreators.map(creator => (
            <Card key={creator.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{creator.name}</h3>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    View profile <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">About {creator.name}</h4>
                    <p className="text-sm text-gray-600">{creator.about}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Social media URL</h4>
                    <a href={creator.socialUrl} className="text-sm text-blue-600 break-all hover:underline">
                      {creator.socialUrl}
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

