import React,{Component} from "react";
import {Link } from 'react-router-dom';
import { connect } from "react-redux";

import {config} from '../../config/config';
import styles from './dummy.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios2 from '../../libraries/axios';
import Button from 'react-bootstrap/Button';
import ItemModal from "../ItemModal/ItemModal";

var AppId=4;
// var TableIds=[3];

var Columns=[
    {id:1, tableId:3, tableName: "students",colName: "id"},
    {id:2, tableId:3, tableName: "students",colName: "FirstName"},
    {id:3, tableId:3, tableName: "students",colName: "LastName"},
    {id:4, tableId:3, tableName: "students",colName: "Age"}
]

var View={
    view_name : "dummy",
    view_tables: [],
    view_columns:[],
}


class Dummy extends Component{
    constructor(props) {
        super(props);
        this.state.listData=[];
        this.state.columns=Columns;
    }

    state = { 
        appId:4,
        tableIds:[3],
        columns:[],

        view_Name:"STUDENTS",
        view_TableIds:[3],
        view_SortBy:[],//array of object {id:1, order:-1} -1 decending, 1 ascending   
        view_Columns:[],
        view_AllowSelection:1,

        listData:[],        
        sortBy:[],//array of object {id:1, order:-1} -1 decending, 1 ascending   
        
        selectedRows:[],
        selectionAllowed:1,

        showModal:0,
     }

    componentDidMount(){
        // this.setState({
        //     ...this.state,
        //     listData:ListData,
        //     columns:Columns
        // })
        this.loadView("dummy");

    }
    componentDidUpdate(prevProps, prevState) {
        // if (this.state.sortBy!=prevState.sortBy){
        //     this.loadListData({sortBy : [...prevState.sortBy]});
        // }
    }

    render() { 
        return ( 
        <div style={{padding:"20px"}}>
            <div style={{background:"", display:"inline-block",width:"100%"}} className="">
                <div style={{float:"left", margin:"10px"}}>
                    <Button variant="primary" onClick={e=>{this.createButtonClickHandler(e)}}>
                        Create
                    </Button>
                    {/* <button type="button" class="btn btn-primary" onClick={}>Create</button> */}
                </div>

                <div style={{float:"left", margin:"10px"}}>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1" >
                            <i class="bi bi-menu-button"></i>
                        </span>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"/>
                    </div>                   
                </div>
            </div>
            
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
            <ItemModal
                showModal={this.state.showModal}
                toggleModal={(mState)=>{this.setState({showModal:mState})}}
                modalTitle=""
                columns={this.state.view_Columns}
                mode=""
                apiUri=""
            />

        </div> 
        
        );
    }

    loadView=(viewName)=>{
        // http://127.0.0.1:33333/_api/item/LIST_VIEWS/view_name('LIST_VIEWS')

        axios2
        //build query from fresh state
        .get(`/_api/j/item/LIST_VIEWS/view_name('${this.state.view_Name}')?$expandAll=LIST\\view_tables`,{
            responseType: "json",
        })
        .then((response)=> {
            let state={};
            let res=response.data;
            
            state={...state};
            state.view_Name=res.view_name;
            state.view_Tables=JSON.parse(res.view_tables);
            state.view_SortBy=JSON.parse(res.sort_by);//array of object {id:1, order:-1} -1 decending, 1 ascending   
            state.view_Columns=JSON.parse(res.view_columns);
            state.view_AllowSelection= res.allow_selection;


            this.setState(state,
                ()=>{ 
                    this.loadListData({...this.state})
                })

           
            // console.log(response.data);
        })
        .catch((error)=> {
            // if failed load previous state                
            console.log(error);
            // this.setState(oldState);

        });
    }

    loadListData=(newState)=>{

            const oldState={...this.state};

            axios2
            //build query from fresh state
            .get("/_api/j/lists?"+this.stateToQuery(newState) , {
                responseType: "json",
            })
            .then((response)=> {
                this.setState({
                        ...this.state,
                        listData:response.data,                        
                })
                // console.log(response.data);
            })
            .catch((error)=> {
                // if failed load previous state                
                console.log(error);
                this.setState(oldState);

            });

    }

    stateToQuery=(stateInst)=>{

        if (!stateInst){
            return '';
        }
        //single item query
        const state= stateInst;



        let defaultQuery={};
        let queryUri='';

        //for default view
        defaultQuery.$from=["students"];
        
        defaultQuery.$select=state.view_Columns.map((col)=>{
            return col.tableName+"."+col.column_name;
        });        
        
        defaultQuery.$filter='';
        
        defaultQuery.$orderBy=state.sortBy;
        
        defaultQuery.$limit='30';

        queryUri=this.queryObjectToUri(defaultQuery);

        return queryUri;
    }

    paramsToState=(url)=>{        

    }
    



    
    queryObjectToUri=(defaultQueryObj)=>{
        let q=[];
        for(const key in defaultQueryObj){
            q.push(`${key}=${encodeURIComponent(JSON.stringify(defaultQueryObj[key]))} `);
        }
        return q.join("&");
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
            this.state.view_Columns.map((col)=> {
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

        for (const col of this.state.view_Columns){
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

        //find index of existing column
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
            //if no index found add new element
            sortBy.push({
                id: col.id, 
                colName: `${col.tableName}.${col.colName}`,
                order:-1
            })

        }

        //propsed state, new data will be requested based upon this state
        // let oldState=[...this.state.sortBy]
        
        let state={
            ...this.state,
            sortBy:sortBy            
        }
        this.setState(state);
        this.loadListData(state);//old state


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

    createButtonClickHandler=(e)=>{
        this.setState({
            showModal:1,
        })
        console.log("create clicked")
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
                return <i className="bi bi-sort-up"></i>
            }
            else if (currColSortBy.order==-1){
                return <i className="bi bi-sort-down"></i>
            }
            else{
                return "";
            }
        }        
    }



    
}
 
export default Dummy;

