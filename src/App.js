import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
function App() {


  const responseFacebook = (response) => {
    console.log(response);

  };

  return (
    <div className="font-bold text-xl text-center">
        <FacebookLogin
                appId="440544722215575" // Replace with your app ID
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
              />
      {/* <LoginSocialFacebook
      client_id="440544722215575"  onResolve={(response)=>{console.log(response)}}
      onReject={(reject) =>{console.log(reject)}}>


   
     <FacebookLoginButton/>
     </LoginSocialFacebook> */}
    </div>
  );
}

export default App;
