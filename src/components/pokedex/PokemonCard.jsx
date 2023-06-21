import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

//Color fondo Pokecard
const pokeLinearGradients = {
  grass: "bg-gradient-to-t from from-[#CAE099] to-[#7EC6C5]",
  fire: "bg-gradient-to-t from from-[#E8AE1B] to-[#E35825]",
  water: "bg-gradient-to-t from from-[#82B2F1] to-[#1479FB]",
  normal: "bg-gradient-to-t from from-[#BC6B7C] to-[#7C3F4C]",
  fighting: "bg-gradient-to-t from from-[#F1613C] to-[#96402A]",
  flying: "bg-gradient-to-t from from-[#019788] to-[#04edd6]",
  poison: "bg-gradient-to-t from from-[#CE9BFF] to-[#5B3184]",
  ground: "bg-gradient-to-t from from-[#D69638] to-[#654008]",
  rock: "bg-gradient-to-t from from-[#D3D3D3] to-[#7E7E7E]",
  bug: "bg-gradient-to-t from from-[#AAFFA8] to-[#3BB039]",
  ghost: "bg-gradient-to-t from from-[#787DDA] to-[#323569]",
  steel: "bg-gradient-to-t from from-[#A8A8A8] to-[#5E736C]",
  electric: "bg-gradient-to-t from from-[#7075D9] to-[#0C1395]",
  psychic: "bg-gradient-to-t from from-[#6306e5] to-[#34017b]",
  ice: "bg-gradient-to-t from from-[#BDEBFE] to-[#6FBEDF]",
  dragon: "bg-gradient-to-t from from-[#A2BEC1] to-[#478A93]",
  dark: "bg-gradient-to-t from from-[#5A5E5D] to-[#030706]",
  fairy: "bg-gradient-to-t from from-[#CD7D98] to-[#971B45]",
  unknown: "bg-gradient-to-t from from-[#] to-[#]",
  shadow: "bg-gradient-to-t from from-[#] to-[#]",
}
//Color borde pokeCard
const pokeBorder = {
  grass: "border-[#B1DBBC]",
  fire: "border-[#E75C35]",
  water: "border-[#1479FB]",
  normal: "border-[#7C3F4C]",
  fighting: "border-[#96402A]",
  flying: "border-[#735259]",
  poison: "border-[#5B3184]",
  ground: "border-[#654008]",
  rock: "border-[#7E7E7E]",
  bug: "border-[#4AB648]",
  ghost: "border-[#323569]",
  steel: "border-[#5E736C]",
  electric: "border-[#0C1395]",
  psychic: "border-[#2a055e]",
  ice: "border-[#6FBEDF]",
  dragon: "border-[#478A93]",
  dark: "border-[#4F4F4F]",
  fairy: "border-[#971B45]",
  unknown: "border-[#]",
  shadow: "border-[#]",
}

//Color letra pokecard

const pokeText = {
  grass: "text-[#7EC6C5]",
  fire: "text-[#E75C35]",
  water: "text-[#1479FB]",
  normal: "text-[#7C3F4C]",
  fighting: "text-[#96402A]",
  flying: "text-[#735259]",
  poison: "text-[#5B3184]",
  ground: "text-[#654008]",
  rock: "text-[#7E7E7E]",
  bug: "text-[#4AB648]",
  ghost: "text-[#323569]",
  steel: "text-[#5E736C]",
  electric: "text-[#0C1395]",
  psychic: "text-[#2a055e]",
  ice: "text-[#6FBEDF]",
  dragon: "text-[#478A93]",
  dark: "text-[#4F4F4F]",
  fairy: "text-[#971B45]",
  unknown: "text-[#]",
  shadow: "text-[#]",
}

const PokemonCard = ({ pokemonUrl }) => {

  const [pokemon, setPokemon] = useState(null)
console.log(pokemon)
  const formatTypePokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name)
    const titleTypes = nameTypes.join(" / ")
    return titleTypes
  }

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .then((err) => console.log(err))
  }, [])

  return (
    <Link className={` rounded-lg border-8 ${pokeBorder[pokemon?.types[0].type.name]}`} to={`/pokedex/${pokemon?.name}`}>
      {/* Sección superior  */}
      <section className={`relative h-40 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>
        <div className="absolute px-12 -bottom-14">
          <img className="h-52" src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
        </div>
      </section>

      {/* Sección inferior */}
      <section className="capitalize" >

        <h3 className={`grid justify-items-center mt-14 font-bold ${pokeText[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
        <h5 className="grid justify-items-center">{formatTypePokemon(pokemon?.types)}</h5>
        <span className="grid justify-items-center text-gray-400">Type</span>
        <hr />

        <section className="grid cols grid-cols-2 p-4 justify-items-center uppercase text-sm">

          {/* Generar lista de stasts */}
          {
            pokemon?.stats.slice(0, 4).map((stat) => (
              <div key={stat.stat.url}>
                <h6 className="text-gray-400">{stat.stat.name}</h6>
                <span className={`grid justify-items-center font-bold ${pokeText[pokemon?.types[0].type.name]} `}>{stat.base_stat}</span>
              </div>
            ))
          }
        </section>
      </section>
    </Link>
  )
}

export default PokemonCard