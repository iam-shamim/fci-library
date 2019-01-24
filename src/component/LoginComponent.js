import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from "../store/actions/authAction";
import { addFlashMessage } from '../store/actions/flash'
import className from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty'
import {toastr} from 'react-redux-toastr'

class LoginComponent extends Component{
    state = {
        identifier: 'shamim258038@gmail.com',
        password: '123',
        isLoading: false,
        errors: {}
    };
    validateInput = (data) => {
        let errors = {};
        if(Validator.isEmpty(data.identifier)) errors.identifier = 'This field is required';
        if(Validator.isEmpty(data.password)) errors.password = 'This field is required';

        return {
            errors,
            isValid: isEmpty(errors)
        };
    };
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    onSubmit = (event)=>{
        event.preventDefault();
        const { errors, isValid } = this.validateInput(this.state);
        if(!isValid){
            this.setState({ errors});
        }else{
            this.setState({ isLoading: true });
            this.props.login({
                identifier: this.state.identifier,
                password: this.state.password
            }).then((res)=>{
                if(res.status === true){
                    this.props.history.push("/");
                }
            }).catch((errors)=> {
                if(errors.response.errors._flash){
                    toastr.error("Error",errors.response.errors._flash);
                    this.setState({ isLoading: false})
                }else{
                    this.setState({ isLoading: false, errors: errors.response.errors })
                }
            });
        }

    };
    render(){
        return(
          <div className="row">
              <div className="col-sm-5 login-form">
                  <div className="panel panel-default">
                      <div className="panel-intro text-center">
                          <h1 className="logo"><i className="fa fa-recycle"></i> Library</h1>
                      </div>
                      <div className="panel-body">
                          <form onSubmit={this.onSubmit}>
                                  <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.identifier } )}>
                                      <input type="text" placeholder="Email" className="form-control input-lg" name="identifier" value={this.state.identifier} onChange={this.onChange}/>
                                      <span className="text-danger">{ this.state.errors.identifier }</span>
                                  </div>
                                  <div className="form-group">
                                      <input type="password" placeholder="Password" className="form-control input-lg" name="password" value={this.state.password} onChange={this.onChange} />
                                      <span className="text-danger">{ this.state.errors.password }</span>
                                  </div>
                                  <div className="form-group">
                                      {this.state.errors.global && (<p className="text-danger text-center">{this.state.errors.global}</p>)}
                                      <button  type="submit" className="btn btn-block btn-custom" disabled={this.state.isLoading}>Login</button>
                                  </div>
                          </form>
                      </div>
                      <div className="panel-footer">
                          {/*<p className="text-center pull-right"><a href="" className="btn-block text-center">Forgot password?</a></p>*/}
                          <div className="clearfix"></div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}
export default connect(null, { login, addFlashMessage })(LoginComponent);