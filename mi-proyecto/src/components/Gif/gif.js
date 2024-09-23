import React, { Component } from 'react';


class Gif extends Component{

    constructor(props){
        super(props);
        this.state = {
            gif: false
        }
    }



    componentDidMount(){
        console.log(" didmounteado");
      //  this.apiCall("https://api.giphy.com/v1/gifs/random?api_key=QHFUviTHiVBVTMDTOzapcATlcDOzVJBG&tag=&rating=g", this.mostrarGif)
        setTimeout(() => {
            this.setState({ gif: true });
          }, 1500);
    }


    render(){
        console.log("estoy renderizado");

        let contenido ;
        if (!this.state.gif ){ 
            contenido = (
            <img 
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTl5dnR2OWtyczJmZWF0Yjg4d3J5MWVmNmg1d3phY3hjeXh6c2hvbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3AMRa6DRUhMli/giphy.webp?text=Cargando..."
                alt="Cargando..."
                
              />
            );
            //<p> Cargando ....</p>
        }else{
           contenido = <img src={this.state.gif} alt=""></img>
        }

        return(

            <div>
                {contenido}
               
            </div> 

            
          
        );
        
    }

}

export default Gif;