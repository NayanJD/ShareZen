import React from 'react';
import ReactDOM from 'react-dom';

// import PhotoUploader from './Photo.js';
//import Original from './Photo.js';

import Carousel from './Carousel.js';
import UploadPics from './UploadPics.js';
import ImageLister from './ImageLister.js';
import UploaderWrapper from './Photo.js';
import NavBar from './NavBar.js';


import './bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import Amplify,{ Auth } from 'aws-amplify';



// import Amplify, { Auth } from 'aws-amplify';
// import awsmobile from './aws-exports';
// Amplify.configure(awsmobile);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


export default class MainPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isAuth : false,
            username : '',
            hasUploadedPics : true
        }

        Amplify.configure({
            Auth: {

                // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
                identityPoolId: 'ap-south-1:89c2f7d3-9f4b-45d7-8a64-0835493d2092',
                
                // REQUIRED - Amazon Cognito Region
                region: 'ap-south-1',

                // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
                // Required only if it's different from Amazon Cognito Region
                identityPoolRegion: 'ap-south-1',

                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: 'ap-south-1_fCM8WcBtY',

                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: '11bjg2ouje7ce85qi0gklj1pvk',

                // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
                mandatorySignIn: true,

                // OPTIONAL - Configuration for cookie storage
                // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
                // cookieStorage: {
                // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
                //     domain: 'automation',
                // // OPTIONAL - Cookie path
                //     path: '/',
                // // OPTIONAL - Cookie expiration in days
                //     expires: 365,
                // // OPTIONAL - Cookie secure flag
                // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
                //     secure: true
                // },

                // OPTIONAL - customized storage object
                //storage: new MyStorage(),
                
                // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
                // authenticationFlowType: 'USER_PASSWORD_AUTH'
            }
        });

        // You can get the current config object
        const currentConfig = Auth.configure();

        Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            // console.log(user);
            this.setState({
                isAuth : true,
                username: user.attributes.preferred_username
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isAuth : false
            })
        });
    }

    
    

    
    
    handleUploadPage(){
        ReactDOM.render(<UploaderWrapper />,document.getElementById('page'));
    }

    render(){

        let logInfo,isCarousel,isBackimage,basecontent,dropdownLoginfo;
        
        if(this.state.isAuth){

            isCarousel = '';

            isBackimage = '';
            basecontent = <div class='fixed-bottom'>
            <div class='row'>
                <div class='col-6 col-md-5 d-flex justify-content-center mx-auto'>
                <button class='btn btn-outline-warning bg-dark btn-lg btn-block uploadbtn' onClick={this.handleUploadPage}>New Photo</button>
                </div>
            </div>
            
        </div>;
        }else{

            isCarousel = <Carousel />;
            isBackimage = (<div class='imgcls'>
                            <img class='imgback' src='./images/back.jpg' />
                        </div>);
            basecontent='';
        }

        //<img src="./images/search1.png" height="21px" width="30px"/>
        return(
            <>

                {isBackimage}

                <NavBar active='home'/>
                    
                {basecontent}

                {isCarousel}

            </>
        
        );
    }
}


// ReactDOM.render(<UsecasesPills />,document.getElementById('root'));
//ReactDOM.render(<LoginFunction />,document.getElementById('loginbutton'));
ReactDOM.render(<MainPage />,document.getElementById('page'));  
// ReactDOM.render(<Original />,document.getElementById('page'));
serviceWorker.register();

