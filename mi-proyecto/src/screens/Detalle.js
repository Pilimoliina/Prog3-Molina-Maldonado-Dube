import React, { Component } from "react";
import "../components/Peliculas/styles.css";
let api_key = "b4162f48d94a73d5f95feab7a9a5c8de";

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: [],
            favoritos: {}, // Manejar favoritos como un objeto
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        // Llamada para obtener los detalles de la película
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    pelicula: data,
                });
            })
            .catch((err) => console.log(err));

        // Cargar los favoritos desde localStorage cuando se monta el componente
        this.actualizarFavoritos();
    }

    // Actualizar el estado de favoritos al montar el componente
    actualizarFavoritos = () => {
        let favoritos = localStorage.getItem("PeliculasFavoritas");
        if (favoritos) {
            let favoritosParseados = JSON.parse(favoritos);
            let favoritosObj = {};
            favoritosParseados.forEach((id) => {
                favoritosObj[id] = true;
            });
            this.setState({
                favoritos: favoritosObj,
            });
        }
    }

    // Función para agregar una película a favoritos
    agregarAStorage = (id) => {
        let favoritos = localStorage.getItem("PeliculasFavoritas");
        let peliculasFavoritas = favoritos ? JSON.parse(favoritos) : [];

        if (!peliculasFavoritas.includes(id)) {
            peliculasFavoritas.push(id);
            localStorage.setItem("PeliculasFavoritas", JSON.stringify(peliculasFavoritas));
        }

        this.setState((prevState) => ({
            favoritos: {
                ...prevState.favoritos,
                [id]: true,
            },
        }));
    }

    // Función para eliminar una película de favoritos
    sacarDeStorage = (id) => {
        let favoritos = localStorage.getItem("PeliculasFavoritas");
        if (favoritos) {
            let peliculasFavoritas = JSON.parse(favoritos);
            let nuevoFavoritos = peliculasFavoritas.filter((item) => item !== id);
            localStorage.setItem("PeliculasFavoritas", JSON.stringify(nuevoFavoritos));

            // Actualizar el estado después de modificar el localStorage
            this.setState((prevState) => {
                const nuevosFavoritos = { ...prevState.favoritos };
                delete nuevosFavoritos[id];
                return { favoritos: nuevosFavoritos };
            });
        }
    }

    
    render() {
        const id = this.props.match.params.id;
        const { pelicula, favoritos } = this.state;

        return (
            <div className="pelicula" style={{ margin: "auto", marginTop: "10px", marginBottom: "10px", padding: "50px" }}>
                <h1>Detalle: {pelicula.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt="" className="foto-detalle" />
                <p>Descripción: {pelicula.overview}</p>
                <p>Rating: {pelicula.vote_average}</p>
                <p>Fecha de estreno: {pelicula.release_date}</p>
                <p>Género: {pelicula.genres && Array.isArray(pelicula.genres) ? pelicula.genres.map((genre) => genre.name).join(', ') : ''}</p>
                <p>Duración: {pelicula.runtime} mins</p>

                {/* Botón de favoritos para la película actual */}
                {favoritos[id] ? (
                    <button className="botones" onClick={() => this.sacarDeStorage(id)}>
                        Sacar de favoritos
                    </button>
                ) : (
                    <button className="botones" onClick={() => this.agregarAStorage(id)}>
                        Agregar a favoritos
                    </button>
                )}
            </div>
        );
    }
}

export default Detalle;