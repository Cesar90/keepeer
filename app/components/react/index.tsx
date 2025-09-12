import { createRoot } from 'react-dom/client';
import { StoreProvider, UserProvider } from '@/app/providers/StoreProvider';
import { Toaster } from '@/shared/ui/shadcn/new-york';
import App from './app/App';
import '@/app/styles/index.scss';
import './style.scss';

const container = document.getElementById('rootReact');

if (container) {
    const root = createRoot(container);
    root.render(
        <UserProvider>
            <StoreProvider>
                <App />
                <Toaster />
            </StoreProvider>
        </UserProvider>,
    );
}
