import React from "react";
import '../Peliculas/styles.css'
import PeliculasHijo1 from "../PeliculasHijo1/PeliculasHijo1";
import PeliculasHijo2 from "../PeliculasHijo2/PeliculasHijo2";




function Peliculas() {
    return (
        
        <section className="todo">
            <div>
                <PeliculasHijo1  />
                <PeliculasHijo2  />
            </div>
        </section> 
    )
}

export default Peliculas;