import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, bookDelete, bookGiveTo } from "../../store/actions/book";
import Pagination from "react-js-pagination";
import { toastr } from 'react-redux-toastr';
import BookListComponent from "./BookListComponent";
import Spinner from "../UI/Spinner/Spinner";
import * as qs from 'query-string';
import Modal from "../UI/Modal/Modal";
import {getCategory, getLanguage} from "../../store/actions/setup";
import server from "../../server";
import StudentListSingleComponent from "../Student/StudentListSingleComponent";

const default_finding_student = {
    finding_student_id: '',
    student_info: null,
    not_found: false,
    checkExists: false,
    loading:false,
};
class BooksListComponent extends Component{
    state = {
        errors: {},
        isLoading: false,
        delete_info:{
            modal: false,
            title: null,
            id: null,
        },
        filter:{
            category: '',
            language: '',
            keywords: '',
            keywords_type: 'Book Name',
        },
        give_to:false,
        finding_student: default_finding_student,
        give_to_sending:false,
        dataLoading: false
    };


    componentDidMount(){
        document.title = "Book List";
        const param = qs.parse(this.props.location.search);
        param.page = param.page?param.page:1;
        this.setState({dataLoading: true});
        if(this.props.bookList.docs.length===0){
            //this.setState({dataLoading: true});
        }
        this.props.getBooks(param).then(()=>{
            this.setState({dataLoading: false})
        }).catch((errors)=>{
            if(errors.response.errors._flash){
                toastr.error("Error",errors.response.errors._flash);
                this.setState({ dataLoading: false})
            }
        });
        this.props.getCategory().then().catch(()=>{});
        this.props.getLanguage().then().catch(()=>{});



        const filter_category = (param.category)?param.category:'';
        const filter_language = (param.language)?param.language:'';
        const keywords = (param.keywords)?param.keywords:'';
        const keywords_type = (param.keywords_type)?param.keywords_type:'Book Name';
        this.setState({
            filter:{
                ...this.state.filter,
                category: filter_category,
                language: filter_language,
                keywords: keywords,
                keywords_type: keywords_type,
            }

        });
    }
    componentWillReceiveProps(){
        const param = qs.parse(this.props.location.search);
    }
    filterKeywordTypeChange = (e, type)=>{
        e.preventDefault();
        this.setState({
            filter:{
                ...this.state.filter,
                keywords_type: type
            }
        });
        const param = qs.parse(this.props.location.search);
        param.keywords_type = type;
        param.keywords = this.state.filter.keywords;
        this.props.history.push('?'+qs.stringify(param));
    };
    filterWithCategory = (e)=>{
        let value = e;
        if(typeof e === 'object'){
            e = e.target.value;
        }
        this.setState({
            filter:{
                ...this.state.filter,
                category: e
            }
        });
        const param = qs.parse(this.props.location.search);
        param.category = e;
        this.props.history.push('?'+qs.stringify(param));

    };
    filterWithLanguage = (e)=>{
        let value = e;
        if(typeof e === 'object'){
            e = e.target.value;
        }
        this.setState({
            filter:{
                ...this.state.filter,
                language: e
            }
        });
        const param = qs.parse(this.props.location.search);
        param.language = e;
        this.props.history.push('?'+qs.stringify(param));

    };
    filterWithKeywords = (e)=>{
        this.setState({
            filter:{
                ...this.state.filter,
                keywords: e.target.value
            }
        });
    };
    keywordsPushOnUrl = ()=>{
        const param = qs.parse(this.props.location.search);
        param.keywords = this.state.filter.keywords;
        this.props.history.push('?'+qs.stringify(param));
    };
    editBook = (_id)=>{
        this.props.history.push("/books/"+_id+'/edit');

    };
    deleteBook = (_id)=>{
        const find = this.props.bookList.docs.find((category)=> category._id === _id);
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
        this.props.bookDelete({ _id: this.state.delete_info._id }).then(()=>{
            const newState = {
                delete_info: {modal: false}
            };
            if(this.state.delete_info._id === this.state._id){
                newState._id = null;
                newState.name = '';
            }
            this.setState(newState);
            toastr.success('Success','Book successfully deleted');
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
    find_student = (e)=>{
        this.setState({
            finding_student:{
                ...this.state.finding_student,
                'finding_student_id': e.target.value
            }
        });
    };
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
    viewBook = (_id)=>{
        this.props.history.push("/books/"+_id+'/view');
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
        this.props.bookGiveTo({ book_id: this.state.give_to,student_id: this.state.finding_student.student_info._id }).then(()=>{
            this.setState({
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
    render() {
        let data = null;
        if(this.state.dataLoading){
            data = <Spinner/>;
        }else if(this.props.bookList.docs.length === 0){
            data = <p className="text-center">Not found</p>
        }else{
            let sl = 1;
            data = this.props.bookList.docs.map(book=>(<BookListComponent key={book._id} viewBook={this.viewBook} giveToBook={this.giveToBook} book={book} deleteBook={this.deleteBook} editBook={this.editBook} filterWithCategory={this.filterWithCategory} filterWithLanguage={this.filterWithLanguage} />)) ;
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> Book List</a></h4>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="">Language</label>
                            <select name="" id="" className="form-control" value={this.state.filter.language} onChange={this.filterWithLanguage}>
                                <option value="">All</option>
                                { this.props.languages.map(language=> (
                                    <option key={language._id} value={language._id}>{language.name}</option>
                                )) }
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="">Category</label>
                            <select name="" id="" className="form-control" value={this.state.filter.category} onChange={this.filterWithCategory}>
                                <option value="">All</option>
                                { this.props.categories.map(category=> (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                )) }
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Keywords</label>
                            <div className="input-group">
                                <input type="text" className="form-control" value={this.state.filter.keywords} onChange={this.filterWithKeywords} aria-label="..." />
                                <div className="input-group-btn">
                                    <button className="btn btn-default" onClick={this.keywordsPushOnUrl}>Go</button>
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">{ this.state.filter.keywords_type } <span className="caret"></span></button>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={(e)=>this.filterKeywordTypeChange(e, 'Book Name')}><a href="#">Book Name</a></li>
                                        <li onClick={(e)=>this.filterKeywordTypeChange(e, 'Writer')}><a href="#">Writer</a></li>
                                        <li onClick={(e)=>this.filterKeywordTypeChange(e, 'Publisher')}><a href="#">Publisher</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li onClick={(e)=>this.filterKeywordTypeChange(e, 'Max Stock')}><a href="#">Max Stock</a></li>
                                        <li onClick={(e)=>this.filterKeywordTypeChange(e, 'Min Stock')}><a href="#">Min Stock</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {data}
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
                <Modal show={this.state.give_to !== false} modalClosed={this.giveToCancel}>
                    <h4 className="text-center">
                        {
                            this.state.give_to && this.props.bookList.docs.find(book=>book._id===this.state.give_to).name
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
        bookList: state.book.bookList,
        categories: state.setup.categories,
        languages: state.setup.languages
    }
};
export default connect( mapStateToProps, {  getCategory, getLanguage, getBooks, bookDelete, bookGiveTo } )(BooksListComponent);