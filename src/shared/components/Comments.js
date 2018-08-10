import React from "react";
import axios from "axios";
import styled from 'styled-components';

const UnstyledUl = styled.ul`
    list-style:none;
    margin: 0;
    padding: 0;
`;

const Author=styled.li`
    color:grey;
`;

const Comment = styled.div`
    border-left:1px dotted grey;
    padding-left:1rem;
    margin: 1rem
`;

const hnUrl= "https://hacker-news.firebaseio.com/v0/";
class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state={
            replies:[]
        };
    }
    componentDidMount(){
        if(this.props.data.kids&&this.state.replies.length==0){
            var promises = this.props.data.kids.map(function(id){
                return axios.get(hnUrl+'item/'+id+'.json');
            });
            axios.all(promises)
            .then((results)=>{
                results = results.slice(0,21);
                this.setState({
                    replies :results.map(function(c,i){return <Comments key={i} data={c.data}/>})
                });
            });
        }
    }
    render(){
        return(
            <Comment>
                <Author>{this.props.data.by}&nbsp;said</Author>
                <li dangerouslySetInnerHTML={{__html: this.props.data.text}}></li>
                {this.props.data.kids&&
                <UnstyledUl>
                    {this.state.replies}
                </UnstyledUl>
                }
            </Comment>
         );
    }
}

export default Comments;