import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDepartment, getShift, getYear} from "../../store/actions/setup";
import { saveStudent, updateStudent, studentBooks, studentBookDelete } from "../../store/actions/student";
import className from "classnames";
import commonValidations from '../../validations/commonValidations';
import { toastr } from 'react-redux-toastr';
import Spinner from "../UI/Spinner/Spinner";
import server from "../../server";
import StudentListSingleComponent from "./StudentListSingleComponent";
import StudentBookListComponent from "./StudentBookListComponent";
import Pagination from "react-js-pagination";
import * as qs from "query-string";
import Modal from "../UI/Modal/Modal";

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
        book_return_info:{
            modal: false,
            title: null,
            id: null,
        },
        errors: {},
        isLoading: false,
        dataLoading: null,
        isBookListLoading: false,
        retry_book_student: 0,
    };
    onSubmitHandler = (e)=>{
        e.preventDefault();
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
    handlePageChange = (props)=>{
        this.setState({isBookListLoading: true});
        this.props.studentBooks(this.props.match.params.id,props).then(res=>{
            this.setState({isBookListLoading: false});
        }).catch(()=>{
            this.setState({isBookListLoading: false});
        });
    };
    bookReturn = (_id)=>{
        console.log('studentBookId:',_id);
        const find = this.props.bookList.docs.find((book)=> book._id === _id);
        this.setState({
            book_return_info: {
                modal: true,
                title: find.book_id.name,
                _id: find._id
            }
        });
    };
    returnCancel = () => {
        this.setState({
            book_return_info: {
                modal: false
            }
        });
    };
    get_sl = (page, total, limit) =>{
        var a = Math.floor(total/limit);
        var b = (a*limit)+(total-a*limit);
        return b-((page-1)*limit);

    };
    returnConfirm = ()=>{
        this.props.studentBookDelete({ _id: this.state.book_return_info._id }).then(()=>{
            const newState = {
                book_return_info: {modal: false}
            };
            if(this.state.book_return_info._id === this.state._id){
                newState._id = null;
                newState.name = '';
            }
            this.setState(newState);
            toastr.success('Success','Student book successfully return');
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
        document.title = "View Student";
        if(this.props.match.params.id){
            this.setState({dataLoading: true});
            server.get('/api/students/'+this.props.match.params.id,{params:{populate: true}}).then((res)=>{
                const student = res.data.student;
                this.setState({dataLoading: null, form: student});
            }).catch((errors)=>{
                this.setState({dataLoading: false});
                toastr.error('Error',errors.response.data.error);
            })
        }
        this.setState({isBookListLoading: true});
        this.props.studentBooks(this.props.match.params.id).then(res=>{
            this.setState({isBookListLoading: false});
        }).catch(()=>{
            this.setState({isBookListLoading: false});
        });
        this.props.getDepartment().then().catch(()=>{});
        this.props.getShift().then().catch(()=>{});
        this.props.getYear().then().catch(()=>{});
    }
    componentDidUpdate(prevProps){
        if(prevProps.retry_book_student > this.state.retry_book_student){
            this.setState({
                retry_book_student: prevProps.retry_book_student,
                isBookListLoading: true
            });
            const newPage = this.props.bookList.page===1?1: (this.props.bookList.page - 1);
            this.props.studentBooks(this.props.match.params.id,newPage).then(res=>{
                this.setState({isBookListLoading: false});
            }).catch(()=>{
                this.setState({isBookListLoading: false});
            });
        }
    }

    render() {
        let data = <Spinner/>;
        if(this.state.dataLoading === false){
            data = (
                <h3 className="text-center pa-b-20">Student not found</h3>
            );
        }else if(this.state.dataLoading === null){
            data = <StudentListSingleComponent student={this.state.form} />;
        }

        let bookList = null;
        if(this.state.isBookListLoading){
            bookList = <Spinner/>;
        }else if(this.props.bookList.docs.length === 0){
            bookList = <p className="text-center">Book Not found</p>
        }else{
            let sl = this.get_sl(this.props.bookList.page,this.props.bookList.total,this.props.bookList.limit);
            bookList = (
                <table className="table">
                    <caption>Student Book List.</caption>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Name</th>
                            <th>Return</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.props.bookList.docs.map(book=>(<StudentBookListComponent sl={sl--} key={book._id} bookReturn={this.bookReturn} book={book} />)) }
                    </tbody>
                </table>

            )
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> View Student</a></h4>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-12">
                            { data }
                            { bookList }
                            <div className="text-center">
                                {
                                    this.props.bookList.pages>1 &&
                                    <Pagination
                                        activePage={this.props.bookList.page}
                                        itemsCountPerPage={this.props.bookList.limit}
                                        totalItemsCount={this.props.bookList.total}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.book_return_info.modal} modalClosed={this.returnCancel}>
                    <h4 className="text-center">Are you sure?</h4>
                    <hr/>
                    You want to return: {this.state.book_return_info.title}
                    <hr/>
                    <div className="pull-right">
                        <button className="ma-r-5 btn btn-sm btn-default" onClick={this.returnCancel}>No, cancel please</button>
                        <button className="btn btn-sm btn-danger" onClick={this.returnConfirm}>
                            <span className="fa fa-trash-o fa-1-2x"></span> Yes, Return it!
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        departments: state.setup.departments,
        shifts: state.setup.shifts,
        years: state.setup.years,
        bookList: state.student.bookList,
        retry_book_student: state.student.retry_book_student
    }
};
export default connect( mapStateToProps, { getDepartment, getShift, getYear, saveStudent, updateStudent, studentBooks, studentBookDelete } )(AddStudentsComponent);