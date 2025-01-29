import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function PokeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        typing: '',
        region: '',
        imageUrl: ''
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
                setProduct(data);
                setFormData({
                    name: data.name || '',
                    typing: data.typing || '',
                    region: data.region || '',
                    imageUrl: data.imageUrl || ''
                });
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

            navigate('/');
        } catch (error) {
            console.error('Fout bij het PUT-verzoek:', error);
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-sky-300 to-white p-4">
            <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6"><strong>Pokemon: </strong>{product.name}</h1>

                <div className="flex justify-center mb-6">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-80 h-80 object-contain rounded-lg shadow-lg"
                    />
                </div>

                <p className="text-center text-lg text-gray-700">{product.typing}</p>
                <p className="text-center text-lg text-gray-700"><strong>Region:</strong> {product.region}</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Pokemon Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="typing" className="block text-sm font-semibold text-gray-700">Pokemon Type</label>
                        <input
                            type="text"
                            id="typing"
                            name="typing"
                            value={formData.typing}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="region" className="block text-sm font-semibold text-gray-700">Region</label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                        />
                    </div>

                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            Update Pokémon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PokeDetail;
