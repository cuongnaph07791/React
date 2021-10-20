import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList'
import ProductItem from './../../components/ProductItem/ProductItem'
import {connect} from 'react-redux';
import callAPI from '../../utils/apiCaller';
import {Link} from 'react-router-dom';



class ProductListPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      products : []
    };
  }

  componentDidMount(){
    callAPI('products','GET', null).then(res =>{
      this.setState({
        products : res.data
      });
    });    
  }

  onDelete = (id) => {
    var {products} = this.state;
    callAPI(`products/${id}`,'DELETE', null).then(res =>{
        if(res.status === 200){ //ok
          var index = this.findIndex(products, id);
          if (index !== -1){
            products.splice(index, 1)
            this.setState({
              products : products
            });
          }
        }
      
    });
    
  }

  findIndex = (products, id) => {
    var result = -1;
    products.forEach((product,index) => {
      if (product.id === id){
        result = index;
      }
    });
    return result;
  }

  render() {
    // var {products} = this.props;
    
    var {products} = this.state;
    return (
      
      <div clasName="col-xs-12 col-sm-12 col-md-12 col-lg-12">

        <Link to="product/add" className="btn btn-info md-10">
          Thêm sản phẩm
        </Link>

        <ProductList>
        {this.showProducts(products)}
        </ProductList>

      </div>

    );
  }
  showProducts(products){
    var result = null;
    if(products.length > 0){
      result = products.map((products,index) =>{
        return(
          <ProductItem
            key={index}
            product={products}
            index={index}
            onDelete = {this.onDelete}
          />
        );
      });
    }
    return result;
  }
}

const mapStateToProps = state => {
  return{
    products: state.products
  }
}


export default connect(mapStateToProps, null)(ProductListPage);
