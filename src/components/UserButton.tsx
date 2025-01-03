"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";

interface UserButtonProps {
    className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
    const { user } = useSession();

    const { theme, setTheme } = useTheme();

    const queryClient = useQueryClient();

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            {/* Trigger for the dropdown menu */}
            <DropdownMenuTrigger asChild>
                <button className={cn("flex-none rounded-full", className)}> 
                    <UserAvatar avatarUrl={user.avatarUrl} size={1000} className={className} />
                </button>
            </DropdownMenuTrigger>

            {/* Content of the dropdown menu */}
            <DropdownMenuContent>
                <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/users/${user.username}`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <UserIcon className="mr-2 size-4" />
                        Profile
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSub>
                    {/* Sub-trigger for the sub-menu */}
                    <DropdownMenuSubTrigger className="cursor-pointer">
                        <Monitor className="mr-2 size-4" />
                        Theme
                    </DropdownMenuSubTrigger>

                    {/* Content of the sub-menu */}
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                                <Monitor className="mr-2 size-4" />
                                System default
                                {theme === "system" && <Check className="ms-2 size-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                                <Sun className="mr-2 size-4" />
                                Light
                                {theme === "light" && <Check className="ms-2 size-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                                <Moon className="mr-2 size-4" />
                                Dark
                                {theme === "dark" && <Check className="ms-2 size-4" />}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        queryClient.clear();
                        logout();
                    }}
                    className="cursor-pointer"
                >
                    <LogOutIcon className="mr-2 size-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
