import React,{Component} from "react";
import {Link } from 'react-router-dom';
import { connect } from "react-redux";

import 'bootstrap-icons/font/bootstrap-icons.css';
import axios2 from '../../libraries/axios';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Text from '../FormElements/Text' 

var AppId=4;

class ItemModal extends Component {
    constructor(props) {
        super(props);
    }

    state = { 
        modalTitle  :this.props.modalTitle,
        windowId    :"",
        columns     :this.props.columns,
        mode        :this.props.mode,    //      read,create,update
        apiUri      :this.props.apiUri,
        // showModal   :this.props.showModal,
    }
    
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.showModal !== this.state.showModal) {
        //   this.setState({ showModal: nextProps.showModal });
        // }
    }

    handleClose=()=>{
        this.props.toggleModal(0)
    }

    render() { 
        return (<div>




            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            
        </div>
        );
    }
}
 
export default ItemModal;