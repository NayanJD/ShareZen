import React from 'react';
import ReactDOM from 'react-dom';
import Amplify,{Auth} from 'aws-amplify';
import './bootstrap.min.css';
import MainPage from './index.js';

var AWS = require('aws-sdk');
AWS.config.region = 'ap-south-1';


export default class Signin extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email : "",
            password : "",
            emailvalidity : "",
            passwordvalidity : "",
            invalidmessage : ""
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.signinHandler = this.signinHandler.bind(this);
    }

    emailHandler(e){
        this.setState({
            email : e.target.value
        });
    }

    passwordHandler(e){
        this.setState({
            password : e.target.value
        });
    }

    signinChecker(){
        let email = this.state.email;
        let password = this.state.password;
        let errorFlag = true;

        if(email===''){
            this.setState({
                emailvalidity:"is-invalid"
            });
            errorFlag = false;
        }else{
            this.setState({
                emailvalidity:""
            });
        }

        if(password===''){
            this.setState({
                passwordvalidity : "is-invalid"
            });
            errorFlag=false;
        }else{
            this.setState({
                passwordvalidity: ""
            });
        }

        return errorFlag;
    }

    signinHandler(){

        if(!this.signinChecker()){
            console.log("Form is wrong");
            return;
        }
        let email=this.state.email;
        let password=this.state.password;
        console.log(email+" "+password);
        
            


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

        // You can get the current config object
        const currentConfig = Auth.configure();
        
        // Auth.currentSession()
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));
        Auth.signIn(email,password).then(user => {
            console.log(user);

            Auth.currentCredentials()
                .then(credentials => {
                    // const db = new AWS.DynamoDB({
                    //     apiVersion: '2012-08-10',
                    //     credentials: Auth.essentialCredentials(credentials)
                    // });

                    // var params = {
                    // };
            
                    // console.log("calling db");
                    // db.listTables(params, function(err, data) {
                    //     if(data){
                    //         console.log(data);
                    //     }else{
                    //         console.log(err);
                    //     }    
                    // });
                    this.setState({
                        invalidmessage : '',
                        emailvalidity : '',
                        passwordvalidity : ''
                    })

                    ReactDOM.render(<MainPage />,document.getElementById('page'));
                });
            // ReactDOM.render(<ResendCodePage />,document.getElementById('page'));
            
        })
        .catch(err => {
            console.log(err);
            this.setState({
                invalidmessage : err.message,
                emailvalidity : 'is-invalid',
                passwordvalidity : 'is-invalid'
            })
        });
            
        
            
            // return false;
        
    }

    render(){

        let email = this.state.email;
        let password = this.state.password;

        let emailclass = "form-control "+ this.state.emailvalidity;
        let passwordclass = "form-control " + this.state.passwordvalidity;
        // console.log(email+" "+password);
        return(
            <div className='col-md-3 mx-md-auto mx-sm-auto mx-sm-1 border-left border-right border-bottom rounded-bottom' id='signinform'>
                    <small className='text-danger'>{this.state.invalidmessage}</small>
                    <form action='#' className='mb-1'>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className={emailclass} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={this.emailHandler}/>
                                {/* <small class='invalid-feedback'>Email Cannot be empty</small> */}
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                                <input type="password" className={passwordclass} id="exampleInputPassword1" placeholder="Password" value={password} onChange={this.passwordHandler}/>
                                {/* <small class='invalid-feedback'>Password Cannot be empty</small> */}
                        </div>
                                    
                        <button type="submit" className="btn btn-outline-warning bg-dark uploadbtn" onClick={this.signinHandler}>Submit</button>
                    </form>
                            
            </div>
        );
    }
}