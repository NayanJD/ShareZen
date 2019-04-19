import React from 'react';
import ReactDOM from 'react-dom';

export default class Carousel extends React.Component{
    render(){
        return(
            <>
            <div className='row mt-5' >
                <div className='col-sm-3 col-md-3 ml-4 ml-md-auto mr-md-auto'>
                    <div id="carouselExampleControls" className="carousel slide rounded" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="card" style={{width: '18rem'}}>
                                    <img className="card-img-top" src="./images/explore.jpg" alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Explore</h5>
                                        <p className="card-text">Find people around you with your vibe, Know latest trend going on around you.</p>
                                        <a href="#" className="btn btn-primary-warning bg-dark">Know More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card" style={{width: '18rem'}}>
                                    <img className="card-img-top" src="./images/people.jpg" alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Connect</h5>
                                            <p className="card-text">Discover new people and connect with them to share your best moments.</p>
                                            <a href="#" class="btn btn-outline-warning bg-dark">Know More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card" style={{width: '18rem'}}>
                                    <img className="card-img-top" src="./images/share.jpg" alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Share</h5>
                                        <p className="card-text">Share your creations to the world at the same time keeping tabs on your peer's work.</p>
                                        <a href="#" className="btn btn-outline-warning bg-dark">Know More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev d-md-flex d-none" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next d-md-flex d-none" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>

            </>
        );
    }
}