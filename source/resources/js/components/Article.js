import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function RenderRows(props){
    return props.articles.map(article => {
        return (
            <tr key={article.id}>
                <td>{article.created_at}</td>
                <td>{article.title}</td>
                <td>{article.content}</td>
                {/* <td><button className="btn btn-secondary">完了</button></td> */}
            </tr>
        );
    });
}

export default class Article extends Component {
    constructor(){
        super();
        this.state = {
            articles: []
        }
    }

    componentDidMount(){
        axios
            .get('/api/get')
            .then((res) => {
                this.setState({
                    articles: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <React.Fragment>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>タイトル</th>
                            <th>内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderRows
                            articles={this.state.articles}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Article />, document.getElementById('article'));