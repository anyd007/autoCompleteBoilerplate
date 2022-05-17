import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {useTheme} from '../bgContext/BgContext';
import "./userDetals.css"

const UserDetals = ({value}) =>{
    const [error, setError] = useState(false)
    const history = useNavigate()
    const { theme } = useTheme() //dane z BgContext
    const [toggleBg, setToggleBg] = useState(false) //do weryfikacji obecnego tła

    useEffect(()=>{
        if(value.length !==1){
        setError(true)
        }
        },[value])
        
    const change=()=> {
        setToggleBg(current => !current)
    }
    console.log(value);
    return(
    <>
        {error && <div style={theme.dark} className="error">
            <h2>BAZA JEST OBECNIE PUSTA..<br />WRÓĆ DO WYSZUKIWANIA<br />pozatym u mnie działa :)</h2>
            <button onClick={()=>history("/")} className="btn errorBtn" type="button">ZAMKNIJ</button>
            </div>}
        {value && <div className="userDetalsContener" style={toggleBg ? theme.light : theme.dark}>
            <div className="themeContener">
            <button onClick={change} className="btn">ZMIEŃ MOTYW</button>
            </div>
            <div className="titleContener">
            {value.map(el=>(<h2 key={el.id}>DANE UŻYTKOWNIKA: {el.name.toUpperCase()}</h2>))}
            </div>
         {value.map(el=>(
         <table key={el.id}>
               <thead>
                   <tr>
                     <td>ADRES ZAMIESZKANIA</td>
                   </tr>
               </thead>
               <tbody>
                  <tr key={el.id}>
                    <td>MIASTO: {el.address.city}, ULICA: {el.address.street}, NR: {el.address.suite}, KOD POCZOTOWY: {el.address.zipcode}</td>
                   </tr>
               </tbody>
               <thead>
                   <tr>
                     <td>DANE KONTAKTOWE</td>
                   </tr>
               </thead>
               <tbody>
                  <tr key={el.id}>
                    <td>NICK: {el.username},TELEFON: {el.phone}, MAIL: {el.email}, STRONA: {el.website}</td>
                   </tr>
               </tbody>
               <thead>
                   <tr>
                     <td>PRACA</td>
                   </tr>
               </thead>
               <tbody>
                  <tr key={el.id}>
                    <td>NAZWA FIRMY: {el.company.name},  BRANŻA: {el.company.bs}</td>
                   </tr>
               </tbody>
           </table>))}
        <button onClick={()=>history("/")} className="btn" type="button">ZAMKNIJ</button>
        </div>}
    </>
    )
}

export default UserDetals;

