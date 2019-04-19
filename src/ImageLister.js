import React from 'react';
import ReactDOM from 'react-dom';

import LikeToggler from './LikeToggler.js';
import Image from './Image.js';

import {Auth} from 'aws-amplify';

var AWS = require('aws-sdk');



export default class ImageLister extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            keys: null
        }


        // console.log(JSON.parse('[{\"0\": \"9453261555566355515.png\"}, {\"1\": \"qGSgtUB-hd-wallpapers-iron-man-31555566366809.jpg\"}]'));
        // let d = JSON.parse("[{\"0\": \"9453261555566355515.png\"}, {\"1\": \"qGSgtUB-hd-wallpapers-iron-man-31555566366809.jpg\"}]");
        // console.info(d.length);
        // d.forEach(function(obj) { console.log(obj); });
            Auth.currentCredentials()
            .then(credentials => {
                // console.log('inside credentials');
                // console.log(credentials);
                var lambda= new AWS.Lambda({region: 'ap-south-1', 
                apiVersion: '2015-03-31',
                credentials: Auth.essentialCredentials(credentials)
                });
    
    
                var lambdaparams = {
                    FunctionName : 'AutomationProfile',
                    InvocationType : 'RequestResponse',
                    LogType : 'None',
                    Payload : `{"email":"${this.props.email}"}`
                };
    
                lambda.invoke(lambdaparams, (err, data) =>{
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                        // console.log(data);
                        var s3 = new AWS.S3({
                            apiVersion: '2006-03-01',
                            credentials: Auth.essentialCredentials(credentials)
                        });
                        let temp =data.Payload.split(",");

                        this.setState({
                            keys: temp.slice(1,temp.length-1)
                        })

                        // var params = {
                        //     Bucket: 'automation9x78rt4', 
                        //     // Prefix: 'newprofile.jpg', 
                            
                        // };
                        // s3.getObject(params,(err, data) =>{
                        //     if (err) console.log(err, err.stack); // an error occurred
                        //     else{
                        //             //  console.log(data); 
                        //              let contents = data.Contents;
                        //              let names = Array(contents.length);

                        //              for(let i=0;i<contents.length;i++){
                        //                  names[i] = contents[i].Key;
                        //              }

                        //              this.setState({
                        //                  keys: names
                        //              })

                        //     }
                        // });
                    }
                });
            }
            );


        Auth.currentCredentials()
                    .then(credentials=>{
                        
                    });
    }

    deleteHandler(){
        console.log("deleted from imageslister");
    }
    render(){
        //  style={{width: '18rem'}}
        if(this.state.keys!==null)
        console.info(this.state.keys);
        // if(this.state.keys!==null)
        // this.state.keys.forEach(function(obj) { console.log(obj); });

        let imageList;
        
        if(this.state.keys){
            if(this.state.keys.length!==0)
                imageList = this.state.keys.map((value,index)=> <Image key={index} email={this.props.email} id={index} src={value} deleteHandler={this.props.deleteHandler}/>)
                // console.log(index+" "+value);
            
            // );
            // imageList=<div></div>;
            // imageList = <Image src={prefixString+this.state.keys[0]}/>
        }else{
            imageList = <div></div>;
        }

        return(
            <>
            {imageList}
            {/* <Image src={prefixString+'newprofile1555339182485.jpg'} /> */}
            <div class='row'>
                <div class='col' style={{height:'50px'}}>
                </div>
            </div>
            </>
        );
    }
}