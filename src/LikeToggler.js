import React from 'react';
import ReactDOM from 'react-dom';

import likeEmpty from './images/like_empty.png';
import likeFill from './images/like_fill.png';
import unlikeEmpty from './images/unlike_empty.png';
import unlikeFill from './images/unlike_fill.png';
import dlt from './images/delete.png';

export default class LikeToggler extends React.Component{
    constructor(props){
        super(props);
        this.likeHandler = this.likeHandler.bind(this);
        this.unlikeHandler = this.unlikeHandler.bind(this);
        

        this.state= {
            like : false,
            unlike : false,
            likeClicked:false,
            unlikeClicked:false
        }
    }

    componentDidMount() {
        window.$('.like').popover();
        window.$('.unlike').popover();
        
    }

    
    deleteHandler(){
        console.log("deleted");
    }

    likeHandler(){
        // console.log('clicked');
        if(this.state.like)
            return;

        setTimeout(()=>{
            // console.log('clicked '+ this.props.id);
            window.$('#like'+this.props.id).click();
        },1000);
        this.setState({
            like: true,
            unlike: false
        });
    }

    unlikeHandler(){

        if(this.state.unlike)
            return;

        setTimeout(()=>{
            // console.log('clicked '+ this.props.id);
            window.$('#unlike'+this.props.id).click();
        },1000);
        this.setState({
            like: false,
            unlike: true
        });
    }

    render(){

        let like,unlike;

        if(this.state.like){
            like = likeFill;
        }else{
            like = likeEmpty;
        }

        if(this.state.unlike){
            unlike = unlikeFill;
        }else{
            unlike = unlikeEmpty;
        }

        return(
            <div className='row d-flex'>
                <div className='col-2 col-md-2 like' id={'like'+this.props.id} onClick={this.likeHandler} data-container="body" data-toggle="popover" data-placement="left" data-content="Liked">
                    <img className='img-fluid' src={like} />
                </div>
                <div className='col-2 col-md-2 unlike' id={'unlike'+this.props.id} onClick={this.unlikeHandler} data-container="body" data-toggle="popover" data-placement="right" data-content="Unliked">
                    <img className='img-fluid ' src={unlike} />
                </div>
                <div className='col-2 col-md-2 ml-auto' onClick={()=> this.props.deleteHandler(this.props.email,this.props.postid,this.props.id)}>
                    <img className='img-fluid mt-3' src={dlt} />
                </div>
            </div>
        );

    }
}