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

        // Cargar favoritos desde localStorage al montar el componente
        this.actualizarFavoritos();
    }

    actualizarFavoritos() {
        let favoritos = localStorage.getItem('PeliculasFavoritas');
        if (favoritos) {
            // Parseamos los favoritos y creamos un objeto donde la clave es el id de la película
            let favoritosParseados = JSON.parse(favoritos);
            let favoritosObj = {};
            favoritosParseados.forEach(id => {
                favoritosObj[id] = true;
            });
            this.setState({
                favoritos: favoritosObj
            });
        }
    }

    agregarAStorage(id) {
        let favoritos = localStorage.getItem('PeliculasFavoritas');
        let peliculasFavoritas = favoritos ? JSON.parse(favoritos) : [];

        if (!peliculasFavoritas.includes(id)) {
            peliculasFavoritas.push(id);
            localStorage.setItem('PeliculasFavoritas', JSON.stringify(peliculasFavoritas));
        }

        this.setState(prevState => ({
            favoritos: {
                ...prevState.favoritos,
                [id]: true
            }
        }));
    }

    sacarDeStorage(id) {
        let favoritos = localStorage.getItem('PeliculasFavoritas');
        if (favoritos) {
            let peliculasFavoritas = JSON.parse(favoritos);
            let nuevoFavoritos = peliculasFavoritas.filter(item => item !== id);
            localStorage.setItem('PeliculasFavoritas', JSON.stringify(nuevoFavoritos));
        }

        this.setState(prevState => ({
            favoritos: {
                ...prevState.favoritos,
                [id]: false
            }
        }));
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

                                {this.state.favoritos[elm.id]
                                    ? <button className="botones" onClick={() => this.sacarDeStorage(elm.id)}>
                                        Sacar de favoritos
                                      </button>
                                    : <button className="botones" onClick={() => this.agregarAStorage(elm.id)}>
                                        Agregar a favoritos
                                      </button>}

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