import React, { Component } from "react";
import PeliculasHijo1 from "../PeliculasHijo1/PeliculasHijo1";
import './styles.css';

class Favorito extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favoritos: []
        };
    }
    componentDidMount() {
        let storage = localStorage.getItem("categoriaFavs")
        if (storage !== null) {
            let arrParseado = JSON.parse(storage);
            arrParseado.map(id =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b4162f48d94a73d5f95feab7a9a5c8de`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        this.setState({
                            favoritos: this.state.favoritos.concat(data)
                        })
                    })
                    .catch((err) => console.log(err)))
                ;
        }
    }
    render() {
        const { favoritos } = this.state;
        return (
            <>
              
                <div>
                    {favoritos.length === 0 ? (<p>No tienes peliculas favoritas</p>)
                        :
                        (favoritos.map((elm, id) => (<PeliculasHijo1 key={id} elm={elm} />)))}</div>
                     
            </>
        )
    }
}
export default Favorito;
