import React from 'react'
import ReactDOM from 'react-dom'
import { timingSafeEqual } from 'crypto';
import ResendCodePage from './ResendCode.js'
import MainPage from './index.js'
// import AWS from './aws-sdk.min.js';

import {AWS,AWSRegion,AWSConfig,CognitoIdentityCredentials} from 'aws-sdk';
import {DynamoDB} from 'aws-sdk/clients/dynamodb';
import {CognitoUserPool,CognitoUser,AuthenticationDetails} from 'amazon-cognito-identity-js';
import Amplify,{Auth} from 'aws-amplify';









