var React = require('react');
var ListItem = require('./listItem');

var List = React.createClass({

    renderList: function() {
        if (!this.props.items) {
            return <h4>Add a todo to get started</h4>;
        } else {
            var children = [];

            for (var key in this.props.items) {
                var item = this.props.items[key];

                item.key = key;

                if (item.hasOwnProperty('text')) {
                    children.push(<ListItem key={key} item={item}/>);
                }
            }

            return children;
        }
    },

    render: function() {
        return <div>
            {this.renderList()}
        </div>;
    }

});

module.exports = List;
