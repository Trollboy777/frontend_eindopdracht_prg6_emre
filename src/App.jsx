import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout.jsx";
import PokeCreate from "./components/PokeCreate.jsx";
import PokeDetail from "./components/PokeDetail.jsx";
import PokeCardList from "./components/PokeCardList.jsx";
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <PokeCardList/>
            },
            {
                path: '/create',
                element: <PokeCreate />
            },
            {
                path: '/pokemons/:id',
                element:<PokeDetail/>
            }

        ]
    }
]);


function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
