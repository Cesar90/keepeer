'use client';

import * as React from 'react';
import {
    Command,
    Settings2,
    Sheet,
} from 'lucide-react';
import { NavMain } from '@/widgets/Sidebar/NavMain';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui/shadcn/new-york';
import { useUser } from '../../StoreProvider/user/userProvider';

const sharedItems = {
    invoices: {
        title: 'Invoices',
        url: '#',
        icon: Sheet,
        items: [
            {
                title: 'List',
                url: '/',
            },
            {
                title: 'Create New',
                url: '/invoice/create/',
            },
            {
                title: 'Accounts Receivable',
                url: '/dashboard/invoices/accountsreceivable',
            },
        ],
    },
    paycor: {
        title: 'Paycor',
        url: '#',
        icon: Sheet,
        items: [
            {
                title: 'Generate csv',
                url: '/dashboard/paycor/generatecsv',
            },
        ],
    },
    report: {
        title: 'Report',
        url: '#',
        icon: Sheet,
        items: [
            {
                title: 'Standard',
                url: '/dashboard/reports/standard',
            },
        ],
    },
};

const navMainDashboard = [
    {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        items: [
            {
                title: 'Clients',
                url: '/dashboard/clients',
            },
            {
                title: 'Sub Clients',
                url: '/dashboard/subclients',
            },
            {
                title: 'Employees',
                url: '/dashboard/employees',
            },
            {
                title: 'Jobs or Positions',
                url: '/dashboard/typeofjobsubclient',
            },
            {
                title: 'Employees Clients',
                url: '/dashboard/configemployee',
            },
            // {
            //     title: 'SubClient Parametization',
            //     url: '/dashboard/subclient/parameterization',
            // },
        ],
    },
    ...Object.values(sharedItems).flat(),
    // sharedItems.invoices,
    // sharedItems.paycor,
    // sharedItems.report
];

const navMainPublic = [
    ...Object.values(sharedItems).flat(),
    // sharedItems.invoices,
    // sharedItems.paycor,
    // sharedItems.report
];

// const data = {
//     user: {
//         name: 'shadcn',
//         email: 'm@example.com',
//         avatar: '/avatars/shadcn.jpg',
//     },
//     navSecondary: [
//         {
//             title: 'Support',
//             url: '#',
//             icon: LifeBuoy,
//         },
//         {
//             title: 'Feedback',
//             url: '#',
//             icon: Send,
//         },
//     ],
//     projects: [
//         {
//             name: 'Design Engineering',
//             url: '#',
//             icon: Frame,
//         },
//         {
//             name: 'Sales & Marketing',
//             url: '#',
//             icon: PieChart,
//         },
//         {
//             name: 'Travel',
//             url: '#',
//             icon: Map,
//         },
//     ],
// };
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // const { userLogged } = useUser();

    // if (!userLogged) {
    //     return null;
    // }

    return (
        <Sidebar {...props} className="overflow-hidden">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">CER Inc</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain
                    items={userLogged.is_superuser || userLogged.superadmin
                        ? navMainDashboard
                        : navMainPublic}
                /> */}
                {/* <NavProjects projects={data.projects} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
            </SidebarFooter>
        </Sidebar>
    );
}
