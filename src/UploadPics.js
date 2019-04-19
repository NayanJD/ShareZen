import React from 'react';
import ReactDOM from 'react-dom';
import UploaderWrapper from './Photo.js';

export default class UploadPics extends React.Component{
    constructor(props){
        super(props);

        this.buttonHandler = this.buttonHandler.bind(this);
    }

    buttonHandler(){
        ReactDOM.render(<UploaderWrapper />,document.getElementById('page'));
    }

    render(){
        return(
            <>
            <div class='row mt-3'>
                <div class='col-9 col-md-5 mx-auto text-center'>
                    <h4 class='text-muted'>You have no uploaded Pics.</h4>
                </div>
            </div>
            <div class='row mt-3'>
                <div class='col-9 col-md-5 mx-auto'>
                    <button class='btn btn-outline-warning bg-dark btn-block uploadbtn' onClick={this.buttonHandler}>Upload Now</button>
                </div>
            </div>
            </>
        );
    }
}