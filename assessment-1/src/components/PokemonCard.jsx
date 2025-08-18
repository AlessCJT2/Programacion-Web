export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  console.log("Renderizando:", pokemon.name, pokemon.abilities);

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      width: "200px",
      textAlign: "center"
    }}>
      <h3>{pokemon.name.toUpperCase()}</h3>
      <img
        src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
        alt={pokemon.name}
        width="120"
        height="120"
      />
      <p>
        <strong>Habilidades:</strong>{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </p>
    </div>
  );
}
