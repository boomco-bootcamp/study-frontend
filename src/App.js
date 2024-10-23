import React from "react";
import RouterPage from "./router/RouterPage";
import {UserProvider} from "./context/UserContext";

// const CommonProvider = ({ contexts, children }) => {
//     return contexts.reduce((prev, context) => React.createElement(context, { children: prev }), children)
// }

console.log("test")

function App() {
  return (
      <UserProvider>
        <RouterPage/>
      </UserProvider>
  );
}

export default App;
