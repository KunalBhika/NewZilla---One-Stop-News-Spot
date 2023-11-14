import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  state = {
    progress : 10
  }

  changeProgress = (value) => {
    this.setState({progress : value});
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          
          <LoadingBar
            height={5}
            color='#f11946'
            progress={this.state.progress}
            onLoaderFinished={() => this.changeProgress(0)}
          />

          <Routes>

            <Route path="/" element={<News setProgress={this.changeProgress} key="general" pageSize={6} country="in" category="general" />} />

            <Route path="/business" element={<News setProgress={this.changeProgress} key="business" pageSize={6} country="in" category="business" />} />

            <Route path="/entertainment" element={<News setProgress={this.changeProgress} key="entertainment" pageSize={6} country="in" category="entertainment" />} />

            <Route path="/general" element={<News setProgress={this.changeProgress} key="general" pageSize={6} country="in" category="general" />} />

            <Route path="/health" element={<News setProgress={this.changeProgress} key="health" pageSize={6} country="in" category="health" />} />

            <Route path="/science" element={<News setProgress={this.changeProgress} key="science" pageSize={6} country="in" category="science" />} />

            <Route path="/sports" element={<News setProgress={this.changeProgress} key="sports" pageSize={6} country="in" category="sports" />} />

            <Route path="/technology" element={<News setProgress={this.changeProgress} key="technology" pageSize={6} country="in" category="technology" />} />

          </Routes>

        </Router>
      </>
    )
  }
}

