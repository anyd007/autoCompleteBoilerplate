import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./autocomplite.css"

export default function Autocomplite(){

const [dataFromAPI, setDataFromAPI] = useState([]) //pobieranie api
const [inputValue, setInpuntValue] = useState('') //pobieranie danych z inputów
const [replenishment, setReplenishment] = useState([])

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
    const handlesetReplenishment = (inputValue)=>{
        setInpuntValue(inputValue)
        setReplenishment([])
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
    }
    return(
        <div className="mainContener">
            <div className="titleContener">
            <h1>AUTOWYSZUKIWANIE</h1>
            </div>
            <label htmlFor="apiText">SPRAWDZIMY CZY PASUJE...</label><br />
            <input 
            type="text" 
            name="apiText" 
            value={inputValue}
            onChange={e=>handleChangeInput(e.target.value)}
            />
            {replenishment && replenishment.map((el)=>
                <div onClick={()=>handlesetReplenishment(el.name)} className="replenishment" key={el.id}>{el.name}</div>
            )}
        </div>
    )
}