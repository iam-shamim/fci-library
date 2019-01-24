import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Spinner from "../UI/Spinner/Spinner";
import server from "../../server";
import SingleBookComponent from "./SingleBookComponent";
import { bookStudents, bookStudentsDelete, bookGiveTo } from '../../store/actions/book'
import Pagination from "react-js-pagination";
import BookStudentListComponent from "./BookStudentListComponent";
import Modal from "../UI/Modal/Modal";
import StudentListSingleComponent from "../Student/StudentListSingleComponent";

const default_finding_student = {
    finding_student_id: '',
    student_info: null,
    not_found: false,
    checkExists: false,
    loading:false,
};

class AddBooksComponent extends Component{
    state = {
        bookInfo: {},
        errors: {},
        isLoading: false,
        isStudentListLoading: null,
        isBookListLoading: false,
        book_return_info:{
            modal: false,
            title: null,
            id: null,
        },
        give_to:false,
        finding_student: default_finding_student,
        give_to_sending:false,
        retry_book_student: 0,
    };
    componentDidMount(){
        document.title = "View Book";
        this.setState({dataLoading: true});
        server.get('/api/books/'+this.props.match.params.id,{params:{populate: true}}).then((res)=>{
            const book = res.data.book;
            this.setState({dataLoading: null, bookInfo: book});
        }).catch((errors)=>{
            this.setState({dataLoading: false});
            toastr.error('Error',errors.response.data.error);
        });

        this.setState({isStudentListLoading: true});
        this.props.bookStudents(this.props.match.params.id).then(res=>{
            this.setState({isStudentListLoading: false});
        }).catch(()=>{
            this.setState({isStudentListLoading: false});
        });
    }

