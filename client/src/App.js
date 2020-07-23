import React from 'react';
import './App.scss';

import TopNav from './components/layout/TopNav';

const App = () => {
  return (
    <div>
		<TopNav />
		<div className="container">
        	<h1>Hello From Taskmanager</h1>
      	</div>
    </div>
  );
}

export default App;
