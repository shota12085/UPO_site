import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LeftSide from '../layout/left_side';
import { Editor } from '@tinymce/tinymce-react';
import * as UPO from '../module/functions';

function RenderRows(props){
    return props.articles.map(article => {
        return (
            <tr key={article.id}>
                <td>{article.created_at}</td>
                <td>{article.title}</td>
                <td>{article.content}</td>
                <td><button className="btn btn-secondary" onClick={() => props.deleteArticle(article)}>完了</button></td>
            </tr>
        );
    });
}

export default class Article extends Component <{}, { articles: any, article_title: string, article_content: string }>{
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            article_title: '',
            article_content: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
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
            case 'article_title':
                this.setState({
                    article_title: event.target.value
                });
                break;
            case 'article_content':
                this.setState({
                    article_content: event.target.value
                });
                break;
            default:
                break;
        }
    }

    //登録アクション
    addArticle(){

        //空だとreturn
        if(this.state.article_title == '' && this.state.article_content == ''){
            return;
        }
        axios
        .post(
            '/api/add',
            {title: this.state.article_title, content: this.state.article_content },
        ).then((res) => {
            //戻り値をセット

            this.setState({
                articles: res.data,
                article_title: '',
                article_content: ''
            });
        }).catch(error => {
            console.log(error);
        });
    }
    
    //削除
    deleteArticle(article){
        axios
        .post(
            '/api/del',
            {id: article.id},
        ).then((res) => {
            this.setState({
                articles: res.data,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    handleEditorChange = (e) => {
        this.setState({
            article_content: e.target.getContent()
        });
      }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-3" style={{background:"#fff"}}>
                        <LeftSide />
                    </div>
                    <div className="col-sm-9">
                        <h3 className="mt-5">ニュース一覧</h3>
                        <div className="form-group mt-4">
                        <label htmlFor="article_title">タイトル</label>
                        <input type="text" className="form-control" name="article_title" value={this.state.article_title} onChange={this.inputChange}/>
                        <label htmlFor="article_content">記事</label>
                        <Editor
                            initialValue="ここに記事を書いてください"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                'advlist autolink lists link image', 
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste wordcount'
                                ],
                                toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent | help',
                                force_p_newlines : false,
                                force_br_newlines : false,
                                // force_strong_newlines : false,
                                forced_root_block : '',
                            }}
                            onChange={this.handleEditorChange}
                        />
                        {/* <textarea className="form-control MCE" style={{height:"300px"}} name="article_content" value={this.state.article_content} onChange={this.inputChange}/> */}
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
                                    deleteArticle={this.deleteArticle}
                                    />
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
if (document.getElementById('article')) {
    ReactDOM.render(<Article />, document.getElementById('article'));
}
