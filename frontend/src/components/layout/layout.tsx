import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="min-h-screen bg-black text-white font-mono">
            <header className="py-4 px-6 border-b border-cyan-500 flex justify-between items-center">
                <h1 className="text-cyan-400 text-2xl font-bold">CipherCats</h1>
            </header>

            <section className="max-w-3xl mx-auto px-6 py-12 space-y-8">
                <Outlet />
            </section>

            <footer className="text-center py-4 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} CipherCats
            </footer>
        </main>
    );
};

export default Layout;
