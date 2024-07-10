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

    console.log(pagesResponse)
  };

  const handlePageSelect = async (e) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);

    const accessToken = userData.accessToken;
    const insightsResponse = await axios.get(`https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_reactions_total&since=LAST_30_DAYS&until=TODAY&period=day&access_token=EAAFvtYR0Q2YBO3625S3l0mbcL3KyRc5A8iIWZBbwzhpbOTMMIwgLbgGtZCPVmiaDButPv2BZC7ip9A36gc4cEXTiDDgZCMn76tEeypGL4jaxAaW0ATeRM6hbOICn0siZCutforBgyOgt6aB5C4ZCZABSB299rEsWvhW92m2Mx3SvZBizzMc59BebDGFFuMClqtfyHtP9xjJdO7UKokBU7YEDhEZAyoD3T078FZAyraXwCPS39ISRTNw9LLN2ndjwQy2Ks9kCodVgZDZD`);
    setInsights(insightsResponse.data.data);
   
  };

  const logout = ()=>{
    setUserData(null);
    setPages([]);
    setSelectedPage(null);
    setInsights(null);
  }

  return (
    <div className="flex flex-col justify-center items-center " >
      {!userData ? (
        <FacebookLoginComponent onLogin={handleLogin} />
      ) : (
        <div>
          <h2 className="font-bold text-2xl my-5" >Welcome, {userData.name}</h2>
          <img src={userData.picture.data.url} alt="Profile" className="mx-auto my-4" />
          
          <h3 className="font-bold text-lg my-2 " >Select a Page</h3>
          <select onChange={handlePageSelect}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            <option value="">Select a page</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>{page.name}</option>
            ))}
          </select>
        </div>
      )}

      {userData && 
      
      


         <button onClick={logout}  className=" mt-4 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
         }


      {insights && (
        <div>
          <h3>Page Insights</h3>
          <div  className="card shadow-xl px-6 py-4 my-5  border-2  "   >Total Followers: {insights[0].values[0].value}</div>
          <div  className="card shadow-xl px-6 py-4 my-5  border-2  "  >Total Engagement: {insights[1].values[0].value}</div>
          <div className="card shadow-xl px-6 py-4 my-5  border-2  "   >Total Impressions: {insights[2].values[0].value}</div>
          <div  className="card shadow-xl px-6 py-4 my-5  border-2  "  >Total Reactions: {insights[3].values[0].value}</div>
        </div>
      )}


    </div>
  );
};

export default App;
