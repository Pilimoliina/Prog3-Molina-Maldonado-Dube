import {Component} from 'react';



class Buscador extends Component{
    constructor(props){
        super(props)
        this.state = {
            peliculas: [],
            busqueda: ''
        }
    }

    cambioEnInput(event){
        this.setState({
            busqueda: event.target.value
        })
    }

    evitarSubmit(event){
        event.preventDefault()
        this.props.history.push('/Search', {busqueda: this.state.busqueda})
    }

    render(){
        return(
            <form className='search' onSubmit={(e) => this.evitarSubmit(e)}> 
                <input className='input' value = {this.state.busqueda} onChange = {(e) => this.cambioEnInput(e)} />
                <button className='boton'>Buscar</button>
            </form>
        )
    }
}

export default Buscador;