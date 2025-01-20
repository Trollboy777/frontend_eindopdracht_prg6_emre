import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
function PokeCreate ({onProductAdded}) {
    const [formData, setFormData] = useState({
        name:'',
        typing:'',
        region:'',
        imageUrl :'',

        useEffect
    });
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={'name'}>Pokemon:</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor={'typing'}>Pokemon Type:</label>
                <input
                    type='text'
                    id='typing'
                    name='typing'
                    value={formData.typing}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor={'region'}>Region:</label>
                <input
                    type='text'
                    id='region'
                    name='region'
                    value={formData.region}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor={'imageUrl'}>Image Link:</label>
                <input
                    type='text'
                    id='imageUrl'
                    name='imageUrl'
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                />
            </div>


            <button type="submit">Verzenden</button>
        </form>
    )
}

export default PokeCreate;
