import React, {Component} from 'react';
// Peticiones Http
import axios from 'axios';
// EndPoint
import global from '../../conf/global';
// Modelo para Heroe
import HeroeModel from '../../models/Heroe.js';

class HeroesComponent extends Component{
   // Variables
   endpoint = global.url;
   state = {
       heroes: [],
       cargando: false
   }  
    //----------------------------------------------------------------------//
    // Antes de renderizar, cargar el metodo                                //
    //----------------------------------------------------------------------//
    componentDidMount (){  
        // Log de seguimiento
        console.log("HeroesComponent.js - Metodo componentWillMount");  

        this.getHeroes();
    }
    //----------------------------------------------------------------------//
    // Metodo getPaises para obtener todos los paises                       //
    //----------------------------------------------------------------------//
    getHeroes = () => {
        // Log de seguimiento
        console.log("HeroesComponent.js - Metodo getHeroes");

        this.setState({
            cargando: true
        })

        axios.get(this.endpoint + '/heroes.json')
        .then(res => {
            if(res.data){
                this.setState({
                    heroes: this.heroesArray(res.data),
                    cargando: false
                });
            }
        });
    }; 
    //----------------------------------------------------------------------//
    // Metodo para mostrar el objeto de heroes recibido en el 'res'         //
    // del map y devolverlo transofrmado en un Array para mostrar           //
    // en pantalla                                                          //
    //----------------------------------------------------------------------//
    heroesArray(heroesObj){
        // Log de seguimiento
        var heroesData = [];

        if(heroesObj === null){
            return [];
        }

        Object.keys(heroesObj).forEach( key => {
            var heroe = HeroeModel;
            heroe = heroesObj[key];
            heroe.id = key;
            // Devolvemos en el Array el objeto extraido
            heroesData.push(heroe);
        });
        return heroesData;
    };
    //----------------------------------------------------------------------//
    // Metodo render                                                        //
    //----------------------------------------------------------------------//    
    render(){
        // Log de seguimiento
        console.log('HeroesComponent.js - Metodo render()');

        if(this.state.heroes.length >= 1){
            var listarHeroes = this.state.heroes.map( (heroe) => {
                return(
                    <div>
                        <h1>Listado de Heroes</h1>
                        <hr></hr>
                    </div>                   
                )
            });

            return(
                <div>
                    {listarHeroes}
                </div>                    
                );
        }
    }
}

export default HeroesComponent;
