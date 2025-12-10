import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import './index.css'
import AIWatermarkAndDetect from './pages/AI_Detect';
import Onchain_IP_History from './pages/Onchain_IP_History';
import Dispute_Management from './pages/Dispute_Management';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import C2PA_Impl from './pages/C2PA_Impl';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/ai-watermark",
    Component: AIWatermarkAndDetect,
  },
  {
    path: "/audio-detect",
    Component: C2PA_Impl,
  },
  {
    path: "/onchain-ip-history",
    Component: Onchain_IP_History,
  },
  {
    path: "/dispute_management",
    Component: Dispute_Management,
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=''>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  </StrictMode>,
)
