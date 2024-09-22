import React, { Component } from 'react';
import Busqueda from '../Busqueda/busqueda';
import {Link} from "react-router-dom";

const APIKEY = 'b4162f48d94a73d5f95feab7a9a5c8de'
class PeliculasHijo1 extends Component {
    constructor (props) {
        super (props)
        this.state = {
            peliculas: [],
   
             verDescripcion: false,
     
            overview: props.overview,

            favoritosBoton: "Agregar a favoritos", 
            favoritos:{},
            peliculaSeleccionada: null, 
        }
        console.log('Soy el constructor')
    }

    componentDidMount() {
        console.log('Soy el didMount')
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`)
        .then((resp) => resp.json())
        .then((data) => {
            setTimeout(() => this.setState({
                peliculas: data.results
            }), 1400)
            

        })
        .catch((err) => console.log(err))
    }

    componentDidUpdate() {
        console.log('Soy el Update');
        if (this.state.valor > 5){ // valor lo definimos en el contador
            alert('5 es el valor maximo')
            this.setState({valor: 5})
        }
    }

    componentWillUnmount() {
        console.log('Soy el will Unmount');
    }


    filtrarPeliculas(nombrePelicula) {
        const peliculasFiltradas = this.state.peliculas.filter(
            (elm) => elm.title.toLowerCase().includes(nombrePelicula.toLowerCase())
        )
        this.setState({
            peliculas: peliculasFiltradas
        })

    }

    favorito(idPelicula) {
        this.setState(prevState => ({
            favoritos: {
                ...prevState.favoritos,
                [idPelicula]: !prevState.favoritos[idPelicula] // Alterna el estado actual de favorito
            }
        }));
    }



    render(){
        console.log('Soy el render')
        const id = this.state.id
        return (
            <section>
                   <h1 className="titulo-peli">Peliculas populares</h1> 
                   <Busqueda filtrarPeliculas = {(nombre) => this.filtrarPeliculas(nombre)} /> 
                   <div  className= 'comp-peliculas'>
                {
                    this.state.peliculas.length > 0
                    ? 
                    ( 
                        this.state.peliculas.slice(0,5).map((elm) => (
                            <div key={elm.id}  className= 'pelicula'> 
                                <Link to=  {`/Detalle/id/${elm.id}`}>
                                
                                    <img  className="fotoPeli"src={`https://image.tmdb.org/t/p/w300${elm.poster_path}`} alt={elm.title}/>
                                    <h3 className='Tpeli'>{elm.title}</h3> 
                                    {this.state.verDescripcion== false ? null : <p>{this.elm.overview}</p> }
                
                                 
                            
                                </Link>   
                              
                                   
                            </div>
                        ))
                        
                    ) 
                    :
                    <h1>Cargando...</h1>
                }
            </div>
            </section>
            
        )
    }

} 

export default PeliculasHijo1;