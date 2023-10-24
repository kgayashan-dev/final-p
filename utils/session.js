// // session.js
// import { Cookies } from 'universal-cookie';

// const cookies = new Cookies();  

// // Function to set a user session cookie
// export function setSession(user) {
//   // Customize the cookie name and other options as needed
//   cookies.set('user_session', JSON.stringify(user), { path: '/' });
// }

// // Function to get the user session from the cookie
// export function getSession() {
//   const userSession = cookies.get('user_session');
//   return userSession ? JSON.parse(userSession) : null;
// }

// // Function to clear the user session cookie (logout)
// export function clearSession() {
//   cookies.remove('user_session', { path: '/' });
// }
