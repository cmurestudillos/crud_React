import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Peticiones Http
import axios from 'axios';
// EndPoint
import global from '../../conf/global.js';
// Popup de alerta
//import swal from 'sweetalert';
// Modelo para Heroe
import HeroeModel from '../../models/Heroe.js';

class HeroeComponent extends Component{
    // Variables
    heroeId = null;
    endpoint = global.url;
    state = {
        heroe: new HeroeModel('', '', '', '')
    };    

    //----------------------------------------------------------------------//
    // Antes de renderizar, cargar el metodo                                //
    //----------------------------------------------------------------------//
    componentDidMount (){  
        // Log de seguimiento
        console.log("HeroeComponent.js - Metodo componentWillMount");  

        // Obtenemos el id del registro a modificar
        this.heroeId = this.props.match.params.id;
        this.getHeroeById(this.heroeId);
    }   
    //----------------------------------------------------------------------------------//
    // Metodo para obtener los datos de registro a modificar                            //
    //----------------------------------------------------------------------------------//
    getHeroeById = (heroeId) => {
        // Log de seguimiento
        console.log("HeroeComponent.js - Metodo getHeroeById"); 

        axios.get(this.endpoint + "/heroes/" + heroeId + '.json')
        .then(res => {
            this.setState({
                heroe: res.data
            });
        });
    };     
    //----------------------------------------------------------------------//
    // Metodo render                                                        //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('HeroeComponent.js - Metodo render()');

        // movemos los datos del state a una variable mas manejable
        var datosHeroe = this.state.heroe;

        return(
            <div>
                {datosHeroe.nombre !== '' &&
                    <h1>Heroe: <small>{datosHeroe.nombre}</small></h1>
                }
                {datosHeroe.nombre === '' &&
                    <h1>Heroe: <small>Nombre del heroe</small></h1>
                }                
                <hr></hr>
                <div className="row text-right">
                    <div className="col">
                        <Link to="/heroes" className="btn btn-outline-primary" title="Volver"><FontAwesomeIcon icon="arrow-left" title="Volver" /> Volver </Link>
                    </div>
                </div>   
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.guardar}>
                            {/* Id del registro */}
                            <div className="form-group">
                                <label>Id Firebase</label>
                                <input type="text" className="form-control" placeholder="Id Firebase" v-model="heroe.id" name="id" disabled />
                                <small className="form-text text-muted">Este campo se genera automaticamente.</small>
                            </div>
                            {/* Nombre */}
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="Nombre" v-model="heroe.nombre" name="nombre" required />
                            </div>
                            {/* Poder */}
                            <div className="form-group">
                                <label>Poder</label>
                                <input type="text" className="form-control" placeholder="Poder" v-model="heroe.poder" name="poder" />
                            </div>
                            {/* Estado */}
                            <div className="form-group">
                                <label>Estado</label>
                                <br></br>
                                <button onClick="heroe.estado = false" className="btn btn-outline-success w-25 mr-2" type="button" title="Vivo"><FontAwesomeIcon icon="thumbs-up" title="Vivo" /> Vivo </button>   
                                <button onClick="heroe.estado = true" className="btn btn-outline-danger w-25 ml-2" type="button" title="Muerto"><FontAwesomeIcon icon="thumbs-down" title="Muerto" /> Muerto </button>   
                            </div>
                            <hr></hr>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-outline-primary w-25" title="Guardar"><FontAwesomeIcon icon="save" title="Guardar" /> Guardar </button>
                            </div>
                        </form>
                    </div>
                </div>                               
            </div>         
        )
    }
}

export default HeroeComponent;
