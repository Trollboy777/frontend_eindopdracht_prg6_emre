import {Link, Outlet} from 'react-router';

function Layout() {
    return (
        <div>
            <header>
                <nav>
                    <Link to={`/`}>Home</Link>
                    <Link to={`/create`}>Create New Pokemon</Link>

                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;