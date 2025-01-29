import { Link } from "react-router";
import PokeDeleteButton from "./PokeDeleteButton.jsx";

function PokeCard({ pokemon, onDelete }) {
    console.log(pokemon);

    return (
        <li className="flex justify-center">
            <article className="p-6 border-4 border-yellow-400 rounded-2xl shadow-lg bg-gradient-to-br from-blue-200 to-white text-center transform hover:scale-105 transition duration-300 w-80">
                <img
                    src={pokemon.imageUrl}
                    className="mx-auto w-32 h-32 object-contain drop-shadow-lg"
                    alt={pokemon.name}
                />
                <h2 className="text-2xl font-bold mt-3 text-gray-800">{pokemon.name}</h2>
                <p className="text-md text-gray-700 italic">{pokemon.typing}</p>

                <div className="mt-4 flex justify-center space-x-4">
                    <Link
                        to={`/pokemons/${pokemon.id}`}
                        onClick={() => console.log(`/pokemons/${pokemon.id}`)}
                        className="px-4 py-2 rounded-full bg-red-500 text-white font-bold shadow-md hover:bg-red-600 transition duration-300"
                    >
                        Details
                    </Link>
                    <PokeDeleteButton
                        id={pokemon.id}
                        onDelete={onDelete}
                        className="px-4 py-2 rounded-full bg-red-500 text-white font-bold shadow-md hover:bg-red-600 transition duration-300"
                    />
                </div>
            </article>
        </li>
    );
}

export default PokeCard;
