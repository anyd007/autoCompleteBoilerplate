import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useTheme} from '../bgContext/BgContext';
import axios from "axios";
import "./autocomplite.css"

export default function Autocomplite({setValue}){
  
const [dataFromAPI, setDataFromAPI] = useState([]) //pobieranie api
const [inputValue, setInpuntValue] = useState('') //pobieranie danych z inputów
const [replenishment, setReplenishment] = useState([])
const { theme } = useTheme() //dane z BgContext
const [toggleBg, setToggleBg] = useState(false) //do weryfikacji obecnego tła
const [error, setError] = useState(false)
const [loading, setLoading] = useState(false)
useEffect(()=>{
    const handleDataFromAPI = async() =>{
        await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(response=>response.data)
        .then(data=>setDataFromAPI(data))
        .catch((err) => {
            console.log(err.message);
            setError("OH NO, WE HAVE AN ERROR, TRY LATER...")
          });
    }   
    handleDataFromAPI()
},[])

    //funkcja przyjmująca jako argument dane z inputa, po kliknięciu w podpowiedź, podstawia się ona w wartośc inputa,
    //dodatkowo czyści tablicę z podpowiedziami
    const [filterValue, setFilterValue] = useState([]); //przekaznie danych do fukcji setValue
    const handleSetValue = (inputValue)=>{
        setFilterValue(replenishment.filter(item=>item.name===inputValue)) 
        setInpuntValue(inputValue)
        setReplenishment([]) //czyszczenie tablicy z uzupełnianiem
        }

    //funkcja przyjmująca argument wartość inputa, sprawdzająca czy wartość inputa jest większa niż 0, 
    //oraz filtrująca dane z API
    const handleChangeInput = (inputValue) =>{
        let tests = []
        if(inputValue.length >0){
            tests = dataFromAPI.filter(item=>{ 
                //wykorzystanie regexp "gi" - dopasowuje wszystkie wystąpienia nie tylko piersze, przez cały alfabet
                const regexp = new RegExp(`${inputValue}`,"gi") 
                return item.name.match(regexp)
            })
        }
        setReplenishment(tests) //przypisywanie danych po filtrowaniu 
        setInpuntValue(inputValue) //przypisywanie danych wprowadzonych w inpucie 
        setError(false)
    }
    const history = useNavigate()
     const handleViewDetals = () =>{
         setLoading(true)
         if(filterValue.length===0){
             setError("THERE IS NO DATA FROM THIS DATABASE...TRY ONE MORE TIME")
             setLoading(false)
         }
         else{
        setValue(filterValue) //przekaznie danych do App po zaznaczeniu podpowiedzi
        setInpuntValue([]) //czyszczenie pola inputów
        setFilterValue([]) //czyszenie tablicy wartości przekazywanych do setValue
        history("/userDetals")
        setError(false)
         }
        }
        const [buttonText, setButtonText] = useState('LIGHT')
        const change =() =>{
            setToggleBg(current => !current);
            toggleBg ? setButtonText("LIGHT") : setButtonText("DARK")
        }
    
    return(
        <div className="mainContener" style={toggleBg ? theme.light : theme.dark}>
            <div className="titleContener">
            <h1>AUTOCOMPLITE SEARCH</h1>
            </div>
            {error && <div className="errorConteiner">
                        <h4>{error}</h4>
                    </div>}
            {loading && <div className="loadingConteiner">
                        <h4>LOADING...</h4>
                    </div>}
            <div className="themeContener">
            <button className="themeBtn btn" name="theme" onClick={change} >{buttonText}</button>
            </div>
            <div className="inputContainer">
            <label htmlFor="apiText">LETS CHECK IS IT RIGHT...</label><br />
            <input 
            type="text" 
            name="apiText" 
            value={inputValue}
            onChange={e=>handleChangeInput(e.target.value)}
            />
            </div>
           <div><button disabled={inputValue===''} 
            onClick={()=>handleViewDetals()} className="btn" type="button">CHECK</button></div>
            {replenishment && replenishment.map((el)=>
                <div onClick={()=>handleSetValue(el.name)} className="replenishment" key={el.id}>{el.name}</div>
            )}
        </div>
    )
}
