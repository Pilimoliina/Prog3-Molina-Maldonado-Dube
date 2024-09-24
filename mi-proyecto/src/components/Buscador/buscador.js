import React, { Component } from "react";

class Buscador extends Component {

    render() {
        return (
            <form className="search" onSubmit={(event) => this.evitarSubmit(event)}>
                <input className="input"
                />
                <button className="boton" type='submit' >BUSCAR</button>
            </form>
        )
    }
}
export default Buscador