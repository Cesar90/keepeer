import {
    memo, Suspense, useEffect, useState,
} from 'react';
import { RootComponents } from '../config/mainContentConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { Portal } from '@/shared/ui/Portal';
import {
    NavBar,
    Separator, SidebarInset, SidebarProvider, SidebarTrigger,
} from '@/shared/ui/shadcn/new-york';
import CookieService from '@/shared/lib/utils/CookieService';
import { AppSidebar } from './AppSidebar';
import { ComponentRoot } from './maincontent';

const AppMainContent = () => {
    // const [currentMainContentComponent, setCurrentMainContentComponent] = useState<JSX.Element | null>(null);
    const [currentPage, setCurrentPage] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        const sidebarState = CookieService.getCookie('sidebar:state');
        if (sidebarState) {
            setIsSidebarOpen(sidebarState === 'true');
        }
    }, []);

    useEffect(() => {
        // const currentPage = document.getElementById('rc-currentPage')?.getAttribute('data-current-page');
        // console.log(currentPage)
        // if (currentPage) {
        //     setCurrentPage(currentPage);
        // } else {
        //     alert("Can't find html element in django template for render React components");
        // }

        const rcCurrentPage = document.getElementById('rc-currentPage');
        if (rcCurrentPage) {
            const currentPage = rcCurrentPage.getAttribute('data-current-page');
            if (currentPage) {
                setCurrentPage(currentPage);
            } else {
                alert("Can't find html element in django template for render React components");
            }
        }
    }, []);

    if (!currentPage) {
        return null;
    }

    return (
        <Portal element={currentPage}>
            <Suspense fallback={<PageLoader />}>
                {ComponentRoot.LOGIN === currentPage ? (
                    RootComponents[currentPage]
                ) : (
                    <>
                        <NavBar />
                        <div className="flex pt-16 overflow-hidden bg-gray-50">
                            <div className="fixed inset-0 z-10 hidden bg-gray-900/50" id="sidebarBackdrop" />
                            <div
                                id="main-content"
                                className="relative w-full h-full bg-gray-50"
                            >
                                <main>
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
                                </main>
                            </div>
                        </div>
                    </>
                )}
            </Suspense>
        </Portal>
    );
};

export default memo(AppMainContent);
