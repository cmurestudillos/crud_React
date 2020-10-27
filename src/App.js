import React from 'react';
// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/animate.css';
// Rutas
import Router from './routes/Router';
// Iconos
require('./plugins/fontawesome');

function App() {
  return (
    <div className="container mt-5">
      <Router /> 
    </div>
  );
}

export default App;
