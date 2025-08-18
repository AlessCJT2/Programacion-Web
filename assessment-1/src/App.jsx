import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 30; 

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        const details = await Promise.all(
          data.results.map((p) =>
            fetch(p.url).then((res) => res.json())
          )
        );

        setPokemons(details);
      } catch (err) {
        console.error("Error cargando pokemones:", err);
      }
    }

    fetchPokemons();
  }, [offset]);

  return (
    <div>
      <h1>Pokémon Gallery</h1>

      {pokemons.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          ⬅️ Anterior
        </button>
        <button onClick={() => setOffset(offset + limit)}>
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
}
