import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Article extends Component {
    render() {
        return (
            <div>Article</div>
        );
    }
}

ReactDOM.render(<Article />, document.getElementById('article'));