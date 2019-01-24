import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createEvent} from "../../store/actions/eventAction";

class EventForm extends Component{
    state = {
        errors: {
        }
    };
    onEventSubmit = (e)=>{
        e.preventDefault();
        this.props.createEvent({
            event_title:e.target.event_title.value
        }).then(()=>{

        }).catch((errors)=> this.setState({ errors: errors.response.errors }));
    };
    render() {
        return (
            <div>
                { this.state.errors.global && (<div className="alert alert-danger">
                    <p>{ this.state.errors.global }</p>
                </div>) }
                <h1>Create new games event</h1>
                <form onSubmit={this.onEventSubmit}>
                    <div className="form-group">
                        <label htmlFor="event_title">Event Title</label>
                        <input type="text" className="form-control event_title" name="event_title"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default connect(null, { createEvent })(EventForm);