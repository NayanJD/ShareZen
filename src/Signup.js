import React from 'react';
import ReactDOM from 'react-dom';
import Amplify,{Auth} from 'aws-amplify';
import ResendCodePage from './ResendCodePage.js';
import './bootstrap.min.css';



export default class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            phonenumber : '',
            username : '',
            password : '',
            isEmailValid : '',
            formattedph : '',
            isPhoneValid : '',
            isUserNameValid : '',
            passwordErrors : <span></span>,
            isPasswordValid : false,
            isEverythingOkay : false,
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.emailChecker = this.emailChecker.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);
        this.usernameHandler = this.usernameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.formValidityChecker = this.formValidityChecker.bind(this);
        this.onSignUp = this.onSignUp.bind(this);

    }

    emailHandler(e){
        this.setState({
            email : e.target.value
        });
    }

    emailChecker(){
        // console.log('Checking');

        document.querySelector('.emailhelper').classList.add('d-none');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
        {
        //   console.log("Valid email");
          this.setState({
              isEmailValid : 'is-valid'
          });
        

        }else{
          //   alert("You have entered an invalid email address!")
          //console.log("Invalid email");
          this.setState({
              isEmailValid : 'is-invalid'
          });
        }
    }

    phoneHandler(e){

        let value = e.target.value;
        let unformat = value.replace('-','');
        unformat = unformat.replace(' ','');
        
        
        if(/\+\d{12}$/.test(unformat)){
            // console.log("valid phone number");
            this.setState({
                isPhoneValid : 'is-valid'
            })
        }else{
            // console.log("invalid phone number");
            this.setState({
                isPhoneValid : 'is-invalid'
            })

        }

        this.setState({
            phonenumber : unformat,
        });
    }

    phoneNumberFormatter(value){

        let formatted;
        if(value.length>9 && !value.includes(' ')){
            formatted = value.substring(0,9) + " " + value.substring(9,value.length);
        }else if(value.length>3 && !value.includes('-')){
            formatted = value.substring(0,3) + "-" + value.substring(3,value.length);
        }else{
            formatted = value;
        } 

        return formatted;
    }

    usernameHandler(e){
        let value = e.target.value;

        if(/\w+$/.test(value)){
            // console.log('valid username');
            this.setState({
                isUserNameValid : 'is-valid'
            })
        }else{
            // console.log('invalid username');
            this.setState({
                isUserNameValid : 'is-invalid'
            })
        }

        this.setState({
            username : value
        })
    }

    passwordHandler(e){
        let value = e.target.value;
        let errorFlag = true;

        let upperErrors=<span key="upperempty" className="d-none"></span>;
        let lowerErrors=<span key="lowerempty" className="d-none"></span>;
        let digitsErrors=<span key="digitsempty" className="d-none"></span>;
        let specialErrors=<span key="specialempty" className="d-none"></span>;
        let spaceErrors=<span key="spaceempty" className="d-none"></span>;
        let lengthErrors=<span key="lengthempty" className="d-none"></span>


        if(/[A-Z]+/.test(value)){
            // console.log("Has UpperCase");
            
        }else{
        // errors.concat([<small class='text-danger'>Password should contain one Uppercase</small>]);
            upperErrors = <div key="uppererror"><small  className='text-danger'>Password should contain one Uppercase letter.</small></div>;
            errorFlag = false;
        }

        if(/[a-z]+/.test(value)){
            // console.log("Has Lowercase");
        }else{
            lowerErrors = <div key="lowererror"><small  className='text-danger'>Password should contain one Lowercase letter</small></div>;
            errorFlag = false;
        }

        if(/\d+/.test(value)){
            // console.log("Has Digits");
        }else{
            digitsErrors = <div key="digitserror"><small  className='text-danger'>Password should contain one Digit</small></div>;
            errorFlag = false;
        }

        if(/([!@#$%^*()<>/{}\+\[\]\-_=])+/.test(value)){
            // console.log("Has Special Characters");
        }else{
            specialErrors = <div key="specialerror"><small  className='text-danger'>Password should contain one special Character</small></div>;
            errorFlag = false;
        }

        if(!/\s+/.test(value)){
            
            // console.log("Doesn't Contain Space")
        }else{
            spaceErrors = <div key="spaceerror"><small  className='text-danger'>Password should not contain White Space.</small></div>;
            errorFlag = false;
        }

        if(value.length<8){
            lengthErrors = <div key="lengtherror"><small  className='text-danger'>Password length should be greater than 8.</small></div>
            errorFlag = false;
        }
        // console.log(errors);

        if(errorFlag){
            this.setState({
                password : value,
                passwordErrors : <div><small className='text-success'>Looks Good</small></div>,
                isPasswordValid : 'is-valid'
            });
        }else{
            this.setState({
                password : value,
                passwordErrors : [upperErrors,lowerErrors,digitsErrors,specialErrors,spaceErrors,lengthErrors],
                isPasswordValid : 'is-invalid'
            });
        }   
    }

    formValidityChecker(){
        let email = this.state.isEmailValid;
        let phonenumber = this.state.isPhoneValid;
        let username = this.state.isUserNameValid;
        let password = this.state.isPasswordValid;

        if(email==='is-valid' && phonenumber==='is-valid' && username==='is-valid' && password==='is-valid'){
            // console.log("Everything Valid");
            this.setState({
                isEverythingOkay :true
            });
            return;
        }

        if(email!=='is-valid'){
            this.setState({
                isEmailValid : 'is-invalid'
            });
        }

        if(phonenumber!=='is-valid'){
            this.setState({
                isPhoneValid : 'is-invalid'
            });
        }

        if(username!=='is-valid'){
            this.setState({
                isUserNameValid : 'is-invalid'
            });
        }

        if(password!=='is-valid'){
            this.setState({
                isPasswordValid : 'is-invalid'
            });
        }

        this.setState({
            isEverythingOkay : false
        });
    }

    onSignUp(){
        // ReactDOM.render(<ResendCodePage email={this.state.email}/>,document.getElementById('page'));
        // return;

        this.formValidityChecker();

        // if(this.state.isEverythingOkay){
        //     console.log('Everything okay');
        // }else{
        //     console.log('Something\'s wrong');
        // }
        if(!this.state.isEverythingOkay){
            console.log('Something is not right');
            return;
        }

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

        let email = this.state.email;
        let phonenumber = this.state.phonenumber;
        let username = this.state.username;
        let password = this.state.password;
        // let email = 'nayanjdas@yahoo.com';
        // let password = 'Formula12#';
        // let username = 'nayan88';
        // let phonenumber = '+918473954673'

        Auth.signUp({
            // 'email': email,
            'password' :password,   
            'username' : email,
            // 'phone_number' : phonenumber
            //validationData: []  //optional
            'attributes' :{
                // 'email' : username,
                'phone_number' : phonenumber,
                 'preferred_username' : username
            }
            })
            .then(data => {
                console.log(data);
                ReactDOM.render(<ResendCodePage username={username} password={password} email={this.state.email}/>,document.getElementById('page'));
            })
            .catch(err => console.log(err));
        
        // // After retrieving the confirmation code from the user
        // Auth.confirmSignUp(username, code, {
        //     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        //     forceAliasCreation: true    
        // }).then(data => console.log(data))
        //   .catch(err => console.log(err));
        
        // Auth.resendSignUp(username).then(() => {
        //     console.log('code resent successfully');
        // }).catch(e => {
        //     console.log(e);
        // });
        
    }
    render(){
        let email = this.state.email;
        let phonenumber = this.state.phonenumber;
        let username = this.state.username;
        let password = this.state.password;

        console.log(email+ " " + phonenumber + " " + username + " " + password);

        let inputClass = "form-control " + this.state.isEmailValid;
        let phoneclass = "form-control " + this.state.isPhoneValid;
        let usernameclass = "form-control " + this.state.isUserNameValid;
        let passwordclass = "form-control " + this.state.isPasswordValid;
        // console.log(inputClass);
        return(
            <div className='col-md-3 mx-md-auto mx-sm-auto border-left border-right border-bottom rounded-bottom' id='signupform'>
                <form onSubmit={this.onSignUp} className='mb-1'>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className={inputClass} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={this.emailHandler} onBlur={this.emailChecker}/>
                        <small id="emailHelp" className="form-text text-muted emailhelper">We'll never share your email with anyone else.</small>
                        <div className="invalid-feedback">
                            Please enter email correctly.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="phonenumber">Phone Number</label>
                        <input type="text" className={phoneclass} id="phonenumber" placeholder="+91-79086 34586" value={this.phoneNumberFormatter(phonenumber)} onChange={this.phoneHandler}/>
                        <div className="invalid-feedback">
                            Please enter valid phone number with country code.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="text" className={usernameclass} id="username" placeholder="Nickname" value={username} onChange={this.usernameHandler}/>
                        <div className="invalid-feedback">
                            Username should be alphanumic including underscore
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className={passwordclass} id="exampleInputPassword1" placeholder="Password" value={password} onChange={this.passwordHandler}/> 
                        {this.state.passwordErrors} 
                    </div>
                    <button type="button" className="btn btn-outline-warning bg-dark uploadbtn" onClick={this.onSignUp}>Submit</button>
                    
                </form>                                
            </div>
        );
    }
}