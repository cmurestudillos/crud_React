import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Peticiones Http
import axios from 'axios';
// EndPoint
import global from '../../conf/global';
// Modelo para Heroe
import HeroeModel from '../../models/Heroe.js';
// Popup
import swal from 'sweetalert';

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
    // Metodo getHeroes para obtener todos los paises                       //
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
    // Metodo borrarHeroe para obtener todos los paises                     //
    //----------------------------------------------------------------------//
    borrarHeroe = (heroeId) =>{
        // Log de seguimiento
        console.log("HeroesComponent.js - Metodo borrarHeroe");

        // popup de confirmacion
        swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podrá recuperar este archivo.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.endpoint + '/heroes/' + heroeId + '.json')
                    .then(res => {
                        this.heroes = res.data;
                        // Volvemos a cargar actualizada la pantalla sin el registro eliminado
                        this.getHeroes();
                    });
                } else {
                    swal("Tu archivo esta seguro.");
                }
        }); 
    };     
    //----------------------------------------------------------------------//
    // Metodo render                                                        //
    //----------------------------------------------------------------------//    
    render(){
        // Log de seguimiento
        console.log('HeroesComponent.js - Metodo render()');

        return (
            <div>
                <h1>Listado de Heroes</h1>
                <hr></hr>
                <div className="row">
                    <div className="col text-right">
                        <Link to="/heroe/nuevo" className="btn btn-outline-primary" title="Alta"><FontAwesomeIcon icon="plus" /> Nuevo </Link>
                    </div>
                </div>

                {this.state.cargando === false &&
                    <table className="table mt-3">
                        <thead className="bg-custom">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Poder</th>
                                <th scope="col">Estado</th>
                                <th scope="col" colSpan="2" className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.heroes.map( (heroe) => 
                                <tr key={heroe.id}>
                                    <td>{heroe.nombre}</td>
                                    <td>{heroe.poder}</td>
                                    <td>
                                        {heroe.estado === true &&
                                            <FontAwesomeIcon icon="thumbs-up" className="text-success fa-2x" title="Vivo" />
                                        }
                                        {heroe.estado === false &&
                                            <FontAwesomeIcon icon="thumbs-down" className="text-danger fa-2x" title="Muerto" />
                                        }                                        
                                    </td>
                                    <td className="text-center">
                                        <Link to={'/heroe/' + heroe.id} className="btn btn-outline-warning mr-1" title="Modificar"><FontAwesomeIcon icon="edit" /></Link>
                                        <button className="btn btn-outline-danger" onClick={() => this.borrarHeroe(heroe.id)} title="Eliminar"><FontAwesomeIcon icon="trash" /></button>
                                    </td>
                                </tr>                                 
                            )
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="bg-custom"><span><i>Copyright© - Carlos Mur</i></span></td>
                            </tr>
                        </tfoot>
                    </table> 
                }

                {this.state.cargando === false && this.state.heroes === '' &&
                    <div className="alert alert-warning text-center mt-3">
                        <h4 className="alert-heading">No hay registros</h4>
                        <p><FontAwesomeIcon icon="exclamation" className="fa-2x" /></p>
                    </div>                
                }

                {this.state.cargando === true &&
                    <div className="alert alert-info text-center mt-3">
                        <h4 className="alert-heading">Cargando</h4>
                        <p><FontAwesomeIcon icon="spinner" className="fa-2x" /></p>
                        <p className="mb-0">Espere por favor...</p>
                    </div>                
                }
            </div>
        )
    }
}

export default HeroesComponent;
