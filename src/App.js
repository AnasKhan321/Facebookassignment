import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
function App() {


  const responseFacebook = async(response) => {
    console.log(response);

    const accessToken = response.accessToken;
    const userId = response.userID;

    // Fetch the list of pages managed by the user
    const pagesResponse = await axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`);
    console.log(pagesResponse)

  };

  return (
    <div className="font-bold text-xl text-center">
        <FacebookLogin
                appId="404300378686310" // Replace with your app ID
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
