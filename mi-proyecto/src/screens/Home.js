import React from "react";
import Peliculas from "../components/Peliculas/peliculas";
import Buscador from "../components/Buscador/buscador";

function Home (){
    return(

    <React.Fragment>

        <main>
        <Buscador/>
        <img className="banner" src="/img/AuraBanner.jpeg"></img>
        <Peliculas />
        

        </main>
    </React.Fragment>
    )
}

export default Home