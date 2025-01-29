import { Link, Outlet } from 'react-router';

function Layout() {
    return (
        <div>
            <header className="bg-gradient-to-r from-blue-200 to-white shadow-md">
                <nav className="flex justify-center py-4">
                    <Link to={`/`} className="mx-6 text-lg font-bold text-blue-600 hover:text-blue-800 transition duration-300">Home</Link>
                    <Link to={`/create`} className="mx-6 text-lg font-bold text-blue-600 hover:text-blue-800 transition duration-300">Create New Pokemon</Link>
                </nav>
            </header>

            <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-white">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;

