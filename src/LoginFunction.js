import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage.js';

export default class LoginFunction extends React.Component{
    
    constructor(props){
        super(props);
        this.handleClick.bind(this);
    }
    handleClick(){
        ReactDOM.render(<LoginPage />,document.getElementById('page'));
    }

    render(){
        return(
            <li className="nav-item">
                      <button type="button" className="btn btn-outline-primary" onClick={this.handleClick}>Login In</button>
            </li>
        )
    }
}