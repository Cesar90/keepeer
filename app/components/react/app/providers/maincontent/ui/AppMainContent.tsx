import {
    memo, Suspense, useEffect, useState,
} from 'react';
import { RootComponents } from '../config/mainContentConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { Portal } from '@/shared/ui/Portal';
import {
    Separator, SidebarInset, SidebarProvider, SidebarTrigger,
} from '@/shared/ui/shadcn/new-york';
import CookieService from '@/shared/lib/utils/CookieService';
import { AppSidebar } from './AppSidebar';
// import { useUser } from '../../StoreProvider/user/userProvider';

const AppMainContent = () => {
    // const [currentMainContentComponent, setCurrentMainContentComponent] = useState<JSX.Element | null>(null);
    const [currentPage, setCurrentPage] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    // const { userLogged } = useUser();

    useEffect(() => {
        const sidebarState = CookieService.getCookie('sidebar:state');
        if (sidebarState) {
            setIsSidebarOpen(sidebarState === 'true');
        }
    }, []);

    useEffect(() => {
        const currentPage = document.getElementById('rc-currentPage')?.getAttribute('data-current-page');
        console.log(currentPage)
        if (currentPage) {
            setCurrentPage(currentPage);
        } else {
            alert("Can't find html element in django template for render React components");
        }
    }, []);

    // if (!currentPage || !userLogged) {
    if (!currentPage) {
        // return null;
        console.error(`No React component found for currentPage: '${currentPage}'`);
        return (
            <div style={{ padding: 20, color: 'red' }}>
                Error: No component mapped for <strong>{currentPage}</strong>.
            </div>
        );
    }

    return (
        <Portal element={currentPage}>
            <Suspense fallback={<PageLoader />}>
                {/* <SidebarProvider defaultOpen={isSidebarOpen}>
                    {(userLogged.is_superuser || userLogged.superadmin) && <AppSidebar />}
                    <SidebarInset>
                        {(userLogged.is_superuser || userLogged.superadmin) && (
                            <header className="flex h-16 shrink-0 items-center gap-2">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                </div>
                            </header>
                        )}
                        {RootComponents[currentPage]}
                    </SidebarInset>
                </SidebarProvider> */}
                <SidebarProvider defaultOpen={isSidebarOpen}>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                            </div>
                        </header>
                        {RootComponents[currentPage]}
                    </SidebarInset>
                </SidebarProvider>
            </Suspense>
        </Portal>
    );
};

export default memo(AppMainContent);
