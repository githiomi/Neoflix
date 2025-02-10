import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const staleMinutes : number = 5;

// Tanstack React Query
const tanstackQueryClient = new QueryClient({
    defaultOptions : {
        queries: {
            retry: 1,
            staleTime: (staleMinutes * 3600),
            refetchOnWindowFocus: false
        }
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={tanstackQueryClient}>
                <App/>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
