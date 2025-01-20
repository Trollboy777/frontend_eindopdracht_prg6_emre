

function PokeDeleteButton({ id, onDelete }) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Weet je zeker dat je dit wil verwijderen?');

        if (confirmDelete) {
            try {
                const response = await fetch(`http://145.24.223.141:8001/pokemons/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Fout bij het verwijderen van het item');
                }
                console.log(`Item met ID ${id} verwijderd.`);
                onDelete(id);
            } catch (error) {
                console.error('Error tijdens het verwijderen:', error);
            }
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
            Verwijder
        </button>
    );
}

export default PokeDeleteButton;
