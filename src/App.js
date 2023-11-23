import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () => {
  const [progress, setProgress] = useState(0);

  const apiKey = '9180273d9b564bb3b4b437b702785a4a'

  return (
    <>
      <Router>
        <Navbar />

        <LoadingBar
          height={4}
          color='#0069d9'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />

        <Routes>

          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="in" category="general" />} />

          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} country="in" category="business" />} />

          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={6} country="in" category="entertainment" />} />

          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="in" category="general" />} />

          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} country="in" category="health" />} />

          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} country="in" category="science" />} />

          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} country="in" category="sports" />} />

          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} country="in" category="technology" />} />

        </Routes>

      </Router>
    </>
  )
}

export default App;
