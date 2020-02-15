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
    //Thumbnail, nombre del producto, precios e ID de seller
    /*

{productos.title}
{productos.thumbnail}
{productos.price}
Id seller:{productos.seller.id}

    */
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





export default Busqueda;