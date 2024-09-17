import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Peliculas from './components/Peliculas/peliculas'



function App(props) {
  console.log('Estas son las props de la Aplicacion', props)
  return (
    <>

      <Header />

        
        <Switch >
          <Peliculas/> 
          
        </Switch>

      <Footer />
    </>
  );
}

export default App;