import React,{Component} from "react";
import {Link } from 'react-router-dom';
import { connect } from "react-redux";


import styles from './dummy.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


var Columns=[
    {id:1,  colName: "id"},
    {id:2,  colName: "FirstName"},
    {id:3,  colName: "LastName"},
    {id:4,  colName: "Age"},

]

var ListData=[
                        {   
                                id: 12,
                                FirstName: "Arslan",
                                LastName: "Tahir",
                                Age: "29",
                                Class: "10"
                        },
                        {   
                                id: 13,
                                FirstName: "Ghulam",
                                LastName: "Mustafa",
                                Age: "31",
                                Class: "10"
                        },
                        {   
                                id: 14,
                                FirstName: "Ishaq  ",
                                LastName: "Dar",
                                Age: "56",
                                Class: "12"
                        },
                        {   
                                id: 15,
                                FirstName: "Nawaz",
                                LastName: "Sharif",
                                Age: "34",
                                Class: "8"
                        },
                        {   
                                id: 16,
                                FirstName: "Ahmad",
                                LastName: "Riaz",
                                Age: "31",
                                Class: "10"
                        },
                        {   
                                id: 17,
                                FirstName: "Marwa",
                                LastName: "Hussain",
                                Age: "11",
                                Class: "13"
                        },
                        {   
                                id: 18,
                                FirstName: "Rohan",
                                LastName: "Tahir",
                                Age: "21",
                                Class: "12"
                        },
                        {   
                                id: 19,
                                FirstName: "Ayesha",
                                LastName: "Riaz",
                                Age: "31",
                                Class: "12"
                        },
                        {   
                                id: 20,
                                FirstName: "Ghulam",
                                LastName: "Mustafa",
                                Age: "32",
                                Class: "8"
                        },
                        {   
                                id: 21,
                                FirstName: "Ghulam",
                                LastName: "Fareed",
                                Age: "38",
                                Class: "16"
                        }
]


class Dummy extends Component{
    constructor(props) {
        super(props);
        this.listData=ListData;
    }

    state = { 
        listData:[],
        selectedRow:[],       
        columns:[],

        selectionAllowed:1, 
     }

    componentDidMount(){
        this.setState({
            ...this.state,
            listData:ListData,
            columns:Columns
        })
    }

    render() { 
        return ( 
        <div>
            <table className={"table table-hover table-sm " +styles.tableContainer} >
                <thead>
                    <tr>
                        {this.state.selectionAllowed && (
                            <th >
                                <i className="bi bi-check2-square"></i>
                            </th>
                        )}

                        {       
                            this.state.columns.map(function(item) {
                                    return <th key={item.id} scope="col">{item.colName}</th>
                            })                            
                        }
{/* 
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th> */}
                    </tr>
                </thead>
                <tbody>
                    
                    {
                       this.state.listData.map(this.renderRow)
                    }

                    {/* <tr>
                        <th scope="row">
                            <i className="bi-alarm"></i>
                        </th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Arslan</td>
                        <td>Tahir</td>
                        <td>@fat</td>
                    </tr> */}
                </tbody>
            </table>
        </div> 
        
        );
    }

    renderRow=(row)=>{              
     return <tr key={row.id}>
        {
            this.state.columns.map((col)=>{ 
                return this.renderRowCell(row,col);
            })
        }
     </tr>
    }

    renderRowCell=(row,col)=>{    
        if (row[col.colName]){
            return <td key={row.id+'-'+col.id} scope="row">{row[col.colName]}</td>
        }
        else{
            return <td key={row.id+'-'+col.id} scope="row"></td> 
        }                      
    }

    // renderRow=(row)=>{              
    //     return <tr>
    //        {
    //            this.state.columns.map((col)=>{ 
    //                const getCell=(row,col)=>{
       
    //                    if (row[col.colName]){
    //                        return <td scope="row">{row[col.colName]}</td>
    //                    }
    //                    else{
    //                        return <td scope="row"></td> 
    //                    }                      
                       
    //                }
    //                return getCell(row,col);
    //            })
    //        }
    //     </tr>
    //    }

    
}
 
export default Dummy;

