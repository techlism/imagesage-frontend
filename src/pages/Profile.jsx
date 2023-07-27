// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const Profile = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [userMetadata, setUserMetadata] = useState(null);

//   useEffect(() => {
//     const getUserMetadata = async () => {
//       const domain = "dev-jq0f41r6txfpceni.us.auth0.com";
  
//       try {
//         const accessToken = await getAccessTokenSilently({
//           authorizationParams: {
//             audience: `https://${domain}/api/v2/`,
//             scope: "read:current_user",
//           },
//         });  
//         setUserMetadata(accessToken);
//       } catch (e) {
//         console.log(e.message);
//       }
//     };
  
//     getUserMetadata();
//   }, [getAccessTokenSilently]);

//   return (
//     isAuthenticated && (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//         <h3>User Metadata</h3>
//         {userMetadata ? (
//           <pre>{userMetadata}</pre>
//         ) : (
//           "No user metadata defined"
//         )}
//       </div>
//     )
//   );
// };

// export default Profile;