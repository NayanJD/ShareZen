import React from 'react';
import ReactDOM from 'react-dom';

import Carousel from './Carousel.js';
import UploadPics from './UploadPics.js';
import ImageLister from './ImageLister.js';
import UploaderWrapper from './Photo.js';
import NavBar from './NavBar.js';


import './bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import Amplify,{ Auth } from 'aws-amplify';


var AWS = require('aws-sdk');

export default class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isAuth : false,
            username : '',
            hasUploadedPics : true,
            email:'',
            deleteEmail:'',
            deletePostid:'',
            deleteKey:''
        }

        Amplify.configure({
            Auth: {


                identityPoolId: 'ap-south-1:89c2f7d3-9f4b-45d7-8a64-0835493d2092',
                region: 'ap-south-1',
                identityPoolRegion: 'ap-south-1',
                userPoolId: 'ap-south-1_fCM8WcBtY',
                userPoolWebClientId: '11bjg2ouje7ce85qi0gklj1pvk',
                mandatorySignIn: true,
            }
        });

        // You can get the current config object
        const currentConfig = Auth.configure();

        Auth.currentAuthenticatedUser({
    bypassCache: false  
        }).then(user => {
            // console.log(user);
            this.setState({
                isAuth : true,
                username: user.attributes.preferred_username,
                email: user.attributes.email
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isAuth : false
            })
        });

        this.deleteHandler = this.deleteHandler.bind(this);
        this.yesDelete = this.yesDelete.bind(this);
        
    }

    deleteHandlerConfirm(){
        console.log(this.state.deletePostid);
        Auth.currentCredentials()
        .then(credentials=>{
            var s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                credentials: Auth.essentialCredentials(credentials)
            });
            var params = {
                Bucket: 'automation9x78rt4', 
                Key: this.state.deletePostid, 
            };
            s3.deleteObject(params,(err,data)=>{
                if(data){
                    console.log(data);
                    // document.querySelector('.modalbutton').click();

                    document.querySelector('.delete'+ this.state.deleteKey).classList.toggle('d-none');
                    var lambda= new AWS.Lambda({region: 'ap-south-1', 
                        apiVersion: '2015-03-31',
                        credentials: Auth.essentialCredentials(credentials)
                        });


                    var lambdaparams = {
                        FunctionName : 'AutomationLambda',
                        InvocationType : 'RequestResponse',
                        LogType : 'None',
                        Payload : `{"postid":"${this.state.deletePostid}","email":"${this.state.deleteEmail}","action":"delete_post"}`
                    };

                    lambda.invoke(lambdaparams, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else     console.log(data);   
                    });
                }else{
                    console.log(err);
                }
            })
        });
    }

    deleteHandler(email,postid,key){
        console.log(key);
        
        this.setState({
            deleteEmail:email,
            deletePostid: postid,
            deleteKey:key
        });
        document.querySelector('.modalbutton').click();
    }

    yesDelete(){
        document.querySelector('.homepage').click();
        this.deleteHandlerConfirm();
    }

    noDelete(){
        document.querySelector('.homepage').click();
    }
    
    handleUploadPage(){
        ReactDOM.render(<UploaderWrapper />,document.getElementById('page'));
    }

    render(){

        let logInfo,isCarousel,isBackimage,basecontent,dropdownLoginfo;
        
        if(this.state.isAuth){

            if(this.state.hasUploadedPics){
                isCarousel = <ImageLister email={this.state.email} deleteHandler={this.deleteHandler}/>;
            }else{
                isCarousel = <UploadPics />;
                
            }
        }else{

            isCarousel = <Carousel />;


        }

        //<img src="./images/search1.png" height="21px" width="30px"/>
        return(
            <>



                <NavBar active='profile'/>
                    
                {basecontent}

                {isCarousel}

                <button type="button" class="btn btn-primary d-none modalbutton" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>


                <div class="modal fade" id="exampleModal" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-show='true'>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Do you really want to delete this post?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* <div class="modal-body">
                        ...
                    </div> */}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary homepage d-none" data-dismiss="modal" >back</button>
                        <button type="button" class="btn btn-secondary " onClick={this.yesDelete} >Yes I do!</button>
                        <button type="button" class="btn btn-primary" onClick={this.noDelete}>No! Go Back.</button>
                    </div>
                    </div>
                </div>
                </div>

            </>
        
        );
    }
}

