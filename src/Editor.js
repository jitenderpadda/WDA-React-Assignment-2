import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {RaisedButton} from "material-ui";

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
                    <option key="1" value="Resolved">Resolved</option>
                    <option key="2" value="Unresolved">Unresolved</option>
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