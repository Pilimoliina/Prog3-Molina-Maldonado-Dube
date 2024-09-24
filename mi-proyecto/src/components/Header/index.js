import React from "react";
import './styles.css';
import Opcion from "../Opcion";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
        nombre: "Populares",
        ruta:"/vertodasPopulares"
    },
    {
        nombre: "En cartelera",
        ruta:"/vertodasCartelera"
    }
]

function Header(props){
    return(
        <nav>
        <Link to = "/"> <img className= "logo" src="img/logoAura.png" alt="logo"/> </Link>
        <ul className="main-nav">
            {opciones.map((elemento)=> <Opcion data= {elemento}/>)}
        </ul>

    </nav>
    )
}



export default Header