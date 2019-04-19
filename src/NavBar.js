import React from 'react';
import ReactDOM from 'react-dom';

import LoginPage from './LoginPage.js';
import MainPage from './index.js';
import Profile from './Profile.js';
import Amplify,{ Auth } from 'aws-amplify';



export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);

        let homeactive='',uploadactive='',profileactive='';

        if(this.props.active==='home'){
            homeactive='text-light';
        }else if(this.props.active==='upload'){
            uploadactive='text-light';
        }else if(this.props.active==='profile'){
            profileactive='text-light';
        }

        this.state = {
            username: '',
            isAuth: false,
            homeactive : homeactive,
            uploadactive : uploadactive,
            profileactive : profileactive
        }

        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
                }).then(user => {
                    // console.log(user);
                    this.setState({
                        isAuth : true,
                        username: user.attributes.preferred_username
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        isAuth : false,
                        username:''
                    });
                });
    }
    
    loginButton(){
        return(
            <li className="nav-item mt-md-0 mt-sm-3">
                <button type="button" className="btn btn-outline-light" onClick={this.handleClick}>Login In</button>
            </li>
        );
    }

    logoutButton(){
        return(
            <>
                                <li class="nav-item mt-2">
                                    <li className="dropdown profile">
                                        <img className="rounded-circle d-inline" src="./images/profile.jpg" height="30px" width="30px" />
                                            <a className="nav-link dropdown-toggle text-dark d-inline" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                                                {this.state.username}
                                                {/* jennifer9292 */}
                                            </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#" onClick={this.goProfile}>Profile</a>
                                            <a className="dropdown-item" href="#">Settings</a>
                                            <a className="dropdown-item" href="#">Privacy</a>
                                        </div>
                                    </li>
                                </li>
                                
                                
                                <li className="nav-item ml-2">
                                    <button type="button" className="btn btn-outline-dark" onClick={this.handleLogOut}>Log out</button>
                                </li>
            </>
        );
    }

    handleLogOut(){
        
        Auth.signOut()
            .then(data => {
                console.log(data);
                // ReactDOM.render(<MainPage />,document.getElementById('page'));
                this.setState({
                    username: '',
                    isAuth : false
                })
            })
            .catch(err => console.log(err));
    }
   
    handleClick(){
        ReactDOM.render(<LoginPage />,document.getElementById('page'));
    }

    dropdownAuth(){
        return(
            <>
            <a class="nav-link" href="#">Logged in as {this.state.username}</a>
            <button class='btn btn-sm  ml-auto' onClick={this.handleLogOut}>Log out</button> 
            </>
        );
    }

    dropdownUnauth(){
        return(<button class='mt-2 btn btn-block' onClick={this.handleClick}>Log in</button>);
    }
    
    goHome(){
        ReactDOM.render(<MainPage />,document.getElementById('page'));
    }
    
    goProfile(){
        ReactDOM.render(<Profile />,document.getElementById('page'));
    }
    render(){

        let logInfo,dropdownLoginfo;
        if(this.state.isAuth){
            logInfo = this.logoutButton();
            dropdownLoginfo = this.dropdownAuth();
        }else{
            logInfo =this.loginButton();
            dropdownLoginfo = this.dropdownUnauth();
        }

        let profilenav='';
        if(this.props.active==='profile'){
            profilenav= (<li class="nav-item">
                <a class={"nav-link "+this.state.profileactive} href="#" >Profile</a>
            </li>);
        }

        return(
            <div className='fixed-top'>
            <nav class="navbar  navbar-light  navbar-expand-md  justify-content-md-center justify-content-start   navstyle">
                <button class="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#collapsingNavbar2">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand mx-auto text-light" href="">ShareZen</a>
                

                <div class="navbar-collapse collapse justify-content-between align-items-center w-100" id="collapsingNavbar2">
                    <ul class="navbar-nav mx-auto text-md-center text-left">
                        <li class="nav-item d-flex d-md-none">
                            {dropdownLoginfo}
                        </li>
                        <li class="nav-item">
                            <a class={"nav-link "+this.state.homeactive} href="#" onClick={this.goHome}>Home</a> 
                        </li>
                        <li class="nav-item">
                            <a class={"nav-link "+this.state.uploadactive} href="#" >Upload</a>
                        </li>
                        {profilenav}
                        {/* <li class="nav-item my-auto">
                            <a class="nav-link navbar-brand mx-0 d-none d-md-inline" href="">Brand</a>
                        </li> */}
                        
                    </ul>
                    <ul class="navbar-nav mx-auto text-md-center text-left d-flex d-md-none">
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={this.goProfile}>Profile</a> 
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Settings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Privacy</a>
                        </li>
                        {/* <li class="nav-item my-auto">
                            <a class="nav-link navbar-brand mx-0 d-none d-md-inline" href="">Brand</a>
                        </li> */}
                        
                    </ul>
                    <ul class="nav navbar-nav d-none d-md-flex" id='collapsingNavbar2'>
                        {logInfo}
                        
                    
                    </ul>
                </div>
            </nav>
        </div>
        );

    }
}