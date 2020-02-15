import React, { Component } from "react"
import ReactDOM from 'react-dom';
import './busqueda.css';



class Busqueda extends React.Component{

  state = {
    contacts: [],
    valueInput: "",
    producto: ""
  }

  constructor(data) {
    super(data);   
  }

  click(evt) {
    this.setState({
      producto: evt.target.value
    });
    fetch('https://api.mercadolibre.com/sites/MCO/search?q='+evt.target.value)
    .then(res => res.json())
    .then((data) => {  
     // console.log("MENSAJE: "+data.results[0].title);
      ReactDOM.render(<Cards data={data} producto={this.state.producto}/>, document.getElementById('cards'));
      ReactDOM.render(<Pagination producto={this.state.producto}/>, document.getElementById('root'));

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
      productos: this.props.data,
      producto: this.props.producto
    }
   
  };
  

  render(){

    return (  
     
      <div class="container-fluid mb-4">
      <div class="row">
          <div class="col-md-12">
              <div class="card bg-light">
                  <div class="card-body">
                      <div class="row py-3">
                          <div class="col-md-12">
                              <h4>Related Search Results</h4>
                              <div class="divider"></div>
                          </div>
                          
                      </div>
                      <div class="row">
         {this.state.productos.results.map((productos) => (
     
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-img"><img src={productos.thumbnail}/></div>
                                <div class="card-body">
                                   <h5>{productos.title}</h5>
                                   <h4 class="pt-1 pb-1">Precio: ${productos.price}</h4>
                                   <h6 class="pt-1 pb-1">Id seller: {productos.seller.id}</h6>
                                 
                                   <a href={productos.permalink} target="_blank"><button type= "button" class="btn btn-outline-danger btn-block btn-sm">Comprar</button></a>
                                </div>
                            </div>
                        </div>
                      
         ))}
           </div>
              </div>
              </div>
              </div> 
              </div>
              </div>
                  
                    
       

        
    );
  }
}


class Pagination extends React.Component{
  constructor(props) {
    super(props);
   this.state={
     producto: this.props.producto,
   }
  
   
  }
  
  contador=0;

  increment = () => {
    this.contador = this.contador + 50;
  };

  decrement = () => {
    this.contador = this.contador - 50;
  };

  clickAdelante(data) {  
  
  this.increment();
    console.log("MENSAJE "+this.contador)
     fetch("https://api.mercadolibre.com/sites/MCO/search?q="+data+"&offset="+this.contador)
    .then(res => res.json())
    .then((data) => {  
     ReactDOM.unmountComponentAtNode(document.getElementById('cards'))
      ReactDOM.render(<Cards data={data} producto={this.props.producto}/>, document.getElementById('cards'));
    })
    .catch(console.log)
     
   }
   
  clickAtras(data) {  
  
    this.decrement();
      console.log("MENSAJE "+this.contador)
       fetch("https://api.mercadolibre.com/sites/MCO/search?q="+data+"&offset="+this.contador)
      .then(res => res.json())
      .then((data) => {  
       ReactDOM.unmountComponentAtNode(document.getElementById('cards'))
        ReactDOM.render(<Cards data={data} producto={this.props.producto}/>, document.getElementById('cards'));
      })
      .catch(console.log)
       
     }

  render(){

    return (  
     
      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" onClick={evt => this.clickAtras(this.state.producto)}aria-label="Previous">
            <span aria-hidden="true">«</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" onClick={evt => this.clickAdelante(this.state.producto)} aria-label="Next">
            <span aria-hidden="true">»</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    
                           
                    
       


        
    );
  }
}



export default Busqueda;