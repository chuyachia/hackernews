import React from "react";
import axios from "axios";
import styled from 'styled-components';
import Comments from "./Comments";

const UnstyledUl = styled.ul`
    list-style:none;
    margin: 0;
    padding: 0;
    display:${props => props.visible ? 'initial' : 'none'};
    width:100%;
`;

const Newsitem =styled.li`
    display:flex;
    flex-flow: row wrap;
    & * {
        flex: 1 1 100%;
        word-wrap:break-word;
        white-space: pre-wrap;
    }
    &:nth-child(even) {
        background-color:#d8e9f3
    }
    &:nth-child(odd) {
        background-color:#b2d3e6
    }
    padding:0.5rem;
`;

const Author = styled.span`
    color:grey;
    @media all and (min-width: 800px){
        flex: 1 1 auto; 
    }
`;

const ShowHide= styled.span`
    @media all and (min-width: 800px){
        flex: 0 1 auto;
    };
    text-align:right;
    cursor:pointer;
`;
const Title = styled.a`
    font-family: 'Montserrat';
    color: inherit;
    text-decoration: inherit;
    @media all and (min-width: 800px){
        flex: 0 1 auto;
    }
`



const hnUrl= "https://hacker-news.firebaseio.com/v0/";
class News extends React.Component {
    constructor(){
        super();
        this.state={
            comments:null,
            showcomments:false
        };
    }
    showComments(){
        if (!this.state.comments&&this.props.data.kids){
            var promises = this.props.data.kids.map(function(id){
                return axios.get(hnUrl+'item/'+id+'.json');
            });
            axios.all(promises)
            .then((results)=>{
                results = results.slice(0,21);
                this.setState({
                    comments:results.map(function(c,i){return <Comments key={i} data={c.data}/>})
                });
            });
        }
        this.setState({showcomments:this.state.showcomments?false:true});
        
    }
    render(){
        return(
            <Newsitem>
                {<Title href={this.props.data.url} target="_blank"  title="Open link">{this.props.data.title}&nbsp;</Title>}
                {<Author>by&nbsp;{this.props.data.by}</Author>}
                {<ShowHide onClick={()=>this.showComments()}>{this.state.showcomments?<i title="Hide comments" class="fas fa-sort-up"></i>
                :<i title="Show comments" class="fas fa-sort-down"></i>}</ShowHide>}
                {<UnstyledUl visible={this.state.showcomments}>
                        {this.props.data.kids?(this.state.comments?this.state.comments:<li>Wait</li>):<li>No comment to show...</li>}
                </UnstyledUl>}
            </Newsitem>
            );
    }
}

export default News;