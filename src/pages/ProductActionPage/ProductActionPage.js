import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/apiCaller';

class ProductListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      txtName: '',
      txtPrice: '',
      chkbStatus: ''

    };
  }

  componentDidMount(){
     var {match} = this.props;
     if(match){
       var id = match.params.id;
       callAPI(`products/${id}`, 'GET', null).then(res =>{
         var data = res.data;
         this.setState({
          id : data.id,
          txtName : data.name,
          txtPrice : data.price,
          chkbStatus : data.status
         });
       });
     }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name] : value
    });
  }

  onSave = (e) => {
    e.preventDefault();
    var {id, txtName, txtPrice, chkbStatus} = this.state;
    var {history} = this.props;

    if(id){
      //update
      callAPI(`products/${id}`, 'PUT', {
        name: txtName,
        price: txtPrice,
        status:chkbStatus
      }).then(res => {
        history.goBack();
      });
    }else{
      callAPI('products', 'POST', {
        name: txtName,
        price: txtPrice,
        status:chkbStatus
      }).then(res =>{
        history.push("/product-list");
      });
    }
  }

  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (

      <div clasName="col-xs-6 col-sm-6 col-md-6 col-lg-6">


        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label for="">Tên sản phẩm: </label>
            <input type="text"
              class="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}

            />
          </div>
          <div className="form-group">
            <label for="">Giá: </label>
            <input type="number"
              class="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label for="">Trạng thái: </label>
          </div>

          <div className="checkbox">
            <label>
              <input type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.onChange}
                checked={chkbStatus}
              />
              CheckBox
            </label>
          </div>

        <Link to="/product-list" className="btn btn-danger mr-10 "  >
          Trở lại
        </Link>
        
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>


      </div>

    );
  }




}

export default ProductListPage;
