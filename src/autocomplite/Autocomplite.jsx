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
const [toggleBg, setToggleBg] = useState(true) //do weryfikacji obecnego tła
const [error, setError] = useState(false)

useEffect(()=>{
    const handleDataFromAPI = async() =>{
        await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(response=>response.data)
        .then(data=>setDataFromAPI(data))
        .catch((err) => {
            console.log(err.message);
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
         if(filterValue.length===0){
             setError(true)
         }
         else{
        setValue(filterValue) //przekaznie danych do App po zaznaczeniu podpowiedzi
        setInpuntValue([]) //czyszczenie pola inputów
        setFilterValue([]) //czyszenie tablicy wartości przekazywanych do setValue
        history("/userDetals")
        setError(false)
         }
        }
        const change =() =>{
            setToggleBg(current => !current);
        }
        
    return(
        <div className="mainContener" style={toggleBg ? theme.light : theme.dark}>
            <div className="titleContener">
            <h1>AUTOWYSZUKIWANIE</h1>
            </div>
            {error && <div className="errorConteiner">
                        <h4>BRAK WYSZUKAŃ W BAZIE DANYCH</h4>
                    </div>}
            <button onClick={change}>zmien</button>
            <label htmlFor="apiText">SPRAWDZIMY CZY PASUJE...</label><br />
            <input 
            type="text" 
            name="apiText" 
            value={inputValue}
            onChange={e=>handleChangeInput(e.target.value)}
            />
            <button disabled={inputValue===''} 
            onClick={()=>handleViewDetals()} className="btn" type="button">SPRAWDŹ</button>
            {replenishment && replenishment.map((el)=>
                <div onClick={()=>handleSetValue(el.name)} className="replenishment" key={el.id}>{el.name}</div>
            )}
        </div>
    )
}
