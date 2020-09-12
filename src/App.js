import React from 'react';
import ParentComponent from './Components/ParentComponent';
import { BrowserRouter as Router} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <ParentComponent/>
      </Router>
      
    </div>
  );
}

export default App;
