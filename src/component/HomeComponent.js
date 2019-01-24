import React, { Component } from 'react';
import LeftMenuComponent from "./LeftMenuComponent";
import {Route, Switch} from 'react-router-dom'
import requireAuth from "../utils/requireAuth";

import YearsComponent from "./setup/Year/YearsComponent";
import DepartmentsComponent from "./setup/Department/DepartmentsComponent";
import ShiftsComponent from "./setup/Shift/ShiftsComponent";
import LanguagesComponent from "./setup/Language/LanguagesComponent";
import CategoriesComponent from "./setup/Category/CategoriesComponent";
import AddBooksComponent from "./Books/AddBooksComponent";
import BooksListComponent from "./Books/BooksListComponent";
import AddStudentsComponent from "./Student/AddStudentsComponent";
import StudentsListComponent from "./Student/StudentsListComponent";
import ViewStudentsComponent from "./Student/ViewStudentsComponent";
import ViewBooksComponent from "./Books/ViewBooksComponent";

class HomeComponent extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-md-3 col-sm-3">
                    <LeftMenuComponent {...this.props}/>
                </div>
                <div className="col-md-9 col-sm-9">
                    <Switch>
                        <Route path="/setup/year" exact  component={requireAuth(YearsComponent)} />
                        <Route path="/setup/department" exact  component={requireAuth(DepartmentsComponent)} />
                        <Route path="/setup/shift" exact  component={requireAuth(ShiftsComponent)} />
                        <Route path="/setup/language" exact  component={requireAuth(LanguagesComponent)} />
                        <Route path="/setup/category" exact  component={requireAuth(CategoriesComponent)} />
                        <Route path="/books/add" exact  component={requireAuth(AddBooksComponent)} />
                        <Route path="/books/list" exact  component={requireAuth(BooksListComponent)} />
                        <Route path="/books/:id/edit" exact  component={requireAuth(AddBooksComponent)} />
                        <Route path="/books/:id/view" exact  component={requireAuth(ViewBooksComponent)} />
                        <Route path="/students/add" exact  component={requireAuth(AddStudentsComponent)} />
                        <Route path="/" exact  component={requireAuth(StudentsListComponent)} />
                        <Route path="/students/list" exact  component={requireAuth(StudentsListComponent)} />
                        <Route path="/students/:id/edit" exact  component={requireAuth(AddStudentsComponent)} />
                        <Route path="/students/:id/view" exact  component={requireAuth(ViewStudentsComponent)} />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default HomeComponent;