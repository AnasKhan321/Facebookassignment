// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
// import axios from 'axios';
// function App() {


//   const responseFacebook = async(response) => {
//     console.log(response);

//     const accessToken = response.accessToken;
//     const userId = response.userID;

//     // Fetch the list of pages managed by the user
//     const pagesResponse = await axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`);
//     console.log(pagesResponse)

//   };

//   return (
//     <div className="font-bold text-xl text-center">
//         <FacebookLogin
//                 appId="404300378686310" // Replace with your app ID
//                 autoLoad={true}
//                 fields="name,email,picture"
//                 callback={responseFacebook}
//               />
//       {/* <LoginSocialFacebook
//       client_id="440544722215575"  onResolve={(response)=>{console.log(response)}}
//       onReject={(reject) =>{console.log(reject)}}>


   
//      <FacebookLoginButton/>
//      </LoginSocialFacebook> */}
//     </div>
//   );
// }

// export default App;









import React, { useState } from 'react';
import FacebookLoginComponent from './FacebookLoginComponent';
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState(null);

  const handleLogin = async (response) => {
    setUserData(response);
    const accessToken = response.accessToken;
    const userId = response.userID;

    // Fetch the list of pages managed by the user
    const pagesResponse = await axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`);
    setPages(pagesResponse.data.data);
  };

  const handlePageSelect = async (e) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);

    const accessToken = userData.accessToken;
    const insightsResponse = await axios.get(`https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_reactions_total&since=LAST_30_DAYS&until=TODAY&period=day&access_token=${accessToken}`);
    setInsights(insightsResponse.data.data);
  };

  return (
    <div>
      {!userData ? (
        <FacebookLoginComponent onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Welcome, {userData.name}</h2>
          <img src={userData.picture.data.url} alt="Profile" />
          
          <h3>Select a Page</h3>
          <select onChange={handlePageSelect}>
            <option value="">Select a page</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>{page.name}</option>
            ))}
          </select>
        </div>
      )}

      {insights && (
        <div>
          <h3>Page Insights</h3>
          <div>Total Followers: {insights[0].values[0].value}</div>
          <div>Total Engagement: {insights[1].values[0].value}</div>
          <div>Total Impressions: {insights[2].values[0].value}</div>
          <div>Total Reactions: {insights[3].values[0].value}</div>
        </div>
      )}
    </div>
  );
};

export default App;
