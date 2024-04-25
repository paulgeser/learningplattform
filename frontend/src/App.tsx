import React from 'react';
import './App.css';
import { HeaderLayout } from './layout/header.layout';
import { Route, Routes } from 'react-router-dom';
import { HomeComponent } from './components/home.component';
import { LearningHomeComponent } from './components/learning/home.component';
import { AdminHomeComponent } from './components/admin/admin-home.component';
import { LearnsetOverviewComponent } from './components/admin/learnset/learnset-overview/learnset-overview.component';
import { LearnsetTypeOverviewComponent } from './components/admin/learnset-type/learnsettype-overview/learnsettype-overview.component';
import { WordsOverviewComponent } from './components/admin/learnset/words/words-overview.component';

function App() {
  return (
    <div className="App">
      <HeaderLayout />
      <Routes>
        <Route path="/">
          <Route index element={<HomeComponent />} />
          <Route path="/admin" element={<AdminHomeComponent />} >
            <Route path='learnset-overview' element={<LearnsetOverviewComponent />} />
            <Route path='learnsettype-overview' element={<LearnsetTypeOverviewComponent />} />
            <Route path='learnset-words/:id' element={<WordsOverviewComponent />} />
            {/* 
            
            <Route path='pictures/:id' element={<PictureHomeComponent />} />
            <Route path='audio/:id' element={<AudioHomeComponent />} /> */}
          </Route>
          <Route path="/learning" element={<LearningHomeComponent />} />
          <Route path="*" element={<div></div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
