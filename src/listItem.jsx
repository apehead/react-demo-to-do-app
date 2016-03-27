var React = require('react');
var Firebase = require('firebase');

var rootUrl = 'https://boiling-inferno-2824.firebaseio.com/';

var ListItem = React.createClass({

    getInitialState: function () {
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        };
    },

    componentWillMount: function() {
        this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
    },

    handleDoneChange: function (event) {
        var update = {done: event.target.checked};

        this.setState(update);
        this.fb.update(update);
    },

    handleDeleteClick: function () {
        this.fb.remove();
    },

    handleTextChange: function (event) {
        this.setState({
            text: event.target.value,
            textChanged: true
        })
    },

    hadleUndoClick: function () {
        this.setState({
            text: this.props.item.text,
            textChanged: false
        });
    },

    handleSaveClick: function () {
        var text = this.state.text.trim();

        if (text.length) {
            this.fb.update({text: text});
            this.setState({textChanged: false});
        }
    },

    handleInputKeyup: function (event) {
        if (event.key === 'Enter') {
            this.handleSaveClick();
        }

        if (event.key === 'Escape') {
            this.hadleUndoClick();
        }
    },

    changesButtons: function () {
        if (!this.state.textChanged) {
            return null;
        } else {
            return [
                <button
                    key={this.props.item.key + '_save'}
                    className="btn btn-default"
                    onClick={this.handleSaveClick}
                    >
                    Save
                </button>,
                <button
                    key={this.props.item.key + '_delete'}
                    className="btn btn-default"
                    onClick={this.hadleUndoClick}
                    >
                    Undo
                </button>
            ];
        }
    },

    render: function () {
        return <div className="input-group">
            <span className="input-group-addon">
                <input
                    type="checkbox"
                    checked={this.state.done}
                    onChange={this.handleDoneChange}
                />
            </span>
            <input type="text"
                disabled={this.state.done}
                className="form-control"
                value={this.state.text}
                onChange={this.handleTextChange}
                onKeyUp={this.handleInputKeyup}
            />
            <span className="input-group-btn">
                {this.changesButtons()}
                <button
                    className="btn btn-default"
                    onClick={this.handleDeleteClick}
                    >
                    Delete
                </button>
            </span>
        </div>;
    }

});

module.exports = ListItem;
