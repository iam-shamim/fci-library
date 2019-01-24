import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logout } from "../store/actions/authAction";

class LogoutComponent extends Component{
    componentDidMount(){
        this.props.logout();
        this.props.history.push('/login')
    }
    render(){
        return(
            <span></span>
        );
    }
}
export default connect(null, { logout })(LogoutComponent);