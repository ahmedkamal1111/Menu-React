import React ,{Component} from 'react';
import axios from "axios";
import classes from './ResturantDetails.css';
import CheckOut from '../CheckOut/CheckOut';
import Modal from '../UI/Modal/Modal';
const token = 'Bearer omiF8ohyVtGOn_oduvIZwV0fygF-4PRHqbj2xefRCXKdZY9Mte-GsKWQbxe0hpmXj3TOUsBFwQN0zmeo8CNAEd9lWNDNPlQqYlVwUwvh270BDpy3eeuvB5b8tBPgXnYx';
class ResturantDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPost: '',
            purchasing: false,

        };
      }
        componentDidMount(){
            if ( this.props.match.params.id ) {
                if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/`+this.props.match.params.id,
                    {
                     headers: { 'Authorization': token},
                    })
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                    } );
            
        }
    }
        }
        purchaseHandler = () => {
            this.setState( { purchasing: true } );
        }
        purchaseCancelHandler = () => {
            this.setState( { purchasing: false } );
        }

      render () {
          let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
          if ( this.props.match.params.id ) {
              post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
          }
          if ( this.state.loadedPost ) {
              post = (
                  <div style={{position:'relative'}}>

                  <div className={classes.ResturantDetails}>
                    <h1> {this.state.loadedPost.name}</h1><br/>
                    <div className={classes.ax}>  Resturant Alias:</div> <div style={{marginRight:"-90px"}}>  {this.state.loadedPost.alias}</div><br/>
                    <div className={classes.ax}>   Mobile: </div>   <div style={{marginRight:"-180px"}}> {this.state.loadedPost.phone}</div><br/>
                    <div className={classes.ax}>     Phone:  </div> <div style={{marginRight:"-180px"}}>{this.state.loadedPost.display_phone}</div><br/>
                    <div className={classes.ax}>    Rate:</div><div style={{marginRight:"-185px"}}>{this.state.loadedPost.rating}</div><br/>
                    <div className={classes.ax}>     is_claimed:</div><div style={{marginRight:"-120px"}}>  {this.state.loadedPost.is_claimed.toString()}</div><br/>
                    <div className={classes.ax}>    Price:</div><div style={{marginRight:"-185px"}}>{this.state.loadedPost.price}</div><br/>
                    <div className={classes.ax}>    Transactions:</div><div style={{marginRight:"-105px"}}>{this.state.loadedPost.transactions}</div><br/>

                     <br/>
                     <button className={classes.Order}onClick={this.purchaseHandler} >Order Now</button>
                     <br/><a href={this.state.loadedPost.url} className={classes.a}>More Meals</a><br/>
                     <br/>
                     </div>
                     <img className={classes.img} src={this.state.loadedPost.image_url} />
                     <br/>
                     <br/>
                     <h1  style={{fontWeight:'250px', textTransform:"uppercase",textAlign:"center" ,color:"#555",marginTop:"40px"}}>Bon Apetit</h1>
                            <hr className={classes.after}/>
                     <div>{this.state.loadedPost.photos.map(response=>{
                                return <img className={classes.anthorfood} src={response}/>
                            })}</div> <br/>
 


                  </div>
  
              );
          }
         let checkOut= <CheckOut     
                 purchaseCancelled={this.purchaseCancelHandler}
                 order={this.state.loadedPost}  />
          return (
         <div>
         <Modal show={this.state.purchasing}modalClosed={this.purchaseCancelHandler}>
            {checkOut}
         </Modal>
          {post} 
          </div>     
          )
          
      }
      
    }
    export default ResturantDetails;