import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategory, getLanguage} from "../../store/actions/setup";
import { saveBook, updateBook } from "../../store/actions/book";
import className from "classnames";
import commonValidations from '../../validations/commonValidations';
import { toastr } from 'react-redux-toastr';
import css from './css/AddBooksComponent.css';
import Aux from '../../hoc/Aux'
import Spinner from "../UI/Spinner/Spinner";
import server from "../../server";

class AddBooksComponent extends Component{
    state = {
        form: {
            _id: null,
            name: '',
            writer: '',
            publisher: '',
            language: '',
            items: '',
            details: '',
            categories: []
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
            writer: 'required',
            publisher: 'required',
            language: 'required',
            items: 'required',
            categories: 'required'
        },{
            cats: {
                required: 'Please, select an item'
            }
        });
        if(isValid){
            this.setState({isLoading: true});
            if(this.state.form._id === null){
                this.props.saveBook(this.state.form).then(()=>{
                    this.setState({
                        isLoading: false,
                        form:{
                            _id: null,
                            name: '',
                            writer: '',
                            publisher: '',
                            language: '',
                            items: '',
                            details: '',
                            categories: []
                        }
                    });
                    toastr.success('Success','Book successfully added');
                }).catch((errors)=>{
                    if(errors.response.errors._flash){
                        toastr.error("Error",errors.response.errors._flash);
                        this.setState({ isLoading: false})
                    }else{
                        this.setState({ isLoading: false, errors: errors.response.errors })
                    }
                });
            }else{
                this.props.updateBook(this.state.form).then(()=>{
                    this.setState({isLoading: false});
                    toastr.success('Success','Book successfully updated');
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
        if(this.props.match.params.id){
            document.title = "Edit Book";
            this.setState({dataLoading: true});
            server.get('/api/books/'+this.props.match.params.id).then((res)=>{
                const book = res.data.book;
                console.log(book);
                this.setState({dataLoading: null,
                    form: {
                        _id: book._id,
                        name: book.name,
                        writer: book.writer,
                        publisher: book.publisher,
                        language: book.language,
                        items: book.items,
                        details: book.details,
                        categories: book.categories
                    },});
            }).catch((errors)=>{
                this.setState({dataLoading: false});
                toastr.error('Error',errors.response.data.error);
            })
        }else{
            document.title = "Add Book";
        }
        this.props.getCategory().then().catch(()=>{});
        this.props.getLanguage().then().catch(()=>{});
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
                                        <label htmlFor="name" className="required"><i className="fa fa-book"></i> Book Name</label>
                                        <input type="text" autoComplete="off" className="form-control"  placeholder="Write Book Name" id="name" name="name" value={this.state.form.name} onChange={this.onChange}/>
                                        <span className="text-danger">{ this.state.errors.name }</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.writer } )}>
                                        <label htmlFor="writer" className="required"><i className="fa fa-pencil"></i> Writer</label>
                                        <input type="text" autoComplete="off" className="form-control"  placeholder="Writer Name" id="writer" name="writer" value={this.state.form.writer} onChange={this.onChange}/>
                                        <span className="text-danger">{ this.state.errors.writer }</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.publisher } )}>
                                        <label htmlFor="writer_name" className="required"><i className="fa fa-print"></i> Publisher</label>
                                        <input type="text" autoComplete="off" className="form-control"  placeholder="Publisher Name" id="publisher" name="publisher" value={this.state.form.publisher} onChange={this.onChange}/>
                                        <span className="text-danger">{ this.state.errors.publisher }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.language } )}>
                                    <label htmlFor="language" className="required">
                                        <i className="fa fa-language"></i> Language
                                    </label>
                                    <select className="form-control" id="language" name="language" value={this.state.form.language} onChange={this.onChange} >
                                        <option value="">Select Language</option>
                                        { this.props.languages.map(language => <option value={language._id} key={language._id}>{language.name}</option> ) }
                                    </select>
                                    <span className="text-danger">{ this.state.errors.language }</span>
                                </div>
                            </div>
                            <div className="col-sm-3 col-xs-12">
                                <div className={className('form-group', 'has-feedback',{ 'has-error': this.state.errors.items } )}>
                                    <label htmlFor="items" className="required">
                                        <i className="fa fa-database"></i> Total Items
                                    </label>
                                    <input className="form-control btn-block" type="text" placeholder="Total Book Items" name="items" id="items" value={this.state.form.items} onChange={this.onChange} />
                                    <span className="text-danger">{ this.state.errors.items }</span>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="details">
                                        <i className="fa fa-info-circle"></i> Book Details
                                    </label>
                                    <textarea className="form-control" name="details" rows="10" placeholder="Write Book Details...." id="details" value={this.state.form.details} onChange={this.onChange}></textarea>
                                </div>
                            </div>
                            <div className="col-xs-12 bookAddCat">
                                <h1 className="text-center">
                                    <small>Add Category</small>
                                </h1>
                                <div className={['form-group',css.category_list].join(' ')}>
                                    <p className="text-danger">{ this.state.errors.categories }</p>
                                    {
                                        this.props.categories.map((categorie)=>
                                            <Aux key={categorie._id}>
                                                <input type="checkbox" id={'cat_'+categorie._id}  checked={this.state.form.categories.includes(categorie._id)} name={'categories'} value={categorie._id} onChange={this.onChange} />
                                                <label htmlFor={'cat_'+categorie._id}>
                                                    <div className="btn btn-default">{ categorie.name }</div>
                                                </label>
                                            </Aux>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <input type="submit" className="btn btn-primary btn-block" disabled={this.state.isLoading} value={(this.props.match.params.id?'Edit':'Add')+' Book'}/>
                            </div>
                        </div>
                    </form>
                </div>
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><a href="#collapseB1" data-toggle="collapse"> {this.props.match.params.id?'Edit':'Add'} Book</a></h4>
                </div>
                { data }
            </div>
        );
    }
}
const mapStateToProps =(state)=> {
    return {
        categories: state.setup.categories,
        languages: state.setup.languages
    }
};
export default connect( mapStateToProps, { getCategory, getLanguage, saveBook, updateBook } )(AddBooksComponent);