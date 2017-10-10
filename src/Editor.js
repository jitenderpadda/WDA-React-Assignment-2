import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {RaisedButton} from "material-ui";
import {apiurl} from './helpers/constants';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        {/*this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});*/
        }
        this.state = {comment: '', ticketStatus: null} // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(value) {
        this.setState({comment: value})
    }

    handleStatusChange = (e) => {
        this.setState({
            ticketStatus: e.target.value
        });
    }

    submit() {
        alert(this.state.comment);
        alert(this.state.ticketStatus);
        //Insert Comment in Laravel
        const comment={};
        comment["description"]="TEST-REACT";
        comment["email"]=this.props.user.email;
        comment["ticket_id"]=this.props.ticket.id;
        console.log(JSON.stringify(comment));
        //Update Ticket Status
        fetch(apiurl + '/api/comments',{
            method: "POST",
            body:JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert(responseJson);
                console.log(responseJson);
            })//Update Ticket Status
            /*.then(
                const ticket={};
                ticket["id"]=this.props.ticket.id;
                ticket["status"]=this.state.ticketStatus;
                fetch(apiurl + '/api/comments',{
                    method: "POST",
                    body:JSON.stringify(ticket),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            )*/
    }

    render() {
        return (
            <div id="editor">
                <ReactQuill value={this.state.comment}
                            onChange={this.handleChange}/>
                <h3>Set status of ticket</h3>
                <select className="form-control"
                        onChange={this.handleStatusChange}
                        defaultValue="-1">
                    <option value="-1" defaultValue disabled>Select priority
                    </option>
                    <option key="1" value="In Progress">In Progress</option>
                    <option key="2" value="Resolved">Resolved</option>
                    <option key="3" value="Unresolved">Unresolved</option>
                </select>
                <br/>
                {this.state.comment != null && this.state.ticketStatus != null && (
                    <RaisedButton
                        label="Submit"
                        primary={true}
                        onTouchTap={() => this.submit()}
                    />
                )}
            </div>
        );
    }
}

export default Editor;