import PokeCard from "./PokeCard.jsx";
import {useEffect, useState} from "react";

function PokeCardList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://145.24.223.141:8001/pokemons/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                console.log('Fetched data:', data);
                setProducts(data.items);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);
    const handleDelete = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <PokeCard
                        pokemon={{
                            imageUrl: product.imageUrl,
                            name: product.name,
                            typing: product.typing,
                            region: product.region,
                            id: product.id
                        }}
                        onDelete={handleDelete}
                    />

                </li>
            ))}
        </ul>
    );
}
export default PokeCardList;