import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const APIKEY = 'b4162f48d94a73d5f95feab7a9a5c8de';

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasFav: [],
        };
    }

    componentDidMount() {
        let storage = localStorage.getItem('PeliculasFavoritas');
        if (storage) {
            let storageParseado = JSON.parse(storage);

            if (Array.isArray(storageParseado) && storageParseado.length > 0) {
                Promise.all(
                    storageParseado.map(elm =>
                        fetch(`https://api.themoviedb.org/3/movie/${elm}?api_key=${APIKEY}`)
                            .then(resp => resp.json())
                    )
                )
                .then(data => this.setState({ peliculasFav: data }))
                .catch(err => console.log(err));
            }
        }
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
  
    render() {
    
        return (
            <div>
                {this.state.peliculasFav.length > 0
                    ? this.state.peliculasFav.map(elm => (
                        <div className='pelicula' key={elm.id}>
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
                                </button>
                            }  
                        </div>
                    ))
                    : <h1 className="titulo-peli">No hay películas favoritas</h1>}
            </div>
        );
    }
}

export default Favoritos;