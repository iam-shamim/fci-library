import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class InstituteHeader extends Component{
    render(){
        return(
            <div className="account-header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-3 col-lg-2">
                            <div className="profile_avatar">
                                <img src="/img/logo.png" alt="avatar" className="img-responsive" id="show" />
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-9 col-lg-10">
                            <div className="profile_summary">
                                <h3 className="profile_name">Feni Computer Institute</h3>
                                <p>Feni Computer Institute is the first and only ICT Based polytechnic institute for Diploma in Engineering courses in Feni Sadar Upazila, Bangladesh. Founded in 2003, It is directed under Bangladesh Technical Education Board. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps  = (state)=>{
    return {
      messages: state.flashMessages
    };
};
export default connect(mapStateToProps)(InstituteHeader);