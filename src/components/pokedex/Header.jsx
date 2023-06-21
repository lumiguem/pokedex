import { useDispatch } from "react-redux"
import { setNameTrainer } from "../../store/slices/nameTrainer.slice"

const Header = () => {

  const dispatch = useDispatch ()

  const handleClickLogOut = ()=>{
    dispatch(    setNameTrainer("")
    )

  }
  return (
    <section className="relative">
        {/* Sección roja */}
    <div className="bg-red-600 h-20 relative">
        <div className="absolute left-0 bottom-0 w-[220px] xxs:w-[290px] sm:w-auto">
            <img className="w-[400px]" src="/images/logo.png" alt="" />
        </div>

    </div>


    <div className="bg-black h-12"></div>

    
    <div className="bg-white w-20 aspect-square  border-[10px] border-black rounded-full absolute -bottom-4 right-0 -translate-x-1/2 after:content-[''] after:h-11 after:aspect-square after:bg-gray-900 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[9px] after:border-black">
      <button onClick={handleClickLogOut} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20"><i class='bx bx-arrow-back'></i></button>
    </div>
  </section> 
  )
}

export default Header