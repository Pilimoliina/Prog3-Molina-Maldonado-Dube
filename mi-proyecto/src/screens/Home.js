import React from "react";
import Peliculas from "../components/Peliculas/peliculas";
import Buscador from "../components/Buscador/buscador";

function Home (props){
    return(

    <React.Fragment>

        <main>
        <Buscador location={props.location} history={props.history}/>
        <img className="banner" src="/img/AuraBanner.jpeg"></img>
        <Peliculas />
        

        </main>
    </React.Fragment>
    )
}

export default Home