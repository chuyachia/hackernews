import React from "react";
import axios from "axios";
import styled from 'styled-components';
import News from '../components/News';

const Container = styled.div`
    display:flex;
    flex-flow: row wrap;
    & > * {
        width:100%;
        flex: 1 1 auto;
    }
`;

const Title=styled.div`
    text-align:center;
    & > i {
        color:grey;  
    }
`;



const Newslist = styled.ul`
    list-style:none;
    padding-left:0;
    @media all and (min-width: 800px){
        padding-left:2rem;
        padding-right:2rem;
    }
`;

const Footer=styled.div`
    text-align:center;
    padding:2rem;
    & > a {
        color: inherit;
        text-decoration: underline dashed;
        text-underline-position: under;
    }
`;

const hnUrl= "https://hacker-news.firebaseio.com/v0/";
class Home extends React.Component {
    constructor(){
        super();
        this.state={
            news:[],
            error:false
        };
    }
    componentDidMount(){
        axios.get(hnUrl+'topstories.json')
        .then((results)=>{
            var promises = results.data.slice(0,10).map(function(id){
                return axios.get(hnUrl+'item/'+id+'.json');
            });
            return  axios.all(promises);
        }).then((results)=>{
            this.setState({
                news:results.map(function(r){return r.data})
            });
        })
        .catch((err)=>{
            console.log(err);
            this.setState({
                error:true
            });
        });
    }
    render(){
        return(
         <Container>
             <Title>
                 <h3>Top 10 Hacker News Stories</h3>
                 <i>With top 20 comments and their replies</i>
             </Title>
             {this.state.error?(<Title>Oops, something went wrong... I can't fetch the news.</Title>)
             :(<Newslist>
             {this.state.news.map((n,i)=>(<News key={i} data ={n}/>))}
             </Newslist>)
             }
             <Footer>Made by <a href="https://github.com/chuyachia" target="_blank">Chu-Ya Chia</a></Footer>
        </Container>);
    }
}


export default Home;
