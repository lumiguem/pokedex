import { list } from "postcss"
import PokemonCard from "../components/pokedex/Pokemoncard"

const PokemonsList = ({pokemons}) => {
  
  return (

    
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-6 ">
      

        {
            pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl ={pokemon.url}/>)
        }
    </section>
  )
}

export default PokemonsList