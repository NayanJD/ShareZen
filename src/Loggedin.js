import React from 'react';
import ReactDOM from 'react-dom';



export default class Loggedin extends React.Component{

    constructor(props){
        super(props);
        
    }

    
    render(){
        return(
            <>
                                <li class="nav-item mt-2">
                                    <li className="dropdown profile">
                                        <img className="rounded-circle d-inline" src="./images/profile.jpg" height="30px" width="30px" />
                                            <a className="nav-link dropdown-toggle text-dark d-inline" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                                                {this.props.username}
                                                {/* jennifer9292 */}
                                            </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Profile</a>
                                            <a className="dropdown-item" href="#">Settings</a>
                                            <a className="dropdown-item" href="#">Privacy</a>
                                        </div>
                                    </li>
                                </li>
                                
                                
                                <li className="nav-item ml-2">
                                    <button type="button" className="btn btn-outline-dark" onClick={this.props.logOut}>Log out</button>
                                </li>
            </>
        );
    }
}