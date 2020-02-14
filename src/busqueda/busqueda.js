import React, { Component } from "react"
import ReactDOM from 'react-dom';
import './busqueda.css';



class Busqueda extends React.Component{

  constructor(data) {
    super(data);
    this.state = {valueInput: ""
  };
  }

  click(evt) {
    this.setState({
      valueInput: evt.target.value
    });
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
     // this.setState({ contacts: data })
    
    })
    .catch(console.log)
    ReactDOM.render(<Cards name="xx"/>, document.getElementById('cards'));
    
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
     {this.state.valueInput}
     </div>
    );
}
}

ReactDOM.render(<Busqueda/>, document.getElementById('barraBusqueda'));


class Cards extends React.Component{
  constructor(data) {
    super(data);
  };
  

  render(){
    return (  
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{this.props.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <p class="card-text">Stay Hungry, Stay Foolish</p>
        </div>
        </div>
        
    );
  }
}





export default Busqueda;