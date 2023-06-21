import { useParams } from "react-router-dom"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"

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
const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null)

  const { pokemonName } = useParams();

  const percentProgressStat = (baseStat) => {
    const MAX_STAT = 255
    return `${(baseStat * 100) / 255}%`

  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err))

  }, [])

  const formatTypePokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name)
    const titleTypes = nameTypes.join(" / ")
    return titleTypes
  }
  return (
    <main >

      <Header />

      <section className="py-20 grid p-36 mx-auto max-w-[1024px] ">


        {/* Información detallada de pokemon */}
        <article className="relative grid gap-2 top-4 border-2 drop-shadow-lg">
          <section className={`h-36 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>

            <div className="grid justify-center -translate-y-20">
              <img className="h-60" src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
            </div>
          </section>

          <section className="grid place-content-center gap-4 capitalize">
            <div>
              <span className={`border-2 mx-auto grid justify-items-center text-xl  font-bold ${pokeText[pokemon?.types[0].type.name]}`}>#{pokemon?.order}</span>
              <h3 className={`grid justify-items-center text-2xl font-bold ${pokeText[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
            </div>
            <section className="grid grid-cols-2 gap-4">
              <div>
                <h6>Weight</h6>
                <span>{pokemon?.weight}</span>
              </div>
              <div>
                <h6>Height</h6>
                <span>{pokemon?.height}</span>
              </div>

            </section>

            <section className="grid place-content-center">
              <h3>Type</h3>
              <h5 className="grid justify-items-center">{formatTypePokemon(pokemon?.types)}</h5>

            </section>

          </section>

         {/* Stats */}

          <section className="px-20 grid gap-4">
            <h4 className="text-2xl font-bold">Stats</h4>
            <hr />
            <section className="grid gap-2">
              {
                pokemon?.stats.map((stat) => (
                  <article  key={stat.stat.url}>
                    <section className="flex justify-between">
                      <h5 className="capitalize font-bold">{stat.stat.name}: </h5>
                      <span className="font-bold">{stat.base_stat}/250</span>
                    </section>
                    {/* Barra de progreso de stat */}
                    <div className="bg-gray-300 h-8 rounded-md overflow-hidden">
                      <div style={{ width: percentProgressStat(stat.base_stat) }} className={`bg-yellow-500 h-full `}></div>
                    </div>
                  </article>
                ))
              }
            </section>
          </section>

        </article>
      </section>
    </main>
  )
}

export default PokemonId