import React, {Component} from 'react';

class HeroeComponent extends Component{
    render(){
        // Log de seguimiento
        console.log('HeroeComponent.js - Metodo render()');
        return(
            <div>
                <h1 className="sub-header-error">Componente - Heroe.</h1>
                <hr></hr>
            </div>         
        )
    }
}

export default HeroeComponent;
