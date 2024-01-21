import React from 'react';
import './App.css';
import { HeaderLayout } from './layout/header.layout';
import { Route, Routes } from 'react-router-dom';
import { HomeComponent } from './components/home.component';
import { UploadHomeComponent } from './components/upload/home.component';
import { LearningHomeComponent } from './components/learning/home.component';

function App() {
  return (
    <div className="App">
      <HeaderLayout />
      <Routes>
        <Route path="/">
          <Route index element={<HomeComponent />} />
          <Route path="upload" element={<UploadHomeComponent />} />
          <Route path="learning" element={<LearningHomeComponent />} />
          <Route path="*" element={<div></div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
