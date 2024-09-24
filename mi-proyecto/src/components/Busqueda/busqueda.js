import React, { Component } from "react";

class Busqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valorInput1: ''
        }
    }

    evitarSubmit(event) {
        console.log(event)
        event.preventDefault()
    }

    controlarInputs(event) {
        this.setState({
            valorInput1: event.target.value
        }, () => this.props.filtrarPeliculas(this.state.valorInput1))

    }
    filtrarPeliculas(nombrePelicula) {
        const peliculasFiltradas = this.state.peliculas.filter((elm) => elm.title.toLowerCase().includes(nombrePelicula.toLowerCase()))
        this.setState({
            peliculas: peliculasFiltradas
        })
    }
    render() {
        return (
            <form className="search" onSubmit={(event) => this.evitarSubmit(event)}>
                <input className="input"
                    onChange={(event) => this.controlarInputs(event)}
                    value={this.state.valorInput1}
                />
                <button className="boton" type='submit' >BUSCAR</button>
            </form>
        )
    }
}

export default Busqueda