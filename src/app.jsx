var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://boiling-inferno-2824.firebaseio.com/';

var App = React.createClass({

    mixins: [ReactFire],

    getInitialState: function () {
        return {
            items: null,
            loaded: false
        };
    },

    componentWillMount: function() {
        this.fb = new Firebase(rootUrl + 'items/');

        this.bindAsObject(this.fb, 'items');
        this.fb.on('value', this.handleDataLoaded);
    },

    handleDataLoaded: function () {
        this.setState({loaded: true});
    },

    onDeleteDoneClick: function () {
        for (var key in this.state.items) {
            if (this.state.items[key].done === true) {
                this.fb.child(key).remove();
            }
        }
    },

    deleteButton: function () {
        if (!this.state.loaded || !this.state.items) {
            return null;
        } else {
            return <div className="text-center clear-complete">
                <hr/>
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.onDeleteDoneClick}
                    >
                    Clear Complete
                </button>
            </div>;
        }
    },

    render: function() {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                    To-Do List
                </h2>
                <Header itemsStore={this.firebaseRefs.items} />
                <hr/>
                <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
                    <List items={this.state.items} loaded={this.state.loaded} />
                    {this.deleteButton()}
                </div>
            </div>
        </div>;
    }

});

var element = React.createElement(App, {});
var mountNode = document.querySelector('#app');

ReactDOM.render(element, mountNode);
