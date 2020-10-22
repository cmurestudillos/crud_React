import React, {Component} from 'react';
// Rutas
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Componentes
import HeroesComponent from '../components/heroes/HeroesComponent';
import HeroeComponent from '../components/heroe/HeroeComponent';
import ErrorComponent from '../components/error/ErrorComponent';

class Router extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//
    render(){
        // Log de seguimiento
        console.log('RouterComponent - Metodo render()');

        return(
            <BrowserRouter>
                {/* Configuracion de rutas y paginas */}
                <Switch>
                    <Route exact path="/" component={HeroesComponent} />
                    <Route exact path="/heroes" component={HeroesComponent} />
                    <Route exact path="/heroe/:id" component={HeroeComponent} />
                    <Route component={ErrorComponent} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;