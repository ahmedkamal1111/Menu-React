import React ,{Component} from 'react';
import axios from "axios";
import MaterialTable from "material-table";
import "react-confirm-alert/src/react-confirm-alert.css";
import {connect} from 'react-redux';

import {
  Search,
} from "@material-ui/icons/";
const token = 'Bearer omiF8ohyVtGOn_oduvIZwV0fygF-4PRHqbj2xefRCXKdZY9Mte-GsKWQbxe0hpmXj3TOUsBFwQN0zmeo8CNAEd9lWNDNPlQqYlVwUwvh270BDpy3eeuvB5b8tBPgXnYx';
class OurResturants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[

                  {
                    title: "Resturant Name",
                    field: "name",
                    filterPlaceholder: "Resturant Name"
                  },
                  {
                    title: "Location",
                    field: "location.address1",
                    filterPlaceholder: "Location"
                  },
                  {
                    title: "Rating",
                    field: "rating",
                    filterPlaceholder: "Rating"
                  },
                  {
                    title: "Review",
                    field: "review_count",
                    filterPlaceholder: "Review"
                  },
                  
                  {
                    title: "Price",
                    field: "price",
                    filterPlaceholder: "Price"
                  },
                  {
                    title: "phone",
                    field: "phone",
                    filterPlaceholder: "phone"
                  },

            ],
            Allusers: [],
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
            this.setState({Allusers:response.data.businesses})
          });
        }
              



      render(){


          console.log(this.state.Allusers);
            return(
              <main >
                {/* {this.props.isAuthentication
                ? */}
              <MaterialTable
                columns={this.state.columns}
                data={this.state.Allusers}
                icons={{ Filter: () => <Search /> }} // <== this solves it
                title="All Resturants"
                // localization={{
                //   pagination:{
                //     labelDisplayedRows: `${1}-${15} of ${this.props.data.length}`
                //   }
                // }}
      
                options={{
                  pageSize: 10,
                  pageSizeOptions: [5, 10, 15, 20],
                  paginationType: "stepped",
                  // selection: true,
      
                  detailPanelProps: rowData => ({
                    disabled: rowData.id !== this.state.selectedRow + 1,
                    color: "primary"
                  }),
                  filtering: true,
                  headerStyle: {
                    backgroundColor: "#ccc",
                    color: "#000",
                    paddingLeft: 15
                  },
                  rowStyle: rowData => ({
                    backgroundColor:
                      this.state.selected &&
                      this.state.selectedRow === rowData.tableData.id
                        ? "#EEE"
                        : "#FFF",
                    transition: "background .2s ease-in"
                  }),
      
                  actionsColumnIndex: 7
                }}
                // actions={[
                //   {
                    
                //     //delete partially
                //     icon: () => <DeleteOutlineTwoTone color={"action"} />,
                //     tooltip: "Delete this User",
                //     onClick: (event, rowData) => {
                //       confirmAlert({
                //         title: "Confirm to delete",
                //         message: "Delete application for this User ?",
                //         buttons: [
                //           {
                //             label: "Yes",
                //             onClick: () => {
                //               const id=rowData.id;
                //               axios
                //                 .delete(
                //                   "https://jsonplaceholder.typicode.com/users/"+id                          
                //                 )
                //                 .then(response => {
                //                   let data = this.state.Allusers;
                //                   const index = data.indexOf(rowData);
                //                   data.splice(index, 1);
                //                   this.setState({ data });
                //                 });
                //             }
                //           },
                //           {
                //             label: "No"
                //           }
                //         ]
                //       });
                //     }
                //   }
                // ]}
              
              />
              {/* :
              <form className={classes.Users}>
                <br/>
                <h3>Please sign in first to see the content</h3>
                <hr className={classes.after}/>
                <br/>

              <NavLink 
              to="/auth"exact className={classes.btn} >Sign in</NavLink>
              <br/>
              </form>
            } */}
            </main>
              // <Aux>
              //   <div>Hello</div>
              //   <MaterialTable
              //   title="Editable Preview"
              //   columns={this.state.columns}
              //   data={this.state.Allusers}
              //   options={{
              //     actionsColumnIndex: 0,
              //     pageSize: 10,
              //     pageSizeOptions: [5, 10, 15, 20],
              //     paginationType: "stepped",
              //   }}
              //   editable={{
              //     onRowUpdate: (newData, oldData) =>
              //       new Promise((resolve, reject) => {
              //         setTimeout(() => {
              //           const dataUpdate = this.state.Allusers;
              //           const index = dataUpdate.indexOf(oldData);
              //           dataUpdate[index] = newData;
              //           this.setState({dataUpdate},()=>resolve);
          
              //           resolve();
              //         }, 1000)
              //       }),
              //     onRowDelete: oldData =>
              //       new Promise((resolve, reject) => {
              //         setTimeout(() => {
              //           const dataDelete = this.state.Allusers;
              //           const index = dataDelete.indexOf(oldData);
              //           dataDelete.splice(index, 1);
              //           this.setState({dataDelete},()=>resolve);                        
              //           resolve()
              //         }, 1000)
              //       }),
              //   }}
              // />
              // </Aux>
)

      }

    };
    const mapStateToProps=state=>{
      return {
          isAuthentication:state.auth.token !==null
      };
  };
  export default connect(mapStateToProps)(OurResturants);
