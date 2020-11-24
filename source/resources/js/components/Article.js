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
            articles: [],
            article: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.addArticle = this.addArticle.bind(this);
        
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

    inputChange(event){
        switch(event.target.name){
            case 'article':
                this.setState({
                    article: event.target.value
                });
                break;
            default:
                break;
        }
    }

    //登録アクション
    addTodo(){

        //空だとreturn
        if(this.state.article == ''){
            return;
        }

        //入力値をapiで渡す
        axios
            .post('/api/add', {
                title: this.state.article
            })
            .then((res) => {
                //戻り値をセット
                this.setState({
                    articles: res.data,
                    article: ''
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-group mt-4">
                   <label htmlFor="todo">新規Todo</label>
                   <input type="text" className="form-control" name="todo" value={this.state.article} onChange={this.inputChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.addArticle}>登録</button>
                
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
