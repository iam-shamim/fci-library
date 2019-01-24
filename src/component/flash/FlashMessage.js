import React, { Component } from 'react';
import classnames from 'classnames';

class FlashMessage extends Component{
    state = {

    };
    onClick = ()=>{
        this.props.deleteFlashMessage(this.props.message.id)
    };
    render(){
        const { id, type, text} = this.props.message;
        return(
            <div className={classnames('alert',{
                'alert-success': type === 'success',
                'alert-danger': type === 'error',
            })}>
                <button onClick={this.onClick} className="close"><span>&times;</span></button>
                { text }
            </div>
        )
    }
}
const mapStateToProps  = (state)=>{
    return {
      messages: state.flashMessages
    };
};
export default FlashMessage