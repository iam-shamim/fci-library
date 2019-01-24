import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addFlashMessage} from "../store/actions/flash";

export default function (ComposedComponent) {
    class Authenticate extends Component{
        componentWillMount(){
            if(this.props.isAuthenticated){
                this.props.history.replace('/');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}