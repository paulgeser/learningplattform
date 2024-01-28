import React from 'react';
import './App.css';
import { HeaderLayout } from './layout/header.layout';
import { Route, Routes } from 'react-router-dom';
import { HomeComponent } from './components/home.component';
import { LearningHomeComponent } from './components/learning/home.component';
import { AdminHomeComponent } from './components/admin/admin-home.component';
import { TextHomeComponent } from './components/admin/learnset/text/text-home.component';
import { PictureHomeComponent } from './components/admin/learnset/picture/picture-home.component';

function App() {
  return (
    <div className="App">
      <HeaderLayout />
      <Routes>
        <Route path="/">
          <Route index element={<HomeComponent />} />
          <Route path="/admin" >
            <Route path='' element={<AdminHomeComponent />} />
            <Route path='text/:id' element={<TextHomeComponent />} />
            <Route path='pictures/:id' element={<PictureHomeComponent />} />
          </Route>
          <Route path="/learning" element={<LearningHomeComponent />} />
          <Route path="*" element={<div></div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
