import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        let bbarstyle = {
            zIndex: '3',
            position: 'absolute',
            left: '0px',
            bottom: '0px'
        };

        return(
            <div className='col-md-3 navstyle mx-sm-auto mx-md-auto border rounded pt-3' >
                    

                <div className='row' style={{position:'relative'}}>
                    <div className='col-5 col-md-5 border border-dark bbar' style={bbarstyle}></div>
                    <div className='col-5 col-md-5 text-center text-light signin' onClick={this.props.signinhandle}>
                        <h5>Sign in!</h5>
                    </div>
                    <div className='col-2 col-md-2 signspace'>

                    </div>
                    <div className='col-5 col-md-5 text-center text-light signup' onClick={this.props.signuphandle}>
                        <h5>Sign up!</h5>
                    </div>
                </div>
            </div>
        );
    }
}