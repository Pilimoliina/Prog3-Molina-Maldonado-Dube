import React, { Component } from "react";
import "../components/Peliculas/styles.css";
let api_key = "b4162f48d94a73d5f95feab7a9a5c8de";

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: [],
            favoritos: {} 
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    pelicula: data
                });
            })
            .catch((err) => console.log(err));
    }

    favorito = (id) => {
        this.setState((prevState) => ({
            favoritos: {
                ...prevState.favoritos,
                [id]: !prevState.favoritos[id], // Alternar el estado del favorito
            },
        }));
    };

    render() {
        const { pelicula, favoritos } = this.state;
        return (
            <div className="pelicula"   style={{ margin: 'auto', marginTop: '10px', marginBottom: '10px', padding: '50px'}} >
                <h1>Detalle : {this.state.pelicula.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500/${this.state.pelicula.poster_path}`} alt="" className="foto-detalle"/>
                <p> Descripción: {this.state.pelicula.overview}</p>
                <p> Rating: {this.state.pelicula.vote_average} </p>
                <p> Fecha de estreno: {this.state.pelicula.release_date} </p>
                <p>Género: {pelicula.genres && Array.isArray(pelicula.genres) ? pelicula.genres.map((genre) => genre.name).join(', ') : '' }</p>
                <p> Duración: {this.state.pelicula.runtime} mins </p>
               
                {/* Botón de favoritos para cada película */}
                <button className="botones" onClick={() => this.favorito(pelicula.id)}>
                    {favoritos[pelicula.id] ? "Quitar de favoritos" : "Agregar a favoritos"}
                </button>
                

            </div>
        );
    }
}

export default Detalle;