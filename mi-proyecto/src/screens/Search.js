
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const APIKEY = 'b4162f48d94a73d5f95feab7a9a5c8de';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      resultados: [],
      peliculaSeleccionada: null,
      favoritos: {},
    };
  }

  componentDidMount() {
    const loQueBuscaElUsuario = this.props.location.state.busqueda; // Búsqueda del usuario
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${loQueBuscaElUsuario}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ resultados: data.results });
      })
      .catch((err) => console.log(err));
  }

  // Función para mostrar/ocultar descripción
  verMasVerMenos(idPelicula) {
    this.setState((prevState) => ({
      peliculaSeleccionada: prevState.peliculaSeleccionada === idPelicula ? null : idPelicula,
    }));
  }

  // Función para alternar favoritos
  favorito(idPelicula) {
    this.setState((prevState) => ({
      favoritos: {
        ...prevState.favoritos,
        [idPelicula]: !prevState.favoritos[idPelicula], // Alterna el estado actual de favorito
      },
    }));
  }

  render() {
    return (
      <section>
        <h1 className="titulo-peli">Resultados de búsqueda</h1>
        <div className="comp-peliculas">
          {this.state.resultados.length > 0 ? (
            this.state.resultados.map((elm) => (
              <div key={elm.id} className="pelicula">
                <Link to={`/Detalle/id/${elm.id}`}>
                  <img
                    className="fotoPeli"
                    src={`https://image.tmdb.org/t/p/w300${elm.poster_path}`}
                    alt={elm.title}
                  />
                  <h3 className="Tpeli">{elm.title}</h3>
                </Link>

                {/* Mostrar la descripción solo si esta película fue seleccionada */}
                {this.state.peliculaSeleccionada === elm.id && <p>{elm.overview}</p>}

                <button className="botones" onClick={() => this.verMasVerMenos(elm.id)}>
                  {this.state.peliculaSeleccionada === elm.id ? 'Ocultar descripción' : 'Ver descripción'}
                </button>

                {/* Botón de favoritos para cada película */}
                <button className="botones" onClick={() => this.favorito(elm.id)}>
                  {this.state.favoritos[elm.id] ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </button>
              </div>
            ))
          ) : (
            <h1>No hay resultados para su búsqueda</h1>
          )}
        </div>
      </section>
    );
  }
}
export default Search
