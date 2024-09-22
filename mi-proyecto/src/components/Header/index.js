import React from "react";
import './styles.css';
import Opcion from "../Opcion";
import {Link} from 'react-router-dom'

const opciones = [
    {
        nombre:"HOME",
        ruta: '/'
    }, 
    {
        nombre: "Favoritos",
        ruta: "/favoritos"
    },
    {
        nombre: "Ver Todas",
        ruta:"/vertodas"
    }
]

function Header(props){
    return(
        <nav>
            <Link to ="/"> <img className= "logo" src="img/logoAura.png" alt="logo"/></Link>
        
        <ul className="main-nav">
            {opciones.map((elemento)=> <Opcion data= {elemento}/>)}
        </ul>
        {/* <ul className="user">
            <li>Walter White <img src="/img/user.jpg" alt=""/></li>
        </ul> */}
    </nav>
    )
}



export default Header