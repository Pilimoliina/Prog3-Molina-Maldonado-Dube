import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './screens/Home'
import Favoritos from './screens/Favoritos'
import Footer from './components/Footer'
import Gif from './components/Gif/gif';
import Peliculas from './components/Peliculas/peliculas'
import NotFound from './screens/NotFound'
import Detalle from "./screens/Detalle";
import Search from "./screens/Search";

import todasPadrePopulares from './components/TodasPadrePopulares/todasPadrePopulares'
import todasPadreCartelera from './components/TodasPadreCartelera/todasPadreCartelera'


function App(props) {
  console.log('Estas son las props de la Aplicacion', props)
  return (
    <>

      <Header />

        
        <Gif/>
        <Switch >
          <Route path='/' exact={true} component={Home} />
          <Route path='/vertodasPopulares' component={todasPadrePopulares} />
          <Route path='/vertodasCartelera' component={todasPadreCartelera} /> 
          <Route path='/favoritos' component={Favoritos} />  
          <Route path="/Detalle/id/:id" component={Detalle}/>   
          <Route path="/Search" component={Search}/>
          <Route path='' component={NotFound} />
          <Peliculas/> 
          
        </Switch>

      <Footer />
    </>
  );
}

export default App;