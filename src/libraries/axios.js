import axios from 'axios';
import {config} from '../config/config';
import Cookies from 'js-cookie';
import _ from 'underscore'


let jwtToken='';
let auth={};

const defaultOptions = {
  baseURL: config.rootUri,
//   method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
};
// Create instance
let axios2 = axios.create(defaultOptions);
// Set the AUTH token for any request
axios2.interceptors.request.use(function (config) {

  try{
    jwtToken=Cookies.get('jwtToken');
    auth=JSON.parse(Cookies.get('auth'));
  }
  catch(e){
    jwtToken='';
    auth={}
  }

  if (!_.isUndefined(jwtToken) && !_.isUndefined(auth) && jwtToken.length!=0 && !_.isEmpty(auth) ){
    config.headers.Authorization =  jwtToken ? `Bearer ${jwtToken}` : '';
  }
  else{
    config.headers.Authorization =  `Bearer`;    
  }

  
  return config;
});


export default axios2;