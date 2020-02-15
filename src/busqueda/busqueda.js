import React, { Component } from "react"
import ReactDOM from 'react-dom';
import './busqueda.css';



class Busqueda extends React.Component{

  state = {
    contacts: [],
    valueInput: ""
  }

  constructor(data) {
    super(data);   
  }

  click(evt) {
   /* this.setState({
      valueInput: evt.target.value
    });*/
    fetch('https://api.mercadolibre.com/sites/MCO/search?q='+evt.target.value)
    .then(res => res.json())
    .then((data) => {  
     // console.log("MENSAJE: "+data.results[0].title);
      ReactDOM.render(<Cards data={data}/>, document.getElementById('cards'));
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
          <input id="busqueda" class="search_input" value={this.state.mensaje2} type="text" name="" placeholder="Ingrese aqui lo que desea buscar..." onClick={evt => this.click(evt)} onChange={evt => this.updateInputValue(evt)}    />
          <a href="#" class="search_icon"><i class  ="fas fa-search"></i></a>
        </div>
      </div>
      <br/>
     </div>
    );
}
}

ReactDOM.render(<Busqueda/>, document.getElementById('barraBusqueda'));



class Cards extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      productos: this.props.data
    }
   
  };
  

  render(){
    return (  
      <div>
         {this.state.productos.results.map((productos) => (
        <div class="card">          
        <div class="card-body">          
          <h5 class="card-title">{productos.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{productos.price}</h6>
          <p class="card-text">Stay Hungry, Stay Foolish</p>
        </div>
        </div>
         ))}
        </div>
        
    );
  }
}





export default Busqueda;