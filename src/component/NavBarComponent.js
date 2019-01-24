import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBarComponent extends Component {
    onLogout = (e) => {
        e.preventDefault();
        this.props.logout()
    };
    render(){
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <header className="navbar navbar-default navbar-fixed-top navbar-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button data-target=".navbar-collapse" data-toggle="collapse" className="navbar-toggle"
                                    type="button">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand">
                                <span className="logo">
                                <i className="fa fa-recycle"></i> Library</span>
                            </Link>
                        </div>

                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                {
                                    isAuthenticated === false && (
                                        <li><Link to="/login" className="navbar-brand">Login</Link></li>
                                    )
                                }
                                {
                                    isAuthenticated === true && (
                                        <li className="dropdown">
                                            <span className="dropdown-toggle pointer" data-toggle="dropdown">
                                                <i className="fa fa-user"></i> <strong className="caret"></strong>&nbsp;
                                            </span>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link to="/logout"> <i className="fa fa-sign-out"></i> Log Out </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(NavBarComponent);