import React, { Component } from "react"
import ReactDOM from 'react-dom';
import './busqueda.css';



class Busqueda extends React.Component{

  constructor(data) {
    super(data);
    this.state = {mensaje: "Mensaje 1",
  mensaje2: "x"
  };
  }

  funcion =(data)=>{
    //console.log(data);

fetch('https://api.mercadolibre.com/sites')
.then(res => res.json())
.then((data) => {
  this.setState({mensaje: data[0].name});
})
.catch(console.log)
  }

  updateInputValue(evt) {
    this.setState({
      mensaje2: evt.target.value
    });
  }


render(){
    return (
      <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
          <input id="busqueda" class="search_input" value={this.state.mensaje2} type="text" name="" placeholder="Ingrese aqui lo que desea buscar..." onClick={this.funcion} onChange={evt => this.updateInputValue(evt)}    />
          <a href="#" class="search_icon"><i class  ="fas fa-search"></i></a>
        </div>
      </div>
      <br/>
      {this.state.mensaje}
     </div>
    );
}
}

ReactDOM.render(<Busqueda/>, document.getElementById('barraBusqueda'));


function Cards(data){
    return (  
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{data.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{data.body}</h6>
          <p class="card-text">Stay Hungry, Stay Foolish</p>
        </div>
        </div>
        
    );
}





export default Busqueda;