import React from 'react';
import ParentComponent from './Components/ParentComponent';
import { BrowserRouter as Router} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore,faUserCircle , faUpload , faImage,faSearch, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faStore,faUserCircle , faUpload, faImage,faSearch, faSignOutAlt, faBars)
function App() {
  return (
    <div className="App" style={{height: "100%"}}>
      <Router>
      <ParentComponent/>
      </Router>
      
    </div>
  );
}

export default App;
