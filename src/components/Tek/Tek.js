import React ,{Component} from 'react';
import PhotoContainer from './PhotoContainer';
import classes from './Photo.css';
import media from './7.1 Grid.css';
import axios from "axios";
import { NavLink } from 'react-router-dom';
const token = 'Bearer omiF8ohyVtGOn_oduvIZwV0fygF-4PRHqbj2xefRCXKdZY9Mte-GsKWQbxe0hpmXj3TOUsBFwQN0zmeo8CNAEd9lWNDNPlQqYlVwUwvh270BDpy3eeuvB5b8tBPgXnYx';
class Tek extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Rest:[],
          location:'los anglos'
        };
      }
      componentDidMount() {
        axios
        .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?`,
       {
        params:{location:this.state.location},
        headers: { 'Authorization': token},
       }
        )
        .then(response => {
            this.setState({Rest:response.data.businesses})
          });
        }
        inputChangedHandler=(event)=>{
            this.setState({location:event.target.value});
        }
        
    render () {
      return (
       <div>
          {this.state.Rest.map(response=>{
              return (
                          <section className={`${media.col} ${media.row} $ `}>
                              <div className={classes.Menu} >
                                <header style={{marginTop:'2.5%',fontSize:'18px' }} >{response.name} </header>
                             <NavLink to={'/rest/'+response.id} >
                                <img className={classes.img} src={response.image_url}/>
                              </NavLink>
                              <footer style={{marginTop:'8.5%',width:'80%',textAlign:'left',marginLeft:'8.5%' }} >{<svg xmlns="http://www.w3.org/2000/svg" id="color" enable-background="new 0 0 24 24" height="15px" viewBox="0 0 24 24" width="15px" class=""><g transform="matrix(1 0 0 1 0 0)"><path d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z" fill="#FFBF00" data-original="#FFC107" class="active-path" data-old_color="#ffc107" /></g> </svg>}
                              &nbsp;Rate :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               {response.rating} </footer>
                               <footer style={{marginTop:'2.5%',textAlign:'left',marginLeft:'8.5%',width:'80%' }} >{<svg xmlns="http://www.w3.org/2000/svg" id="color" enable-background="new 0 0 24 24" height="15px" viewBox="0 0 24 24" width="15px" class=""><g transform="matrix(1 0 0 1 0 0)"><path d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z" fill="#FFBF00" data-original="#FFC107" class="active-path" data-old_color="#ffc107" /></g> </svg>} 
                               &nbsp;Review :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               {response.review_count} </footer>
                               <br/>
                              
                              </div>
                              <br/>
                          </section>
                  
                       )
                    })} 
      </div> 
      );
      }
    }
export default Tek;