import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMessage from "./FlashMessage";
import {deleteFlashMessage} from "../../store/actions/flash";

class FlashMessageList extends Component{
    deleteFlashMessage = (id)=>{
        this.props.deleteFlashMessage(id);
    };
    componentWillReceiveProps(nextProps){
        console.log('nextProps: ',nextProps);
    }
    render(){
        const message = this.props.messages.map(message=>{
            return <FlashMessage key={message.id} message={message} deleteFlashMessage={this.deleteFlashMessage}/>
        });
        return(
            <div>
                { message }
            </div>
        )
    }
}
const mapStateToProps  = (state)=>{
    return {
      messages: state.flashMessages
    };
};
export default connect(mapStateToProps,{ deleteFlashMessage })(FlashMessageList);