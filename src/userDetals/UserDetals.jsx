import React from "react";

const UserDetals = ({value}) =>{


    return(
        <div className="userDetalsContener">
            {value.map(el=>(<h2 key={el.id}>DANE UŻYTKOWNIKA: {el.name.toUpperCase()}</h2>))}
         {value.length === 1 ? value.map(el=>(
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
                    <td>NICK: {el.username}, TELEFON: {el.phone}, MAIL: {el.email}, STRONA: {el.website}</td>
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
           </table>)) : null}
        </div>
    )
}

export default UserDetals;

