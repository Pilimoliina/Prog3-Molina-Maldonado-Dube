import React, { Component } from 'react';


class Gif extends Component{

    constructor(props){
        super(props);
        this.state = {
            gif: false
        }
    }

    // apiCall(url, consecuencia){
    //     fetch(url)
    //     .then(response => response.json())
    //     .then(data => consecuencia(data))
    //     .catch(error=> console.log(error)
    //     )
    // }


    componentDidMount(){
        console.log(" didmounteado");
      //  this.apiCall("https://api.giphy.com/v1/gifs/random?api_key=QHFUviTHiVBVTMDTOzapcATlcDOzVJBG&tag=&rating=g", this.mostrarGif)
        setTimeout(() => {
            this.setState({ gif: true });
          }, 1500);
    }

    // mostrarGif = (data) => {
    //     console.log(data);
        
    //    this.setState({
    //     gif: data.data.images.original.url
        

    //    });
        
    // }
    
    // componentDidUpdate(){
    //     console.log(" actualizadoop");
        
    // }

    render(){
        console.log("estoy renderizado");

        let contenido ;
        if (!this.state.gif ){ 
            contenido = (
            <img 
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnl1Ymg2MTN5emRueWoyY2FjN2lmZWY4OHllY29wN3I4cm5mMWMxYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GgfdLyWlHzKmMlpo89/giphy.webp?text=Cargando..."
                alt="Cargando..."
                width={300}
                
              />
            );
            //<p> Cargando ....</p>
        }else{
         //   contenido = <img src={this.state.gif} alt=""></img>

        }

        return(

            <div>
                {contenido}
               
            </div> 

            
          
        );
        
    }

}

export default Gif;