import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header'
import { DirectorVista } from './components/directores/DirectorVista'
import { GeneroVista } from './components/generos/GeneroVista'
import { ProductoraVista } from './components/productoras/ProductoraVista'
import { MultimediaVista } from './components/multimedia/MultimediaVista'
import { TipoVista } from './components/tipos/TipoVista'
import { MultimediaUpdate } from "./components/multimedia/MultimediaUpdate";



function App() {
  return <Router>
    <Header/>
    {<Switch>
        <Route exact path='/' component={MultimediaVista} />
        <Route exact path='/directores' component={DirectorVista} />
        <Route exact path='/generos' component={GeneroVista} />
        <Route exact path='/productoras' component={ProductoraVista} />
        <Route exact path='/tipos' component={TipoVista} />
        <Route exact path='/multimedias/edit/:multimediaId' component={ MultimediaUpdate } />
        <Redirect to='/' />
      </Switch>}
</Router>
}

export default App;