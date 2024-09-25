import React, {Component} from "react";
import {Link} from 'react-router-dom'

class Favorito extends Component {
    constructor(props){
        super(props)
        this.state={
           esFavorito: false,
        }
    }

    componentDidMount(){
        let storage = localStorage.getItem('PeliculasFavoritas')
        if(storage !== null){
            let arrParseado = JSON.parse(storage)
            let estaMiId = arrParseado.includes(this.props.data.id)
            if(estaMiId){
                this.setState({
                    esFavorito: true
                })
            }
        }
        
    }


    render(){
        const id = this.props.id
        return(
            <div>
            <Link to={`/detalle/${id}`}>
                    <article className="pelicula">
                        <p>{this.props.data.nombre}</p>
                    </article>
            </Link>

                
            </div>
        )
    }
}

export default Favorito;

