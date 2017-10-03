import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        {/*this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});*/}
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <div id="editor">
                <ReactQuill value={this.state.text}
                  onChange={this.handleChange} />
            </div>

        );
    }
}
export default Editor;