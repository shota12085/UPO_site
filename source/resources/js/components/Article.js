// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// function RenderRows(props){
//     return props.articles.map(article => {
//         return (
//             <tr key={article.id}>
//                 <td>{article.created_at}</td>
//                 <td>{article.title}</td>
//                 <td>{article.content}</td>
//                 <td><button className="btn btn-secondary" onClick={() => props.deleteArticle(article)}>完了</button></td>
//             </tr>
//         );
//     });
// }

// export default class Article extends Component {
//     constructor(){
//         super();
//         this.state = {
//             articles: [],
//             article_title: '',
//             article_content: ''
//         };
//         this.inputChange = this.inputChange.bind(this);
//         this.addArticle = this.addArticle.bind(this);
//         this.deleteArticle = this.deleteArticle.bind(this);
//     }

//     componentDidMount(){
//         axios
//             .get('/api/get')
//             .then((res) => {
//                 this.setState({
//                     articles: res.data
//                 });
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     inputChange(event){
//         switch(event.target.name){
//             case 'article_title':
//                 this.setState({
//                     article_title: event.target.value
//                 });
//                 break;
//             case 'article_content':
//                 this.setState({
//                     article_content: event.target.value
//                 });
//                 break;
//             default:
//                 break;
//         }
//     }

//     //登録アクション
//     addArticle(){

//         //空だとreturn
//         if(this.state.article_title == '' && this.state.article_content == ''){
//             return;
//         }

//         $.ajax({
//             url: '/api/add',
//             type:'POST',
//             data : {title: this.state.article_title, content: this.state.article_content },
//             timeout:3000,
//         }).then((data) => {
//             //戻り値をセット
//             this.setState({
//                 articles: data,
//                 article_title: '',
//                 article_content: ''
//             });
//         }).catch(error => {
//             console.log(error);
//         });
//     }
    
//     //削除
//     deleteArticle(article){
//         $.ajax({
//             url: '/api/del',
//             type:'POST',
//             data : {id: article.id},
//             timeout:3000,
//         }).then((data) => {
//             this.setState({
//                 articles: data,
//             });
//         }).catch(error => {
//             console.log(error);
//         });
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="form-group mt-4">
//                    <label htmlFor="article_title">タイトル</label>
//                    <input type="text" className="form-control" name="article_title" value={this.state.article_title} onChange={this.inputChange}/>
//                    <label htmlFor="article_content">記事</label>
//                    <input type="text" className="form-control" style={{height:"300px"}} name="article_content" value={this.state.article_content} onChange={this.inputChange}/>
//                 </div>
//                 <button className="btn btn-primary" onClick={this.addArticle}>登録</button>
                
//                 <table className="table mt-5">
//                     <thead>
//                         <tr>
//                             <th>日付</th>
//                             <th>タイトル</th>
//                             <th>内容</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <RenderRows
//                             articles={this.state.articles}
//                             deleteArticle={this.deleteArticle}
//                         />
//                     </tbody>
//                 </table>
//             </React.Fragment>
//         );
//     }
// }

// ReactDOM.render(<Article />, document.getElementById('article'));
