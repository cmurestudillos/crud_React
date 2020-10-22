import React, {Component} from 'react';

class HeroesComponent extends Component{
    render(){
        // Log de seguimiento
        console.log('HeroesComponent.js - Metodo render()');
        return(
            <div className="container text-center">
                <h1 className="sub-header-error">Componente - Heroes.</h1>
                <hr></hr>
            </div>         
        )
    }
}

export default HeroesComponent;
