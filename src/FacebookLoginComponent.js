import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ onLogin }) => {
  const responseFacebook = (response) => {
    console.log(response);
    onLogin(response);
  };

  return (
    <div>
      <FacebookLogin
        appId="404300378686310" // Replace with your app ID
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
};

export default FacebookLoginComponent;
