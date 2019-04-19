import React from 'react';
import ReactDOM from 'react-dom';
import Amplify,{Auth} from 'aws-amplify';

import MainPage from './index.js';

var AWS = require('aws-sdk');

export default class ResendCodePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentUserEmail: '',
            code : ''
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.codeHandler = this.codeHandler.bind(this);
        
    }

    // componentWillMount(){
    //     Auth.currentAuthenticatedUser({
    //         bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    //     }).then(user => {
    //         console.log(user);
    //         this.setState({
    //             currentUserEmail : user.attributes.email
    //         })
    //     })
    //     .catch(err => console.log(err));
    // }
    codeHandler(e){
        let value = e.target.value;
        this.setState({
            code : value
        })
    }

    submitHandler(){
        // Amplify.configure({
        //     Auth: {
        //         identityPoolId: 'ap-south-1:89c2f7d3-9f4b-45d7-8a64-0835493d2092',
        //         region: 'ap-south-1',
        //         identityPoolRegion: 'ap-south-1',
        //         userPoolId: 'ap-south-1_fCM8WcBtY',
        //         userPoolWebClientId: '11bjg2ouje7ce85qi0gklj1pvk',
        //         mandatorySignIn: true,
        //     }
        // });

        Auth.confirmSignUp(this.props.email, this.state.code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true    
        }).then(data => {
            console.log(data);
            this.setState({
                invalidmessage: '',
            });

            Auth.signIn(this.props.email,this.props.password).then(user => {

                console.log('inside signin');
                Auth.currentCredentials()
                .then(credentials => {
                    console.log('inside credentials');
                    
                    var lambda= new AWS.Lambda({region: 'ap-south-1', 
                    apiVersion: '2015-03-31',
                    credentials: Auth.essentialCredentials(credentials)
                    });
        
        
                    var lambdaparams = {
                        FunctionName : 'AutomationNewUser',
                        InvocationType : 'RequestResponse',
                        LogType : 'None',
                        Payload : `{"username":"${this.props.username}","email":"${this.props.email}"}`
                    };
        
                    lambda.invoke(lambdaparams, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else {
                            console.log(data);
                            ReactDOM.render(<MainPage />,document.getElementById('page'));
                        }   
                    });                
                    
                })
            });  
            })
        .catch(err => {
              console.log(err);
              this.setState({
                  invalidmessage : err.message
              })
          });
    }

    render(){

        let bbarstyle = {
            zIndex: '3',
            position: 'absolute',
            left: '0px',
            bottom: '0px'
        };
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col' style={{height:15+'%'}}>

                    </div>
                </div>
                <div className='row' id="formmenu">
                    <div className='col-md-3 mx-sm-auto mx-md-auto border-top border-left border-right border-bottom rounded'>
                        

                        <div className='row mt-3 mb-2' style={{position:'relative'}}>
                            <div className='col-7 col-md-7 border border-primary bbar' style={bbarstyle}>
                            </div>
                            <div className='col-7 col-md-7 text-center text-success signin'>
                                <h5>Enter Code</h5>
                            </div>    
                        </div>
                        <div className='row mb-2'>
                            <div className='col-12 col-md-12'>
                                    <small class='text-danger'>{this.state.invalidmessage}</small>
                                    <div className="form-group"> 
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.code} onChange={this.codeHandler}/>
                                        <small>Code has been sent to {this.props.email}</small>
                                    </div>
                                                
                                    <button type="button" className="btn btn-primary" onClick={this.submitHandler}>Submit</button>
                        
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            
        );
    }
}

