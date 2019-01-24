import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDepartment, getShift, getYear} from "../../store/actions/setup";
import { saveStudent, updateStudent } from "../../store/actions/student";
import className from "classnames";
import commonValidations from '../../validations/commonValidations';
import { toastr } from 'react-redux-toastr';
import Spinner from "../UI/Spinner/Spinner";
import server from "../../server";

class AddStudentsComponent extends Component{
    state = {
        form: {
            _id: null,
            name: '',
            father_name: '',
            department: '',
            shift: '',
            year: '',
            roll: '',
            registration: '',
            gender: 1

        },
        errors: {},
        isLoading: false,
        dataLoading: null
    };
    onSubmitHandler = (e)=>{
        e.preventDefault();
        this.setState({errors: {}});
        const { errors, isValid } = commonValidations(this.state.form,{
            name: 'required',
            father_name: 'required',
            department: 'required',
            shift: 'required',
            year: 'required',
            roll: 'required',
            registration: 'required'
        });
        if(isValid){
            this.setState({isLoading: true});
            if(this.state.form._id === null){
                this.props.saveStudent(this.state.form).then(()=>{
                    this.setState({
                        isLoading: false,
                        form:{
                            _id: null,
                            name: '',
                            father_name: '',
                            department: '',
                            shift: '',
                            year: '',
                            roll: '',
                            registration: '',
                            gender: 1
                        }
                    });
                    toastr.success('Success','Student successfully added');
                }).catch((errors)=>{
                    if(errors.response.errors._flash){
                        toastr.error("Error",errors.response.errors._flash);
                        this.setState({ isLoading: false})
                    }else{
                        this.setState({ isLoading: false, errors: errors.response.errors })
                    }
                });
            }else{
                this.props.updateStudent(this.state.form).then(()=>{
                    this.setState({isLoading: false});
                    toastr.success('Success','Student successfully updated');
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
    onChange = (event)=>{
        if(event.target.name === 'categories'){
            if(event.target.checked === true){
                this.setState({
                    ...this.state,
                    form:{
                        ...this.state.form,
                        categories: [
                            ...this.state.form.categories,
                            event.target.value
                        ]
                    }
                });
            }else{
                this.setState({
                    ...this.state,
                    form:{
                        ...this.state.form,
                        categories: this.state.form.categories.filter(cat=>cat !== event.target.value)
                    }
                });
            }
        }else{
            this.setState({
                ...this.state,
                form:{
                    ...this.state.form,
                    [event.target.name]: event.target.value
                }
            });
        }
    };

    componentDidMount(){
        document.title = "Add Student";
        if(this.props.match.params.id){
            this.setState({dataLoading: true});
            server.get('/api/students/'+this.props.match.params.id).then((res)=>{
                const student = res.data.student;
                this.setState({dataLoading: null,
                    form: {
                        _id: student._id,
                        name: student.name,
                        father_name: student.father_name,
                        department: student.department,
                        shift: student.shift,
                        year: student.year,
                        roll: student.roll,
                        registration: student.registration,
                        gender: student.gender
                    },});
            }).catch((errors)=>{
                this.setState({dataLoading: false});
                toastr.error('Error',errors.response.data.error);
            })
        }
        this.props.getDepartment().then().catch(()=>{});
        this.props.getShift().then().catch(()=>{});
        this.props.getYear().then().catch(()=>{});
    }
    render() {
        let data = <Spinner/>;
        if(this.state.dataLoading === false){
            data = (
                <h3 className="text-center pa-b-20">Book not found</h3>
            );
        }else if(this.state.dataLoading === null){
            data =
                <div className="panel-body">
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.name } )}>
                                        <label htmlFor="name" className="required"> Student Name</label>
                                        <input type="text" autoComplete="off" className="form-control"  placeholder="Write Student Name" id="name" name="name" value={this.state.form.name} onChange={this.onChange}/>
                                        <span className="text-danger">{ this.state.errors.name }</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.father_name } )}>
                                        <label htmlFor="father_name" className="required"> Father Name</label>
                                        <input type="text" autoComplete="off" className="form-control"  placeholder="Write Father Name" id="father_name" name="father_name" value={this.state.form.father_name} onChange={this.onChange}/>
                                        <span className="text-danger">{ this.state.errors.father_name }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.department } )}>
                                            <label htmlFor="department" className="required">
                                                Department
                                            </label>
                                            <select className="form-control" id="department" name="department" value={this.state.form.department} onChange={this.onChange} >
                                                <option value="">Select Department</option>
                                                { this.props.departments.map(department => <option value={department._id} key={department._id}>{department.name}</option> ) }
                                            </select>
                                            <span className="text-danger">{ this.state.errors.department }</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.shift } )}>
                                            <label htmlFor="language" className="required">
                                                Shift
                                            </label>
                                            <select className="form-control" id="shift" name="shift" value={this.state.form.shift} onChange={this.onChange} >
                                                <option value="">Select Shift</option>
                                                { this.props.shifts.map(shift => <option value={shift._id} key={shift._id}>{shift.name}</option> ) }
                                            </select>
                                            <span className="text-danger">{ this.state.errors.language }</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.year } )}>
                                            <label htmlFor="year" className="required">
                                                Year
                                            </label>
                                            <select className="form-control" id="year" name="year" value={this.state.form.year} onChange={this.onChange} >
                                                <option value="">Select Year</option>
                                                { this.props.years.map(year => <option value={year._id} key={year._id}>{year.name}</option> ) }
                                            </select>
                                            <span className="text-danger">{ this.state.errors.year }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.roll } )}>
                                                <label htmlFor="roll" className="required"> Roll</label>
                                                <input type="text" autoComplete="off" className="form-control"  placeholder="Roll No" id="roll" name="roll" value={this.state.form.roll} onChange={this.onChange}/>
                                                <span className="text-danger">{ this.state.errors.roll }</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.registration } )}>
                                                <label htmlFor="registration" className="required"> Registration</label>
                                                <input type="text" autoComplete="off" className="form-control"  placeholder="Registration Number" id="registration" name="registration" value={this.state.form.registration} onChange={this.onChange}/>
                                                <span className="text-danger">{ this.state.errors.registration }</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.gender } )}>
                                                <label htmlFor="gender" className="required"> Gender</label>
                                                <select  name="gender" className="form-control" id="gender" value={this.state.form.gender} onChange={this.onChange}>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                {this.state.errors.global && <p className="text-danger text-center">{ this.state.errors.global }</p>}
                                <input type="submit" className="btn btn-primary btn-block" disabled={this.state.isLoading} value={(this.props.match.params.id?'Edit':'Add')+' Student'}/>
                            </div>
                        </div>
                    </form>
                </div>
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> {this.props.match.params.id?'Edit':'Add'} Student</a></h4>
                </div>
                { data }
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        departments: state.setup.departments,
        shifts: state.setup.shifts,
        years: state.setup.years,
    }
};
export default connect( mapStateToProps, { getDepartment, getShift, getYear, saveStudent, updateStudent } )(AddStudentsComponent);