import {Link} from "react-router";
import PokeDeleteButton from "./PokeDeleteButton.jsx";

function PokeCard({pokemon, onDelete}) {
    console.log(pokemon);
    return(

        <li>
            <article className="p-4 border rounded-lg shadow-md bg-gray-100 text-center">
                <img
                    src={pokemon.imageUrl}
                    className="mx-auto w-24 h-24 object-contain"
                />
                <h2 className="text-xl font-bold mt-2">{pokemon.name}</h2>
                <p className="text-sm text-gray-600">{pokemon.typing}</p>
                <Link to={`/pokemons/${pokemon.id}`} onClick={() => console.log(`/pokemons/${pokemon.id}`)}>Details</Link>
                <PokeDeleteButton id={pokemon.id} onDelete={onDelete}/>
            </article>
        </li>
    );

}
export default PokeCard;