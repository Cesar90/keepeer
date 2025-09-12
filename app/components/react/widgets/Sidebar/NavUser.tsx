import { useCallback } from 'react';
import {
    ChevronsUpDown,
    LogOut,
} from 'lucide-react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    ToastAction,
    useSidebar,
} from '@/shared/ui/shadcn/new-york';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { extractErrorMessage } from '@/shared/lib/utils/utils';
import { logout } from '@/entities/users';

interface IProps {
    user: UserLogged
}

export function NavUser({ user }: IProps) {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const { isMobile } = useSidebar();

    const logoutEvent = useCallback(async () => {
        try {
            const result = await dispatch(logout());
            if (logout.rejected.match(result)) {
                const errorMessage = extractErrorMessage(result, '');
                throw new Error(errorMessage);
            }

            window.location.href = '/';
        } catch (error) {
            // alert(error);
            toast({
                variant: 'destructive',
                description: 'Uh oh! Something went wrong.',
                title: `${error}`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    }, [toast, dispatch]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt={user.user_id.toString()}
                                />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.username}</span>
                                {/* <span className="truncate font-semibold">{user.last_name}</span> */}
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt={user.user_id.toString()}
                                    />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.username}</span>
                                    {/* <span className="truncate text-xs">{user.email}</span> */}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuItem onClick={logoutEvent}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
