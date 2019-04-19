import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './Signin.js';
import Signup from './Signup.js';
import Login from './Login.js';
import './bootstrap.min.css';


export default class LoginPage extends React.Component{

    constructor(props){
        super(props);

        // let signinoutJSX = ;
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {
            form: <Signin />,
            signinwidth : 0,
            signspacewidth : 0,
            totalspace : 0,
        };
    }


    componentDidMount(){
        // console.log(document.querySelector('.signin').offsetWidth);
        // console.log(document.querySelector('.signspace').offsetWidth);
        
        let swidth = document.querySelector('.signin').offsetWidth;
        let sswidth = document.querySelector('.signspace').offsetWidth;

        this.setState({
            signinwidth: swidth,
            signspacewidth : sswidth,
            totalspace : swidth + sswidth
        });

        // console.log(this.state);
        // this.setState({
        //     totalspace : this.state.signinwidth + this.state.signspacewidth
        // })
    }

    handleSignIn(e){
        console.log(this.state.signinwidth + " " + this.state.signspacewidth + " " + this.state.totalspace);
        
        this.setState({
            form: <Signin />
        });

        function signinslider(){
            
            let bbar = document.querySelector('.bbar');

            let initialw = document.querySelector('.bbar').style.left;

            initialw = parseInt(initialw.substring(0,initialw.indexOf('px')));

            let from;
            if(initialw === 0)
                from = 0;
            else
                from = this.state.totalspace;

            let to =  0;

            let slideri = from;

            // console.log(initialw+" "+from+" " +to);

            function stopSlider(){
                clearInterval(sliderInterval);
                // console.log('Slider Stopped');
            }

            var sliderInterval = setInterval(function(){
                // console.log(slideri);
                bbar.style.left = slideri + 'px';
                if((slideri-5)<to){
                    // slider
                    bbar.style.left = '0px';
                    slideri=from;
            
                    stopSlider();
                }
                if(from>to){
                    slideri -= 5;
                }else{
                    slideri += 5;
                }


            },1);
        
        }

        signinslider = signinslider.bind(this);
        signinslider();

        
    }

    handleSignUp(){

        let bbar = document.querySelector('.bbar');
        this.setState({
            form: <Signup />
        });

        function signupslider(){

            let from = 0;
            let to =  this.state.totalspace;

            let slideri = 0;
            // console.log(from+" "+to);
            function stopSlider(){
                clearInterval(sliderInterval);
                // console.log('Slider Stopped');
            }

            var sliderInterval = setInterval(function(){
                // console.log(from+" "+to+" "+slideri);
                bbar.style.left = slideri + 'px';
                
                // console.log(slideri);
                if((slideri+5)>to){
                    // slider
                    // slideri=to;
                    bbar.style.left = this.state.totalspace + 'px';
                    // console.log('Inside sign up, sliderstopped');
                    stopSlider();
                }
                if(from>to){
                    slideri -= 5;
                }else{
                    slideri += 5;
                }


            }.bind(this),1);
        }

        signupslider = signupslider.bind(this);
        signupslider();
    }

    render(){

        
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        
                    </div>
                </div>
                <div className='row mx-1' id="formmenu">
                    <Login signinhandle={this.handleSignIn} signuphandle={this.handleSignUp} />
                </div>
            
                <div className='row mx-1' style={{position:"relative"}} id='formcontent'>
                    {this.state.form}
                </div> 

                
            </div>
        );
    }
}