import { useEffect, useState } from "react"
import bgMobile from "../images/bg-shorten-mobile.svg"
import bgDesktop from "../images/bg-shorten-desktop.svg"

 /*___Local Storage_____ */
 const getLocalStorage=()=>{
  let links = localStorage.getItem('links')
  if(links){
    return JSON.parse(localStorage.getItem("links"))
  }else 
  return []
}

export default function Shortener() {

  
   
  /*____Input state____*/
    const [text,setText]=useState(getLocalStorage())
  /*____Link State____*/
    const [links,setLinks]=useState([])
  /*___use Effect_____ */
   useEffect(()=>{
    localStorage.setItem(links,JSON.stringify('links'))
    },[links])
  /*____Copy State____*/
   const [buttontext,setButtonText] = useState('copy')

  /*____Handle Submit____*/
   const handlSubmit=(e)=>{
    e.preventDefault()
    if(!text){
      alert('input is empty')
    } else{
      // validation : in regex
      const shortenLink = async ()=> {
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${text}`)
        const data = await response.json()
        setLinks(data.result)
        setText('')
      }
      shortenLink()
      }
    }
 
    /*____Handle Copy____*/
     const handlCopy=()=> {
      navigator.clipboard.writeText(links.full_short_link) ;
      setButtonText('Copied')
    }

 
 
  return (
    <>
      <section className="max-width shortener relative">
        <picture>
          <source media="(min-width: 768px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt="" />
        </picture>

        <form className="form" onSubmit={handlSubmit}>
          <div className="flex flex-col md:flex-row">
            <input
              type="url"
              placeholder="Shorten a link here"
              className="w-full py-2 px-5 rounded-lg mb-2 md:mb-0 md:w-2/3"
              value={text}
              onChange={(e)=>setText(e.target.value)}
           />
            <button
              type="submit"
              className="btn-cta rounded-lg w-full md:w-40 md:ml-5"
              onClick={handlSubmit}
            >
              Shorten It!
            </button>
          </div>
        </form>

        <div className="flex justify-center flex-col md:flex-row md:justify-between md:items-center items-center text-center bg-white p-4 rounded-lg shadow">
          <article>
            <h6 className="mb-3 md:mb-0">Original Link : {links.original_link}</h6>
          </article>
          <article>
            <ul className="md:flex md:items-center">
              <li className="md:mr-5">Shorted Link : <button className="text-cyan-500">{links.full_short_link}</button></li>
              <li><button onClick={handlCopy} className="btn-cta rounded-lg text-sm focus:bg-slate-700">{buttontext}</button></li>
              
            </ul>
          </article>
        </div>
      </section>
    </>
  )
}