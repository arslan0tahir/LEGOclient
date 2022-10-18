import React,{Component} from "react";
import {Link } from 'react-router-dom';
// import styles from './navBar.module.css';
import { connect } from "react-redux";

//  props.label
//  props.value 
//  props.uid
//  
//  props.onKeyupClickHandler

class Text extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div class="mb-3 row">
                    <label for={this.props.label} class="col-sm-2 col-form-label">{this.props.lablel}</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id={this.props.label} value={this.props.value}/>
                    </div>
                </div>                
            </React.Fragment>

        );
    }
}
 

 
const mapStateToProps=state=>{
    return{
        
    }
}

const mapDispatchToProps=dispatch =>{
    return{
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Text);