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
        document.querySelector(".userDetalsContener").style.display = "none"
        }
        },[value])
    const [buttonText, setButtonText] = useState('LIGHT')
    const change=()=> {
        setToggleBg(current => !current)
        toggleBg ? setButtonText("LIGHT") : setButtonText("DARK")
    }
   
    return(
    <>
        {error && <div style={theme.dark} className="error">
            <h2>DATABASE ITS EAMPTY..<br />GET BACK TO SEARCHING<br />BTW..its works for me :)</h2>
            <button onClick={()=>history("/")} className="btn errorBtn" type="button">CLOSE</button>
            </div>}
        {value && <div className="userDetalsContener" style={toggleBg ? theme.light : theme.dark}>
            <div className="themeContener">
            <button onClick={change} className="btn">{buttonText}</button>
            </div>
            <div className="titleContener">
            {value.map(el=>(<h2 key={el.id}>USER DATA: {el.name.toUpperCase()}</h2>))}
            </div>
         {value.map(el=>(
         <table key={el.id}>
               <thead>
                   <tr>
                     <td>ADDRESS</td>
                   </tr>
               </thead>
               <tbody>
                  <tr key={el.id}>
                    <td>CITY: {el.address.city}, STREET: {el.address.street}, NO: {el.address.suite}, ZIP CODE: {el.address.zipcode}</td>
                   </tr>
               </tbody>
               <thead>
                   <tr>
                     <td>CONTACT DETAILS</td>
                   </tr>
               </thead>
               <tbody>
                  <tr key={el.id}>
                    <td>NICK: {el.username},PHONE NUMBER: {el.phone}, MAIL: {el.email}, WEBSIDE: {el.website}</td>
                   </tr>
               </tbody>
               <thead>
                   <tr>
                     <td>JOB</td>
                   </tr>
               </thead>
               <tbody>
                  <tr key={el.id}>
                    <td>COMPANY NAME: {el.company.name},  INDUSTRY: {el.company.bs}</td>
                   </tr>
               </tbody>
           </table>))}
        <button onClick={()=>history("/")} className="btn" type="button">CLOSE</button>
        </div>}
    </>
    )
}

export default UserDetals;

