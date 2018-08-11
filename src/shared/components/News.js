import React from "react";
import axios from "axios";
import styled , { keyframes } from 'styled-components';
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
        flex: 0 1 100%;
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

const Title = styled.span`
    font-family: 'Montserrat';
    @media all and (min-width: 800px){
        flex: 0 1 auto;
    }
    &  a {
        color: inherit;
        text-decoration: inherit;
    }
`;

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
    border: 16px solid lightgrey;
    border-top: 16px solid grey; 
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    animation: ${rotate} 2s linear infinite;
`;

const Sup = styled.sup`
    line-height: 0;
    font-size: 0.6rem;
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
                results = results.filter(r=>!r.data.deleted);
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
                {<Title>
                {this.props.data.title}&nbsp;
                <Sup><a href={this.props.data.url} target="_blank"  title="Open link"><i class="fas fa-external-link-alt"></i></a></Sup>
                </Title>}
                {<Author>&nbsp;by&nbsp;{this.props.data.by}</Author>}
                {<ShowHide id="showhide" onClick={()=>this.showComments()}>
                {this.state.showcomments?<i title="Hide comments" class="fas fa-sort-up"></i>
                :<i title="Show comments" class="fas fa-sort-down"></i>}</ShowHide>}
                {<UnstyledUl visible={this.state.showcomments} onClick={()=>this.showComments()}>
                        {this.props.data.kids?(this.state.comments?this.state.comments:<Loader/>):<li>No comment to show...</li>}
                </UnstyledUl>}
            </Newsitem>
            );
    }
}

export default News;