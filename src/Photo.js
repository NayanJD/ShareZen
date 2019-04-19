import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './NavBar.js';
import MainPage from './index.js';

import Amplify from 'aws-amplify';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 
import {Auth,Storage} from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';

export default class UploaderWrapper extends React.Component{
    constructor(props){
        super(props);
        this.buttonHandler = this.buttonHandler.bind(this);

        this.state={
            location:'a'
        }
    }

    buttonHandler(){
        this.setState({
            location:'b'
        })
    }

    render(){
        return(
            <>
            <PhotoUploader />
            {/* <button class='btn btn-primary' onClick={this.buttonHandler}>Change</button> */}
            </>
        );
    }
}
class PhotoUploader extends React.Component{
        constructor(props){
            super(props);
            this.uploadHandlerTemp = this.uploadHandlerTemp.bind(this);
            this.cropperHandler = this.cropperHandler.bind(this);
            this.uploadHandler = this.uploadHandler.bind(this);

            this.state = {
                cropper : null,
                data : 'javascript:void(0);',
                s3data : '',
                body : '',
                isAuth: false,
                username : '',
                location: this.props.location,
                filename: '',
                email: ''
            };

        
            // Amplify.configure({
            //     Auth: {
    
            //         identityPoolId: 'ap-south-1:89c2f7d3-9f4b-45d7-8a64-0835493d2092',
            //         region: 'ap-south-1',
            //         userPoolId: 'ap-south-1_fCM8WcBtY',
            //         userPoolWebClientId: '11bjg2ouje7ce85qi0gklj1pvk',
            //         mandatorySignIn: true,
            //     },
                
            // });

            Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
                    }).then(user => {
                        console.log(user);
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
    
            // You can get the current config object
            // const currentConfig = Auth.configure();
            // var AWS = require('aws-sdk');
            // Auth.signIn('dastms@gmail.com','Formula12#').then(user => {
            //     // console.log(user);
                
            //     // Auth.currentCredentials()
            //     //     .then(credentials=>{
            //     //         var s3 = new AWS.S3({
            //     //             apiVersion: '2006-03-01',
            //     //             credentials: Auth.essentialCredentials(credentials)
            //     //         });
            //     //         var params = {Bucket: 'aloochowkha', Key: 'profile.jpg', Expires: 60};
            //     //         var url = s3.getSignedUrl('getObject', params);
            //     //         console.log("get URL is", url);
            //     //         this.setState({
            //     //             s3data : url
            //     //         })
            //     //     });
                
            // });
                
        }

        cropperHandler(){
            let AWS =require('aws-sdk');
            let data = 'javascript:void(0);';
            let cropper = this.state.cropper;
            if(this.state.cropper){
                cropper.getCroppedCanvas().toBlob((blob)=>{
                    // console.log(blob);
                    
            Auth.currentCredentials()
                    .then(credentials=>{
                        var s3 = new AWS.S3({
                            apiVersion: '2006-03-01',
                            credentials: Auth.essentialCredentials(credentials)
                        });
                        var params = {
                            Bucket: 'automationtemp9x78rt4', 
                            Key: this.state.filename, 
                            Body: blob,
                            ACL: 'public-read'
                        };
                        s3.upload(params,(err,data)=>{
                            if(data){
                                console.log(data);
                                
                                this.setState({
                                    location: data.Location,
                                    body: blob
                                })
                                ReactDOM.render(<PhotoUploader location={data.Location}/>,document.getElementById('page'));
                            }else{
                                console.log(err);
                            }
                        })
                    });
                });
            }else{
                // return;
            }

            // Auth.currentCredentials()
            //         .then(credentials=>{
            //             var s3 = new AWS.S3({
            //                 apiVersion: '2006-03-01',
            //                 credentials: Auth.essentialCredentials(credentials)
            //             });
            //             var params = {
            //                 Bucket: 'aloochowkha', 
            //                 Prefix: 'newprofile.jpg', 
                            
            //             };
            //             s3.listObjectVersions(params, function(err, data) {
            //                 if (err) console.log(err, err.stack); // an error occurred
            //                 else     console.log(data); 
            //             });
            //         });
            
            // console.log(data);
            
        }

        uploadHandlerTemp(){

            var date = new Date();
            var timestamp = date.getTime();
            let fileinput = document.getElementById('inputfile').files;

            if (!fileinput.length)
                return
            let file = fileinput[0];
            let filename = file.name.substring(0,file.name.indexOf('.')) 
                        + timestamp 
                        + file.name.substring(file.name.indexOf('.'),file.name.length);
            
            console.log(filename);
            // console.log(fileinput.length+" "+ filename);
            // console.log(file);

            this.setState({
                filename: filename
            });
            let AWS =require('aws-sdk');
            Auth.currentCredentials()
                    .then(credentials=>{
                        var s3 = new AWS.S3({
                            apiVersion: '2006-03-01',
                            credentials: Auth.essentialCredentials(credentials)
                        });
                        

                        var bucketparams = {
                            Bucket: 'automationtemp9x78rt4', 
                            Key: filename, 
                            Body: file,
                            ACL: 'public-read'
                        };



                        s3.upload(bucketparams,(err,data)=>{
                            if(data){
                                // console.log(data);
                                this.setState({
                                    location: data.Location,
                                    body:file
                                })
                            }else{
                                console.log(err);
                            }
                        })
                    });
        }

        uploadHandler(){

            let AWS =require('aws-sdk');
            console.log(this.state.filename);
            Auth.currentCredentials()
                    .then(credentials=>{
                        var s3 = new AWS.S3({
                            apiVersion: '2006-03-01',
                            credentials: Auth.essentialCredentials(credentials)
                        });
                        var params = {
                            Bucket: 'automation9x78rt4', 
                            Key: this.state.filename, 
                            Body: this.state.body,
                            ACL: 'public-read'
                        };
                        s3.upload(params,(err,data)=>{
                            if(data){
                                console.log(data);
                                document.querySelector('.modalbutton').click();
                                this.setState({
                                    location: data.Location
                                });

                                var lambda= new AWS.Lambda({region: 'ap-south-1', 
                                    apiVersion: '2015-03-31',
                                    credentials: Auth.essentialCredentials(credentials)
                                    });


                                var lambdaparams = {
                                    FunctionName : 'AutomationNewPosts',
                                    InvocationType : 'RequestResponse',
                                    LogType : 'None',
                                    Payload : `{"postid":"${data.key}","email":"${this.state.email}"}`
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

        homePage(){
            document.querySelector('.homepage').click();
            ReactDOM.render(<MainPage />,document.getElementById('page'));
        }

        uploadNew(){
            document.querySelector('.homepage').click();
            ReactDOM.render(<PhotoUploader />,document.getElementById('page'));
        }
        _crop(){
          // image in dataUrl
        //   console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
            this.setState({
                cropper : this.refs.cropper
            })
        }
       
        render() {
            // console.log(this.state.location);
          return (
            <>
                
                <NavBar />
                <div class='row my-2'>
                
                    <div class='col-md-5 mx-auto'>
                    <div class='row form-inline'>
                    <div class="col-md col-sm-12">
                        <span class='text-muted'><h4>Upload Your File</h4></span>
                    </div>
                    <div class='col-md col-sm-12'>
                        <input type="file" class="form-control-file bg-dark btn btn-outline-warning uploadbtn" onChange={this.uploadHandlerTemp} id="inputfile" />
                    </div>
                    {/* <div class="col-md-1 col-sm-12">
                        <button class="btn btn-outline-warning" onClick={this.uploadHandler}>Upload</button>
                    </div> */}
                    </div>
                    </div>
                </div>
              <div class='row'>
                <div class='col-md-5 mx-auto border'>
                    <Cropper
                    ref='cropper'
                    src={this.state.location}
                    style={{height: '300px', width: '100%'}}
                    // Cropper.js options
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={this._crop.bind(this)} />
                </div>
              </div>

              <div class='row mt-2'>
                <div class='col-md-5 mx-auto'>
                <div class='row'>
                <div class='col-6 col-md-6 text-center'>
                    <button class='btn btn-primary btn-lg btn-block crop' onClick={this.cropperHandler} data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Crop</button>
                </div>
                <div class='col-6 col-md-6 text-center'>
                    <button class='btn btn-danger btn-lg btn-block' onClick={this.uploadHandler}>Upload</button>
                </div>
                {/* <div class='col-md-2 mx-auto'>
                    <a class='btn btn-danger' id='download' href={this.state.data}>Download</a>
                </div> */}
                </div>
                </div>
                </div>
                {/* <div class='row'>
                    <div class='col-md-9 mx-auto'>
                        <img src={this.state.location} style={{height: '300px', width: '100%'}}></img>
                    </div>
                </div> */}
                <button type="button" class="btn btn-primary d-none modalbutton" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>


                <div class="modal fade" id="exampleModal" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-show='true'>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Successfull.</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* <div class="modal-body">
                        ...
                    </div> */}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary homepage d-none" data-dismiss="modal" >back</button>
                        <button type="button" class="btn btn-secondary " onClick={this.homePage} >Go to home page</button>
                        <button type="button" class="btn btn-primary" onClick={this.uploadNew}>Upload New Image</button>
                    </div>
                    </div>
                </div>
                </div>
                </>

                
          );
        }
      
}

// export default PhotoUploader;
