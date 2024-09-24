import React, { Component } from 'react';
import Busqueda from '../Busqueda/busqueda';
import {Link} from "react-router-dom"


const APIKEY = 'b4162f48d94a73d5f95feab7a9a5c8de'
class Todas1 extends Component {
    constructor (props) {
        super (props)
        this.state = {
            peliculas: [],
            verMas : false,
            dobleClick : false,
            verDescripcion: false,
            botonDescripcion: "Ver más",
            overview: props.overview,
            detalleBoton: "Ir a detalle",
            favoritosBoton: "Agregar a favoritos", 
            favoritos:false,
            peliculaSeleccionada: null, 
            paginaACargar: 2
            
        }
        console.log('Soy el constructor')
    }

    componentDidMount() {
        console.log('Soy el didMount')
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
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

    // verMasVerMenos(){
    //     this.state.verDescripcion == false ? this.setState({
    //         verDescripcion: true,
    //         botonDescripcion: "Ver menos"
    //     }) : this.setState({
    //         verDescripcion: false,
    //         botonDescripcion: "Ver mas"
    //     })
    // }

    dobleClick(){
        if(this.state.dobleClick === true){
            this.setState({
                dobleClick: false 
            })
        } else {
            this.setState({
                dobleClick: true, 
            })
        }
    }
    // favorito() {
    //     this.state.favoritos == false ? this.setState({
    //         favoritos: true,
    //         favoritosBoton: "Quitar de favoritos"
    //     }) : this.setState({
    //         favoritos: false,
    //         favoritosBoton: "Agregar a favoritos"
    //     })
    // }

    verMasVerMenos(idPelicula) {
        // Si la película seleccionada ya es la misma, ocultamos la descripción.
        this.setState(prevState => ({
            peliculaSeleccionada: prevState.peliculaSeleccionada === idPelicula ? null : idPelicula
        }));
    }

    favorito(idPelicula) {
        // Alternamos el estado de favorito de la película seleccionada
        this.setState(prevState => ({
            favoritos: {
                ...prevState.favoritos,
                [idPelicula]: !prevState.favoritos[idPelicula] // Alterna el estado actual de favorito
            }
        }));
    }

    cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${this.state.paginaACargar}`)
        .then(resp => resp.json())
        .then(data => this.setState({peliculas: this.state.peliculas.concat(data.results),
        filtrarPeliculas: this.state.peliculas.concat(data.results),
        paginaACargar: this.state.paginaACargar + 1
    }))
        .catch(err => console.log(err))
    }

    render(){
        console.log('Soy el render')
        const id = this.state.id
        return (
            
            <section>
                <h1 className="titulo-peli">Peliculas populares</h1> 
               
               <Busqueda filtrarPeliculas = {(nombre) => this.filtrarPeliculas(nombre)} /> 

              <button className='botones-todas' onClick={()=> this.cargarMas()}>
                                  Cargar mas
              </button>
              
              <div  className= 'comp-peliculas'>
                        
             
                {
                    this.state.peliculas.length > 0
                    ? 
                    (
                        this.state.peliculas.map((elm) => (
                            <div key={elm.id}  className= 'pelicula'> 
                             <Link to=  {`/Detalle/id/${elm.id}`}>
                                
                                    <img  className="fotoPeli"src={`https://image.tmdb.org/t/p/w300${elm.poster_path}`} alt={elm.title}/>
                                    <h3 className='Tpeli'>{elm.title}</h3> 
                                    {this.state.verDescripcion== false ? null : <p>{this.elm.overview}</p> }
                
                                 
                            
                          </Link>   
                             {/* <button onClick={() => this.verMasVerMenos()}> {this.state.botonDescripcion} </button>
       
                          
                            {
                                this.state.esFavorito ?
                                <button>
                                    Sacar de favoritos
                                </button>
                                :
                                <button onClick={() => (this.state.id) }>
                                    Agregar a favoritos 
                                </button>
                            } */}
                            

                                {/* Mostrar la descripción solo si esta película fue seleccionada */}
                                {this.state.peliculaSeleccionada === elm.id && <p>{elm.overview}</p>}

                                <button className="botones" onClick={() => this.verMasVerMenos(elm.id)}>
                                    {this.state.peliculaSeleccionada === elm.id ? "Ocultar descripción" : "Ver descripción"}
                                </button>

                                {/* Botón de favoritos para cada película */}
                                <button  className="botones" onClick={() => this.favorito(elm.id)}>
                                    {this.state.favoritos[elm.id] ? "Quitar de favoritos" : "Agregar a favoritos"}
                                </button>

                            </div>
                        ))
                    ) 
                    :
                    <h1 className='carga'>Cargando...</h1>
                }
            </div>
            </section>
            
        )
    }
    

} 

export default Todas1;