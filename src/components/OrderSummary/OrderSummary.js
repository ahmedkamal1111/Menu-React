import React, { Component } from 'react';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {
        state={
            myOrders:[]
        }
        purchuse=(props)=>{
            this.setState({ 
                myOrders: [...this.state.myOrders, this.props.order] 
           })
           alert('Done')
        }
    render () {
         console.log(this.state.myOrders)
        return (
            <div>
                <h3>Your Order From : </h3>
                <h4> {this.props.order.name} </h4>  
                <h3>Your Order Price : </h3>
                {this.props.order.price}
                <br/>
                <h3>Delivery Method :</h3>
                {this.props.order.transactions}
                <br/>
                <h3>Continue to Checkout?</h3>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.purchuse}>CONTINUE</Button>
            </div>
        );
    }
}

export default OrderSummary;