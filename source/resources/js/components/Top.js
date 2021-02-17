import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function RenderNews(props){
  return props.news.map(article =>{
    var date = new Date(article.created_at);
    var articleTime = date.toLocaleDateString();
    return(
      <li key={article.id}>
          <a className="articleLink">{articleTime} {article.title}</a>
      </li>
    );
  });
}
export default class Top extends Component {
  constructor(){
    super();
    this.state = {
      news: [],
    };
  }

  componentDidMount(){
    axios
        .get('/api/get')
        .then((res) => {
            this.setState({
                news: res.data
            });
        })
        .catch(error => {
            console.log(error)
        })
  }

  render(){
    return(
      <React.Fragment>
        <ul style={{listStyle:"none",paddingInlineStart:"0"}}>
          <RenderNews
              news={this.state.news}
          />
        </ul>
      </React.Fragment>
    )
  }
}
ReactDOM.render(<Top />,document.getElementById('news'));
