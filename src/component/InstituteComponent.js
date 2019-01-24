import React, { Component } from 'react';
import { connect } from 'react-redux'
class InstituteComponent extends Component{
    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> My Profile </a>
                    </h4>
                </div>

                <form accept-charset="utf-8" className="form-horizontal">
                    <div className="panel-body">
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Email</label>
                            <div className="col-sm-9">
                                <input type="email" required="required" name="email"
                                       value="{!! $data->email !!}" maxLength="100"
                                       className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">First Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="firstName" value="{!! $data->firstName !!}"
                                       className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Middle Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="middleName" value="{!! $data->middleName !!}"
                                       className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Last Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="lastName" value="{!! $data->lastName !!}"
                                       className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Phone</label>
                            <div className="col-sm-9">
                                <input type="tel" name="phone" value="{!! $data->phone !!}"
                                       maxLength="100" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Date of Birth</label>
                            <div className="col-sm-9">
                                <input type="text" id="datepicker" name="birthDay"
                                       value="@if($data->DOB){!! date('d-m-Y',strtotime($data->DOB))!!}@endif"
                                       maxLength="100" className="form-control" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label">Profile Picture</label>
                            <div className="col-sm-9 m-t5">
                                <input type="file" className="filestyle" name="profilePic"
                                       onChange="loadFile(event)" />
                                <span className="help-block"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Summary</label>
                            <div className="col-sm-9">
                                <textarea name="summary" id="" className="form-control" cols="70" rows="7">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusantium adipisci assumenda deleniti dolorum exercitationem fugit ipsum iusto, minima odio perspiciatis possimus, vel voluptates. Ad ipsam nemo reiciendis ut voluptate.</textarea>
                            </div>
                        </div>

                    </div>
                    <div className="panel-footer">
                        <div className="row">
                            <div className="col-sm-offset-3 col-sm-9">
                                <button type="submit" className="btn btn-custom"><i className="fa fa-save"></i> Save Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default InstituteComponent;