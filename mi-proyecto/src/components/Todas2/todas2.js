import React, { Component } from 'react';
import Busqueda from '../Busqueda/busqueda';
import { Link } from "react-router-dom";

const APIKEY = 'b4162f48d94a73d5f95feab7a9a5c8de';

class Todas2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            verMas: false,
            dobleClick: false,
            verDescripcion: false,
            botonDescripcion: "Ver más",
            favoritos: {}, // Usaremos un objeto para manejar los favoritos
            peliculaSeleccionada: null,
            paginaACargar: 2,
        };
    }

    componentDidMount() {
        // Llamada a la API para obtener las películas populares
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results
                });
            })
            .catch((err) => console.log(err));


    }


    cargarMas() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&page=${this.state.paginaACargar}`)
            .then(resp => resp.json())
            .then(data => this.setState({
                peliculas: this.state.peliculas.concat(data.results),
                paginaACargar: this.state.paginaACargar + 1
            }))
            .catch(err => console.log(err));
    }

    verMasVerMenos(idPelicula) {
        this.setState(prevState => ({
            peliculaSeleccionada: prevState.peliculaSeleccionada === idPelicula ? null : idPelicula
        }));
    }

    render() {
        return (
            <section>
                <h1 className="titulo-peli">Películas en cartelera</h1>
                <Busqueda filtrarPeliculas={(nombre) => this.filtrarPeliculas(nombre)} />

                <button className='botones-todas' onClick={() => this.cargarMas()}>
                    Cargar más
                </button>

                <div className='comp-peliculas'>
                    {this.state.peliculas.length > 0
                        ? this.state.peliculas.map((elm) => (
                            <div key={elm.id} className='pelicula'>
                                <Link to={`/Detalle/id/${elm.id}`}>
                                    <img className="fotoPeli" src={`https://image.tmdb.org/t/p/w300${elm.poster_path}`} alt={elm.title} />
                                    <h3 className='Tpeli'>{elm.title}</h3>
                                </Link>

                                

                                {this.state.peliculaSeleccionada === elm.id && <p>{elm.overview}</p>}

                                <button className="botones" onClick={() => this.verMasVerMenos(elm.id)}>
                                    {this.state.peliculaSeleccionada === elm.id ? "Ocultar descripción" : "Ver descripción"}
                                </button>
                            </div>
                        ))
                        : <h1 className='carga'>Cargando...</h1>}
                </div>
            </section>
        );
    }
}

export default Todas2;