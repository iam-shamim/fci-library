import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveShift, getShift, updateShift, shiftDelete } from "../../../store/actions/setup";
import className from "classnames";
import commonValidations from '../../../validations/commonValidations';
import ShiftComponent from "./ShiftComponent";
import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import { toastr } from 'react-redux-toastr';

class ShiftsComponent extends Component{
    state = {
        _id: null,
        shiftName: '',
        errors: {},
        isLoading: false,
        dataLoading: false,
        delete_info:{
            modal: false,
            title: null,
            id: null,
        }
    };
    onSubmitHandler = (e)=>{
        e.preventDefault();

        const { errors, isValid } = commonValidations(this.state,{shiftName: 'required'});
        if(isValid){
            this.setState({isLoading: true});
            if(this.state._id === null){
                this.props.saveShift({shiftName: e.target.shiftName.value}).then(()=>{
                    this.setState({shiftName:'',isLoading: false});
                    toastr.success('Success','Shift successfully added');
                }).catch((errors)=>{
                    if(errors.response.errors._flash){
                        toastr.error("Error",errors.response.errors._flash);
                        this.setState({ isLoading: false})
                    }else{
                        this.setState({ isLoading: false, errors: errors.response.errors })
                    }
                });
            }else{
                this.props.updateShift({shiftName: e.target.shiftName.value,_id: this.state._id}).then(()=>{
                    this.setState({isLoading: false});
                    toastr.success('Success','Shift successfully updated');
                }).catch((errors)=>{
                    if(errors.response.errors._flash){
                        toastr.error("Error",errors.response.errors._flash);
                        this.setState({ isLoading: false})
                    }else{
                        this.setState({ isLoading: false, errors: errors.response.errors })
                    }
                });
            }
        }else{
            this.setState({errors});
        }
    };
    editShift = (_id)=>{
        const edit = this.props.shifts.find((shift)=> shift._id === _id);
        this.setState({
            _id,
            shiftName: edit.name
        })
    };
    deleteShift = (_id)=>{
        const find = this.props.shifts.find((shift)=> shift._id === _id);
        this.setState({
            delete_info: {
                modal: true,
                title: find.name,
                _id: find._id
            }
        });
    };
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    editCancel = () => {
      this.setState({
          _id: null,
          shiftName: '',
      })
    };
    deleteCancel = ()=>{
        this.setState({
            delete_info: {
                modal: false
            }
        });
    };
    deleteConfirm = ()=>{
        this.props.shiftDelete({ _id: this.state.delete_info._id }).then(()=>{
            const newState = {
                delete_info: {modal: false}
            };
            if(this.state.delete_info._id === this.state._id){
                newState._id = null;
                newState.shiftName = '';
            }
            this.setState(newState);
            toastr.success('Success','Shift successfully deleted');
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ isLoading: false})
            }else{
                this.setState({ isLoading: false, errors: errors.response.errors })
            }
        });
    };
    componentDidMount(){
        document.title = "Add Shift";
        if(this.props.shifts.length===0){
            this.setState({dataLoading: true});
        }
        this.props.getShift().then((res)=>{
            this.setState({dataLoading: false})
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ dataLoading: false})
            }
        });
    }
    render() {
        let data = null;
        if(this.state.dataLoading){
            data = <Spinner/>;
        }else if(this.props.shifts.length === 0){
            data = <p className="text-center">Not found</p>
        }else{
            let sl = 1;
            data = (
                <table className="table table-bordered table-hover table-responsive">
                    <thead>
                    <tr>
                        <td>S/L</td>
                        <td>Shift Name</td>
                        <td style={{'width':'30%'}}>
                            Action
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.shifts.map(shift=>(
                            <ShiftComponent editShift={this.editShift} sl={sl++} deleteShift={this.deleteShift} key={shift._id} {...shift} editing_id={this.state._id}/>
                        ))
                    }
                    </tbody>
                </table>
            );
        }
        return (
            <div className="panel panel-default">
                <Modal show={this.state.delete_info.modal} modalClosed={this.deleteCancel}>
                    <h4 className="text-center">Are you sure?</h4>
                    <hr/>
                    You want to delete: {this.state.delete_info.title}
                    <hr/>
                    <div className="pull-right">
                        <button className="ma-r-5 btn btn-sm btn-default" onClick={this.deleteCancel}>No, cancel please</button>
                        <button className="btn btn-sm btn-danger" onClick={this.deleteConfirm}>
                            <span className="fa fa-trash-o fa-1-2x"></span> Yes, delete it!
                        </button>
                    </div>
                </Modal>
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> Shift</a></h4>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-2">
                                {this.state.errors.global && (<p className="text-danger">{this.state.errors.global}</p>)}
                                <label htmlFor="shiftName">{this.state._id==null?'New Shift': 'Edit Shift'}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-2">
                                <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.shiftName } )}>
                                    <input type="text" autoComplete="off" className="form-control" name="shiftName" id="shiftName" value={this.state.shiftName} onChange={this.onChange}/>
                                    <span className="text-danger">{ this.state.errors.shiftName }</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    {
                                        this.state._id !== null && <button className="btn btn-primary ma-r-5" type="button" onClick={this.editCancel}>Cancel</button>
                                    }
                                    <button className="btn btn-success" disabled={this.state.isLoading}>
                                        { this.state._id===null?'Save':'Update' }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col-xs-12">
                            {data}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        shifts: state.setup.shifts
    }
};
export default connect( mapStateToProps, { saveShift, getShift, updateShift, shiftDelete } )(ShiftsComponent);