var React = require('react');

var Header = React.createClass({

    getInitialState: function () {
        return {
            text: ''
        };
    },

    handleClick: function () {
        var text = this.state.text.trim();

        if (text.length) {
            this.props.itemsStore.push({
                text: text,
                done: false
            });
            
            this.setState({text: ''});
        }
    },

    handleInputChange: function (event) {
        this.setState({text: event.target.value});
    },

    handleKeyPress: function (event) {
        if (event.key === 'Enter') {
            this.handleClick();
        }
    },

    render: function () {
        return <div className="input-group">
            <input
                value={this.state.text}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                type="text"
                className="form-control" />
            <span className="input-group-btn">
                <button
                    onClick={this.handleClick}
                    className="btn btn-default"
                    type="button">
                    Add
                </button>
            </span>
        </div>;
    }

});

module.exports = Header;
