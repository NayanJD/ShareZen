import React from 'react';
import ReactDOM from 'react-dom';

import LikeToggler from './LikeToggler.js';


export default class Image extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prefix:'https://s3.ap-south-1.amazonaws.com/automation9x78rt4/'
        };
    }

    render(){
        return(
            <div className={'row mt-2 ' + 'delete'+ this.props.id}>
                <div className='col-12 col-md-5 mx-auto'>
                    <div className='row'>
                    <div className='col-12 col-md-9 mx-auto'>
                    <div className="card ">
                        <img className="card-img-top" src={this.state.prefix + this.props.src} alt="Card image cap"/>
                        <div className="card-body">
                            {/* <h5 className="card-title">Explore</h5>
                            <p className="card-text">Find people around you with your vibe, Know latest trend going on around you.</p>
                            <a href="#" className="btn btn-primary-warning bg-dark">Know More</a> */}
                            <LikeToggler id={this.props.id} 
                                email={this.props.email} 
                                postid={this.props.src} 
                                deleteHandler={this.props.deleteHandler}/>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}