import React, { Component } from 'react';
import classNames from  'classnames';
import { NavLink } from 'react-router-dom'
class LeftMenuComponent extends Component{
    state = {
        main_menu: '',
    };
    componentDidMount(){
        const split = this.props.location.pathname.split('/');
        let first_path = (split[1])?split[1]:'';
        this.setState({
            main_menu: first_path
        });
    }
    render(){
        return(
            <div className="widget">
                <div className="widget-header">
                    <h3>Profile</h3>
                </div>
                <div className="widget-body">
                    <ul className="author-menus">
                        <li>
                            <NavLink to="/setup" activeClassName="is-active open-dropdown" className="dropdown"><i className="fa fa-wrench"></i> Year setup </NavLink>
                            <ul className={classNames('author-menus-sub',{'none': this.state.main_menu !== 'setup'})}>
                                <li><NavLink to="/setup/year" activeClassName="is-active"><i className="fa fa-angle-right"></i> Year setup </NavLink></li>
                                <li><NavLink to="/setup/department" activeClassName="is-active"><i className="fa fa-angle-right"></i> Department setup </NavLink></li>
                                <li><NavLink to="/setup/shift" activeClassName="is-active"><i className="fa fa-angle-right"></i> Shift setup </NavLink></li>
                                <li><NavLink to="/setup/language" activeClassName="is-active"><i className="fa fa-angle-right"></i> Language setup </NavLink></li>
                                <li><NavLink to="/setup/category" activeClassName="is-active"><i className="fa fa-angle-right"></i> Category setup </NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/books" activeClassName="is-active open-dropdown" className="dropdown"><i className="fa fa-book"></i> Book setup </NavLink>
                            <ul className={classNames('author-menus-sub',{'none': this.state.main_menu !== 'books'})}>
                                <li><NavLink to="/books/add" activeClassName="is-active"><i className="fa fa-angle-right"></i> Add Book</NavLink></li>
                                <li><NavLink to="/books/list" activeClassName="is-active"><i className="fa fa-angle-right"></i> Book List</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/students" activeClassName="is-active open-dropdown" className="dropdown"><i className="fa fa-graduation-cap"></i> Student </NavLink>
                            <ul className={classNames('author-menus-sub',{'none': this.state.main_menu !== 'students'})}>
                                <li><NavLink to="/students/add" activeClassName="is-active"><i className="fa fa-angle-right"></i> Student Add</NavLink></li>
                                <li><NavLink to="/students/list" activeClassName="is-active"><i className="fa fa-angle-right"></i> Student List</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default LeftMenuComponent;