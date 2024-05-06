import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { HeaderLayout } from './layout/header.layout';
import { Route, Routes } from 'react-router-dom';
import { HomeComponent } from './components/home.component';
import { LearningHomeComponent } from './components/learning/home.component';
import { AdminHomeComponent } from './components/admin/admin-home.component';
import { LearnsetOverviewComponent } from './components/admin/learnset/learnset-overview/learnset-overview.component';
import { LearnsetTypeOverviewComponent } from './components/admin/learnset-type/learnsettype-overview/learnsettype-overview.component';
import { WordsOverviewComponent } from './components/admin/learnset/words/words-overview.component';
import { ConfigLoadingComponent } from './components/config/config.component';
import { StateContext } from './core/state';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthStatus } from './core/enum/auth-status.enum';
import { LoginComponent } from './components/login/login.component';
import { UserOverviewComponent } from './components/admin/user/user-overview/user-overview.component';

function App() {
  const [loggedin, setLoggedin] = useState<AuthStatus>(AuthStatus.CONFIG_LOADING);
  const { authServiceInstance } = useContext(StateContext);
  const destroySubject: Subject<void> = new Subject();

  useEffect(() => {
    // Listen to user logged in observable
    authServiceInstance.userLoggedIn$
      .pipe(
        takeUntil(destroySubject),
        tap(x => {
          console.log(x, 'here')
        })
      )
      // Set logged in
      .subscribe(setLoggedin);

    // Execute a login check
    authServiceInstance.checkLogin();
    // Destory all subscriptions before component is being destroyed
    return () => destroySubject.next();
  }, [authServiceInstance]);

  return (
    <div className="App">
      {loggedin === AuthStatus.CONFIG_LOADING && (
        <ConfigLoadingComponent />
      )}
      {loggedin === AuthStatus.NOT_LOGGED_IN && (
        <LoginComponent />
      )}
      {loggedin === AuthStatus.LOGGED_IN && (<>
        <HeaderLayout />
        <Routes>
          <Route path="/">
            <Route index element={<HomeComponent />} />
            <Route path="/admin" element={<AdminHomeComponent />} >
              <Route path='learnset-overview' element={<LearnsetOverviewComponent />} />
              <Route path='learnsettype-overview' element={<LearnsetTypeOverviewComponent />} />
              <Route path='learnset-words/:id' element={<WordsOverviewComponent />} />
              <Route path='users' element={<UserOverviewComponent />} />
            </Route>
            <Route path="/learning" element={<LearningHomeComponent />} />
            <Route path="*" element={<div></div>} />
          </Route>
        </Routes>
      </>)}
    </div>
  );
}

export default App;
