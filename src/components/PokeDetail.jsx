import {useNavigate, useParams} from "react-router";
import { useEffect, useState } from "react";

function PokeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Fetched id from useParams:', id);
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        name:'',
        typing:'',
        region:'',
        imageUrl :'',

        useEffect
    });

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://145.24.223.141:8001/pokemons/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                const data = await response.json();
                console.log('Fetched product:', data);
                setProduct(data);

                setFormData({
                    name: data.name || '',
                    typing: data.typing || '',
                    region: data.region || '',
                    imageUrl: data.imageUrl || ''
                })

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [id]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://145.24.223.141:8001/pokemons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Fout bij het updaten van het product');
            }

            const updatedProduct = await response.json();
            console.log('Pokemon succesvol bijgewerkt:', updatedProduct);


            navigate('/');
        } catch (error) {
            console.error('Fout bij het PUT-verzoek:', error);
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1><strong>Pokemon: </strong>{product.name}</h1>
            <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "100%", maxWidth: "500px" }}
            />
            <p>{product.typing}</p>
            <p><strong>Region:</strong> {product.region}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Pokemon:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="typing">Pokemon Type:</label>
                    <input
                        type="text"
                        id="typing"
                        name="typing"
                        value={formData.typing}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="region">Region:</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Bijwerken</button>
            </form>
        </div>
    );
}

export default PokeDetail;
