import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonsList from "./PokemonsList"

const Pokedex = () => {
// ? Array de pokemons antes de filtrar
  const [pokemons, setPokemons] = useState([]);

  // ? String para filtrar los pokemons por nombre
  const [namePokemon, setNamePokemon] = useState("");

  // ? Arreglo de tipos de pokemons posible 
  const [types, setTypes] = useState([]);

  // ? String del tipo de pokemon actual, cambia de acuerdo al select
  const [currentType, setCurrentType] = useState("");

  // ? Página actual
  const [currentPage, setCurrentPage] = useState(1);

  //? Estado Global donde se almacena el nobre del usuario
  const nameTrainer = useSelector(store => store.nameTrainer);

  const pokemonsByName = pokemons.filter((pokemon)=> pokemon.name.includes(namePokemon.toLocaleLowerCase().trim()));

  const paginationLogic = ()=>{
    // Cantidad de pokemons por página
    const POKEMONS_PER_PAGE = 12
    // Pokemons que se van a mostrar en la página actual
    const sliceStart = (currentPage-1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonsInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    //última página
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //Bloque actual 
    const PAGES_PER_BLOCK = 7
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    // Páginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1 
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for(let i = minPage; i<= maxPage;i++){
      if(i<=lastPage){
        pagesInBlock.push(i)
      }
    }

    return {pokemonsInPage, lastPage, pagesInBlock}
  }

  const {lastPage, pagesInBlock, pokemonsInPage} = paginationLogic ()

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage -1
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value)
  }

  const handleChangeType =(e) => {
    setCurrentType(e.target.value)

  }

  useEffect(() => {

    if(!currentType){
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281'
  
  
      axios
        .get(URL)
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err))
      
    }
  }, [currentType])

  useEffect(()=> {
    const URL = 'https://pokeapi.co/api/v2/type';

    axios
      .get(URL)
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err))

  },[])

  useEffect(()=> {

    if(currentType){
      const url = `https://pokeapi.co/api/v2/type/${currentType}`

      axios
      .get(url)
      .then(({ data }) => {
          console.log(data.pokemon)
          const pokemonsByType = data.pokemon.map(pokemon => pokemon.pokemon)
          setPokemons(pokemonsByType)
      })
      .catch((err) => console.log(err))
    }

  },[currentType])

  useEffect(()=>{
    setCurrentPage(1)
    
  },[namePokemon, currentType])

  return (
    <main className="bg-[#f8f8f8]">
      <Header />
      <p className="p-4 text-lg flex justify-center"><span className="text-red-600 font-bold">Welcome {nameTrainer} </span>, Here you can find your favorite pokemon</p>
      <form className= "flex gap-4 justify-center" onSubmit={handleSubmit}>
        <div className="">
          <input autoComplete="off" className="p-2" id="namePokemon" placeholder="Find a pokemon" type="text" />
          <button className="bg-red-600 text-white p-2 px-4 font-bold">Search</button>
        </div>

        <select onChange={handleChangeType}>
          <option value="">All pokemons</option>
          {
            types.map((type)=> (
            <option value={type.name} key={type.url}>
              {type.name}
              </option>))
          }
        </select>
      </form>
 
      <PokemonsList pokemons={pokemonsInPage} />
      <section>      
        <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        <button onClick={()=> setCurrentPage(1)} className="p-3 bg-red-500 font-bold text-white rounded-sm">{"<<"}</button>
        <button onClick={handleClickPreviusPage} className="p-3 bg-red-500 font-bold text-white rounded-sm">{"<"}</button>
        {
          pagesInBlock.map(numberPage => <button onClick={()=>setCurrentPage(numberPage)} className={`p-3 font-bold ${numberPage === currentPage && "bg-red-500 rounded-md text-white"}`} key={numberPage}>{numberPage}</button>)
          
        }
        <button onClick={handleClickNextPage} className="p-3 bg-red-500 font-bold text-white rounded-sm">{">"}</button>
        <button onClick={()=> setCurrentPage(lastPage)} className="p-3 bg-red-500 font-bold text-white rounded-sm">{">>"}</button>
      </ul>
      </section>
    </main>
  )
}

export default Pokedex