import React, {Component} from 'react';
// Enrutamiento y enlaces
import {Link, Redirect} from 'react-router-dom';
// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Peticiones Http
import axios from 'axios';
// EndPoint
import global from '../../conf/global.js';
// Popup de alerta
import swal from 'sweetalert';
// Modelo para Heroe
import HeroeModel from '../../models/Heroe.js';

class HeroeComponent extends Component{
    // Variables
    heroeId = null;
    endpoint = global.url;
    nombreRef = React.createRef();
    poderRef = React.createRef();    
    estadoRef = React.createRef();

    state = {
        heroe: new HeroeModel('', '', '', ''),
        status: ''
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
            if(res.data){
                this.setState({
                    heroe: res.data
                });
            }
        });

        console.log(this.state.heroe);
    };  
    //----------------------------------------------------------------------------------//
    // Metodo para cambiar el estado de boton Vivo/Muerto                               //
    //----------------------------------------------------------------------------------//
    cambiarEstado = () => {
        // Log de seguimiento
        console.log("HeroeComponent.js - Metodo cambiarEstado"); 

        if(!this.state.heroe.estado){
            this.setState({
                heroe: {
                    nombre: this.nombreRef.current.value,
                    poder: this.poderRef.current.value,                    
                    estado: true
                }
            })
        }else{
            this.setState({
                heroe: {
                    nombre: this.nombreRef.current.value,
                    poder: this.poderRef.current.value,                    
                    estado: false
                }
            })            
        }
    }; 
    //----------------------------------------------------------------------------------//
    // Metodo para modificar el state de manera dinamica                                //
    //----------------------------------------------------------------------------------//
    cambiarState = (heroe) => {
        // Log de seguimiento
        console.log("HeroeComponent.js - Metodo cambiarState"); 

        this.setState({
            heroe: {
                nombre: this.nombreRef.current.value,
                poder: this.poderRef.current.value,
                estado: this.estadoRef.current.value
            }
        });

        heroe = this.state.heroe;
    };         
    //----------------------------------------------------------------------------------//
    // Metodo para guardar el registro                                                  //
    //----------------------------------------------------------------------------------//    
    guardar = (e) => {
        // Log de seguimiento
        console.log('HeroeComponent.js - Metodo guardar');

        // cuando se lance el formulario, no se actualiza la pagina, bloquea la recarga 
        e.preventDefault();

        // Si el id de heroe esta relleno, actualizamos, sino escribimos
        if(this.heroeId !== 'nuevo'){
            // Rellena el state con los datos del formulario
            this.cambiarState(this.state.heroe);
            axios.put(this.endpoint + '/heroes/' + this.heroeId + '.json', this.state.heroe)
            .then( res => {
                if(res.data){
                    this.setState({
                        status: 'success'
                    });    

                    // Popup de confirmacion
                    swal(
                        'Heroe modificado',
                        'El Heroe ha sido modificado correctamente.',
                        'success'
                    );                          
                }
            })
            .catch(err => {
                console.log(err); 
            });
        }else{
            axios.post(this.endpoint + '/heroes.json', this.state.heroe)
                .then( res => {
                if(res.data){
                    // Popup de confirmacion
                    swal(
                        'Heroe Creado',
                        'El Heroe ha sido creado correctamente.',
                        'success'
                    );
                    // Redireccionamos a Inicio una vez guardado
                    this.$router.push('/heroes');                    
                }
            })
            .catch(err => {
                console.log(err); 
            }); 
        }
    } 
    //----------------------------------------------------------------------//
    // Metodo render                                                        //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('HeroeComponent.js - Metodo render()');

        // Redireccionamos a Inicio una vez guardado
        if(this.state.status === 'success'){
            return(
                <Redirect to={'/heroes'} />
            );
        }

        return(
            <div>
                {this.state.heroe.nombre !== '' &&
                    <h1>Heroe: <small>{this.state.heroe.nombre}</small></h1>
                }
                {this.state.heroe.nombre === '' &&
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
                                <input type="text" className="form-control" placeholder="Id Firebase" defaultValue={this.heroeId} name="id" disabled />
                                <small className="form-text text-muted">Este campo se genera automaticamente.</small>
                            </div>
                            {/* Nombre */}
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="Nombre" defaultValue={this.state.heroe.nombre} ref={this.nombreRef} name="nombre" required />
                            </div>
                            {/* Poder */}
                            <div className="form-group">
                                <label>Poder</label>
                                <input type="text" className="form-control" placeholder="Poder" defaultValue={this.state.heroe.poder} ref={this.poderRef} name="poder" />
                            </div>
                            {/* Estado */}
                            <div className="form-group">
                                <label>Estado</label>
                                <br></br>
                                {this.state.heroe.estado &&
                                    <button onClick={this.cambiarEstado} className="btn btn-outline-success w-25 mr-2" type="button" title="Vivo" defaultValue={this.state.heroe.estado} ref={this.estadoRef}><FontAwesomeIcon icon="thumbs-up" title="Vivo" /> Vivo </button>                                   
                                }
                                {!this.state.heroe.estado &&
                                    <button onClick={this.cambiarEstado} className="btn btn-outline-danger w-25 ml-2" type="button" title="Muerto" defaultValue={this.state.heroe.estado} ref={this.estadoRef}><FontAwesomeIcon icon="thumbs-down" title="Muerto" /> Muerto </button>
                                }                                
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
