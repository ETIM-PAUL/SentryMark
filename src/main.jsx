import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import './index.css'
import AIWatermarkAndDetect from './pages/AI_Detect';

const router = createBrowserRouter([
  {
    path: "/",
    Component: AIWatermarkAndDetect,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-red-500'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
