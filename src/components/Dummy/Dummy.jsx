import React,{Component} from "react";
import {Link } from 'react-router-dom';
import { connect } from "react-redux";


import styles from './dummy.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

var AppId=4;
// var TableIds=[3];

var Columns=[
    {id:1, tableId:1, colName: "id"},
    {id:2, tableId:1, colName: "FirstName"},
    {id:3, tableId:1, colName: "LastName"},
    {id:4, tableId:1, colName: "Age"}
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
        appId:4,
        tableIds:[3],
        columns:[],
        listData:[],
        selectedRows:[],
        sortBy:[],//array of object {id:1, order:-1} -1 decending, 1 ascending   


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
                        {this.renderColumns()}
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.listData.map(this.renderRow) }

                    
                </tbody>
            </table>
        </div> 
        
        );
    }



    

    renderColumns=()=>{
        let tableColumns=[];

        if (this.state.selectionAllowed){
            tableColumns.push( 
                <th onClick={this.allRowSelectionClickHandler}>
                    <i className="bi bi-check2-square"></i>
                </th>
            );
        }

        tableColumns.push(
            this.state.columns.map((col)=> {
                return <th key={col.id} scope="col" onClick={(e)=>{this.sortColumnClickHandler(e,col)}}>
                        {col.colName}
                        {this.renderSortIcon(col)}
                    </th>
            })  
        )    

        return tableColumns;                                    
        
    }

    renderRow=(row)=>{
        let tableRowCells=[];        

        if (this.state.selectionAllowed){
            tableRowCells.push(
                <td onClick={(e)=>this.rowSelectionClickHandler(e,row)}>
                    <i className="bi bi-check2-square"></i>
                </td>
            )
        }

        for (const col of this.state.columns){
            if (row[col.colName]){
                tableRowCells.push(
                    <td key={row.id+'-'+col.id} scope="row">
                        {row[col.colName]}
                    </td>
                )
            }
            else{
                tableRowCells.push(<td key={row.id+'-'+col.id} scope="row"> </td>) 
            }           
        }         

        return <tr key={row.id}  className={this.selectedRowsClass(row)}>{tableRowCells}</tr>   
    }

    sortColumnClickHandler=(e,col)=>{
        e.preventDefault();
        let sortToggle=[-1,1,0];
        let sortByObj={};
        let sortBy=[...this.state.sortBy];
        let selectedRows=[];

        let sortByIndex=sortBy.findIndex((sortByObj)=>{
            if (sortByObj.id==col.id){
                return 1
            }
        })
        if (sortByIndex>=0){
            //rotate sort order of selected column
            let currSortBy=sortBy[sortByIndex];            
            let sortToggleIndex=sortToggle.indexOf(currSortBy.order);
            sortToggleIndex=(sortToggleIndex+1) > 2 ? 0: sortToggleIndex+1;
            currSortBy.order=sortToggle[sortToggleIndex]
            
            if (currSortBy.order==0){
                sortBy=sortBy.filter(item=>item.order!=0)
            }
        }
        else{
            sortBy.push({
                id: col.id,
                order:-1
            })

        }

        this.setState({
            sortBy:sortBy
        })


    }

    rowSelectionClickHandler=(e,row)=>{
        e.preventDefault();
        let selectedRows=[...this.state.selectedRows];

        if (this.state.selectedRows.includes(row.id)){
            //removing selected row
            selectedRows=selectedRows.filter(item=>{
                return (item != row.id) 
            });
        }
        else{
            //adding selected row
            selectedRows.push(row.id)
        }

        this.setState({
            selectedRows:selectedRows
        })


        console.log(e);
    }

    allRowSelectionClickHandler=(e)=>{
        e.preventDefault();
        let selectedRows=[];

        //if all rows already selected deselect rows
        if (this.state.selectedRows.length==this.listData.length){
            selectedRows=[]
        }
        else{
            selectedRows=this.state.listData.map((row)=>{
                return row.id
            })
        }

        this.setState({
            selectedRows:selectedRows
        }) 
    }

    selectedRowsClass=(row)=>{
        if (this.state.selectedRows.includes(row.id)){
            return styles.selectedRow;
        }
    }

    renderSortIcon=(col)=>{
        const sortBy=this.state.sortBy;

        let currColSortBy=sortBy.find((sbItem)=>{
            return sbItem.id==col.id
        })

        if (currColSortBy){
            if (currColSortBy.order==1){
                return <i class="bi bi-sort-up"></i>
            }
            else if (currColSortBy.order==-1){
                return <i class="bi bi-sort-down"></i>
            }
            else{
                return ""
            }
        }

        
    }



    
}
 
export default Dummy;

