import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  // asta e varianta mai scurta, eleganta, lizibila

const context = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// const Navigation = (props) => {
//   // asta e varianta mai putin frumoasa, dar mai evidenta
//   return (
//     <AuthContext.Consumer>
//       {(context) => {
//         return (
//           <nav className={classes.nav}>
//             <ul>
//               {context.isLoggedIn && (
//                 <li>
//                   <a href="/">Users</a>
//                 </li>
//               )}
//               {context.isLoggedIn && (
//                 <li>
//                   <a href="/">Admin</a>
//                 </li>
//               )}
//               {context.isLoggedIn && (
//                 <li>
//                   <button onClick={props.onLogout}>Logout</button>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         );
//       }}
//     </AuthContext.Consumer>
//   );
// };

export default Navigation;
