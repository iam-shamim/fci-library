import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudent,studentDelete } from "../../store/actions/student";
import Pagination from "react-js-pagination";
import { toastr } from 'react-redux-toastr';
import StudentListComponent from "./StudentListComponent";
import Spinner from "../UI/Spinner/Spinner";
import * as qs from 'query-string';
import Modal from "../UI/Modal/Modal";



class BooksListComponent extends Component{
    state = {
        errors: {},
        isLoading: false,
        delete_info:{
            modal: false,
            title: null,
            id: null,
        },
        dataLoading: false
    };


    componentDidMount(){
        document.title = "Student List";
        const param = qs.parse(this.props.location.search);
        param.page = param.page?param.page:1;
        this.setState({dataLoading: true});
        if(this.props.studentList.docs.length===0){
            //this.setState({dataLoading: true});
        }
        this.props.getStudent(param).then(()=>{
            this.setState({dataLoading: false})
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ dataLoading: false})
            }
        })
    }
    filterWithCategory = (_id)=>{
        this.props.history.push('?category='+_id);

    };
    editStudent = (_id)=>{
        this.props.history.push("/students/"+_id+'/edit');

    };
    viewStudent = (_id)=>{
        this.props.history.push("/students/"+_id+'/view');

    };
    deleteStudent = (_id)=>{
        const find = this.props.studentList.docs.find((category)=> category._id === _id);
        this.setState({
            delete_info: {
                modal: true,
                title: find.name,
                _id: find._id
            }
        });

    };
    deleteCancel = ()=>{
        this.setState({
            delete_info: {
                modal: false
            }
        });
    };
    deleteConfirm = ()=>{
        this.props.studentDelete({ _id: this.state.delete_info._id }).then(()=>{
            const newState = {
                delete_info: {modal: false}
            };
            if(this.state.delete_info._id === this.state._id){
                newState._id = null;
                newState.name = '';
            }
            this.setState(newState);
            toastr.success('Success','Student successfully deleted');
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ isLoading: false})
            }else{
                this.setState({ isLoading: false, errors: errors.response.errors })
            }
        });
    };
    handlePageChange = (props)=>{
        const param = qs.parse(this.props.location.search);
        if(props != param.page){
            param.page = props;
            this.props.history.push('?'+qs.stringify(param))
        }
    };
    render() {
        let data = null;
        if(this.state.dataLoading){
            data = <Spinner/>;
        }else if(this.props.studentList.docs.length === 0){
            data = <p className="text-center">Not found</p>
        }else{
            let sl = 1;
            data = this.props.studentList.docs.map(book=>(<StudentListComponent key={book._id} student={book} deleteStudent={this.deleteStudent} editStudent={this.editStudent} viewStudent={this.viewStudent} filterWithCategory={this.filterWithCategory} />)) ;
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
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> Student List</a></h4>
                </div>
                <div className="panel-body">
                    {data}
                    <div className="text-center">
                        {
                            this.props.studentList.pages>1 &&
                            <Pagination
                                activePage={this.props.studentList.page}
                                itemsCountPerPage={this.props.studentList.limit}
                                totalItemsCount={this.props.studentList.total}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        studentList: state.student.studentList
    }
};
export default connect( mapStateToProps, { getStudent, studentDelete } )(BooksListComponent);