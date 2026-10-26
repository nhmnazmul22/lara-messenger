"use client";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import {getImgUrl} from "@/utils/img";
import React from 'react';
import {Button} from "@/components/ui/button";
import {MessageCircle} from "lucide-react";
import {User} from "@/types/user";

const UserListCard = ({user}: {user: User}) => {
    return (
        <div
            key={user.id}
            className="flex cursor-default justify-between items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted/70"
        >
            <div className="flex items-center gap-2">
                <Avatar size="lg" className="shrink-0">
                    {user.avatar ?
                        <Image src={getImgUrl(user.avatar) ?? ""} alt={user.name} width={400} height={400}/>:
                        <AvatarFallback className={'bg-emerald-600 text-white'}>{user.name[0]}</AvatarFallback>
                    }
                </Avatar>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </div>
            <Button size={'icon'} className={'cursor-pointer'} title='Start conversatioin'>
                <MessageCircle/>
            </Button>
        </div>
    );
};

export default UserListCard;