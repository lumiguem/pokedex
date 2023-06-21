import { useDispatch } from "react-redux"
import FooterHome from "../components/home/FooterHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
const handleSubmit = (e) => {
  e.preventDefault()
  const nameTrainer = e.target.nameTrainer.value
  dispatch(setNameTrainer(nameTrainer))
  navigate("/pokedex")
  
}

  return (
    <main className=" bg-[#f8f8f8] grid grid-rows-[1fr_auto] min-h-screen ">
      {/* Sección superior */}

      
         <section className=" grid place-content-center gap-2" >
      <div className="w-[220px] xxs:w-[480px] sm:w-auto">
        <img src="/images/logo.png" alt="" />
      </div>
      <h3 className="grid place-content-center text-[#FE1936]  font-bold text-3xl ">Hello trainer!</h3>
      <p className="grid place-content-center"> Enter your Name to Start</p>

      <form  className="flex justify-center  drop-shadow-xl" onSubmit={handleSubmit}>
        <input className="p-2" required id="nameTrainer" type="text" placeholder="Your name..."/>
        <button className="bg-red-600 px-8 text-white">Start!</button>
      </form>
      </section>
     
     
    {/* Sección inferior  */}

    
      <section>
<FooterHome/>
      </section>
    </main>
  )
}

export default Home