    filterWithCategory = (e)=>{
        this.props.history.push("/books/list?category="+e);
    };
    filterWithLanguage = (e)=>{
        this.props.history.push("/books/list?language="+e);
    };
    handlePageChange = (props)=>{
        this.setState({isBookListLoading: true});
        this.props.bookStudents(this.props.match.params.id,props).then(res=>{
            this.setState({isBookListLoading: false});
        }).catch(()=>{
            this.setState({isBookListLoading: false});
        });
    };
    bookReturn = (_id)=>{
        const find = this.props.studentList.docs.find((student)=> student._id === _id);
        this.setState({
            book_return_info: {
                modal: true,
                title: find.student_id.name,
                _id: find._id
            }
        });
    };
    returnConfirm = ()=>{
        this.props.bookStudentsDelete({ _id: this.state.book_return_info._id }).then(()=>{
            const newState = {
                bookInfo: {
                    ...this.state.bookInfo,
                    current_stock: this.state.bookInfo.current_stock + 1

                },
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
    componentDidUpdate(prevProps){
        if(prevProps.retry_book_student > this.state.retry_book_student){
            this.setState({
                retry_book_student: prevProps.retry_book_student,
                isBookListLoading: true
            });
            const newPage = this.props.studentList.page===1?1: (this.props.studentList.page - 1);
            this.props.bookStudents(this.props.match.params.id,newPage).then(res=>{
                this.setState({isBookListLoading: false});
            }).catch(()=>{
                this.setState({isBookListLoading: false});
            });
        }
    }


    finding_student = (e)=>{
        server.get(('/api/students/'+this.state.finding_student.finding_student_id+'/reg'),{
            params:{
                book_id: this.state.give_to
            }
        }).then((res)=>{
            if(res.data.student){
                this.setState({
                    finding_student:{
                        ...this.state.finding_student,
                        student_info: res.data.student,
                        checkExists: res.data.checkExists !== null,
                        not_found: false,
                        loading: false,
                    },
                });
            }else{
                throw '';
            }

        }).catch((err)=>{
            this.setState({
                finding_student:default_finding_student,
            });
        });
    };
    returnCancel = () => {
        this.setState({
            book_return_info: {
                modal: false
            }
        });
    };
    giveToBook = (_id)=>{
        this.setState({
            give_to: _id,
            finding_student: default_finding_student
        });
    };
    giveToCancel = ()=>{
        if(this.state.give_to_sending === false){
            this.setState({
                give_to: false
            });
        }
    };
    giveToSave = ()=>{
        this.setState({
            give_to_sending: true
        });
        this.props.bookGiveTo({ book_id: this.state.give_to,student_id: this.state.finding_student.student_info._id },true).then(()=>{
            this.setState({
                bookInfo: {
                    ...this.state.bookInfo,
                    current_stock: this.state.bookInfo.current_stock - 1

                },
                give_to: false,
                give_to_sending: false
            });
            toastr.success('Success','Book successfully give');
        }).catch((errors)=>{
            this.setState({
                give_to_sending: false
            });
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ isLoading: false})
            }else{
                toastr.error("Error",errors.response.errors);
            }
        });
    };
    find_student = (e)=>{
        this.setState({
            finding_student:{
                ...this.state.finding_student,
                'finding_student_id': e.target.value
            }
        });
    };
    get_sl = (page, total, limit) =>{
        var a = Math.floor(total/limit);
        var b = (a*limit)+(total-a*limit);
        return b-((page-1)*limit);

    };
    render() {
        let data = <Spinner/>;
        if(this.state.dataLoading === false){
            data = (
                <h3 className="text-center pa-b-20">Book not found</h3>
            );
        }else if(this.state.bookInfo._id !== undefined){
            data = (
                <React.Fragment>
                    <SingleBookComponent book={this.state.bookInfo} filterWithCategory={this.filterWithCategory} filterWithLanguage={this.filterWithLanguage} />
                    {
                        this.state.bookInfo.current_stock > 0 && (
                            <button className="btn btn-xs btn-success ma-t-5" onClick={()=>this.giveToBook(this.state.bookInfo._id)}>
                                <span className="glyphicon glyphicon-plus-sign"></span> Give To
                            </button>
                        )
                    }
                </React.Fragment>
            );
        }

        let studentList = null;
        if(this.state.isBookListLoading){
            studentList = <Spinner/>;
        }else if(this.props.studentList.docs.length === 0){
            studentList = <p className="text-center">Student Not found</p>
        }else{
            let sl = this.get_sl(this.props.studentList.page,this.props.studentList.total,this.props.studentList.limit);
            studentList = (
                <table className="table">
                    <caption>Book Student List.</caption>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Return</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.props.studentList.docs.map(student=>(<BookStudentListComponent key={student._id} sl={sl--} bookReturn={this.bookReturn} student={student} />)) }
                    </tbody>
                </table>

            )
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> View Book</a></h4>
                </div>
                <div className="panel-body">
                    { data }
                    { studentList }
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
                <Modal show={this.state.give_to !== false} modalClosed={this.giveToCancel}>
                    <h4 className="text-center">
                        {
                            this.state.bookInfo.name
                        }
                    </h4>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="student_reg">Student Registration No:</label>
                        <div className="input-group">
                            <input type="text" className="form-control" autoComplete="off" id="student_reg" value={this.state.finding_student.finding_student_id} onChange={this.find_student}/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.finding_student}>Search</button>
                              </span>
                        </div>
                    </div>
                    <div>
                        { this.state.finding_student.student_info && <StudentListSingleComponent student={this.state.finding_student.student_info}/> }
                        { this.state.finding_student.loading && (<p>Loading.....</p>)}
                        { this.state.finding_student.not_found && (<p>Not Found.</p>)}
                    </div>
                    <hr/>
                    <div className="pull-right">
                        {
                            this.state.give_to_sending === false && (<button className="ma-r-5 btn btn-sm btn-default" onClick={this.giveToCancel}>No, cancel please</button>)
                        }
                        {
                            this.state.finding_student.checkExists && (
                                <button className="btn btn-sm btn-danger">
                                    Already Exists
                                </button>
                            )
                        }
                        {
                            this.state.finding_student.student_info && this.state.finding_student.checkExists === false && (
                                <button className="btn btn-sm btn-success" onClick={this.giveToSave}>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    {
                                        (this.state.give_to_sending === false)?' Save':" Loading..."
                                    }
                                </button>
                            )
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        studentList: state.book.studentList,
        retry_book_student: state.book.retry_book_student
    }
};
export default connect( mapStateToProps, { bookStudents, bookStudentsDelete, bookGiveTo } )(AddBooksComponent);