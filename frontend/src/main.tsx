import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router.tsx'
import { AuthContextProvider } from '@/context/AuthContext.tsx'
import '@/index.css'; 


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <>
        <h1 className="text-center pt-4 text-3xl">React Supabase Auth & Context</h1>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
        </>
    </StrictMode>,
)
