import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import './index.css'
import AIWatermarkAndDetect from './pages/AI_Detect';
import Audio_Detect from './pages/Audio_Detect';
import IP_Monitoring from './pages/IP_Monitoring';
import Onchain_IP_History from './pages/Onchain_IP_History';
import Dispute_Management from './pages/Dispute_Management';
import Header from './components/header';

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
    Component: Audio_Detect,
  },
  {
    path: "/ip_monitoring",
    Component: IP_Monitoring,
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=''>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
