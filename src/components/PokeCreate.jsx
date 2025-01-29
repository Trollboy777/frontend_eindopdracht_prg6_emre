import { useState } from "react";
import { useNavigate } from "react-router";

function PokeCreate({ onProductAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        typing: '',
        region: '',
        imageUrl: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addProduct = async (newProduct) => {
        try {
            const response = await fetch('http://145.24.223.141:8001/pokemons/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Fout bij het toevoegen van het pokemon');
            }

            const createdProduct = await response.json();
            console.log('Nieuw pokemon toegevoegd:', createdProduct);

            onProductAdded(createdProduct);
        } catch (error) {
            console.error('Fout bij het POST-verzoek:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Formulier verzonden', formData);

        await addProduct(formData);

        setFormData({
            name: '',
            typing: '',
            region: '',
            imageUrl: ''
        });

        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-sky-300 to-white p-4">
            <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create New Pokémon</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">Image Link</label>
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
                            Create Pokémon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PokeCreate;
