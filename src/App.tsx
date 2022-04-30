import React, { useEffect } from 'react';
import cls from './App.module.css';
import ProfileContainer from './component/profile/profile';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';
import { HashRouter, Route, useHistory } from 'react-router-dom';
import Login from './component/login/login';
import Users from './component/users/users';
import Chat from './component/chat/chat'
import { useDispatch, useSelector } from 'react-redux';
import { getAppReadySelector } from './redux/selectors';
import Loader from './general/loader/loader';
import { appInitialize } from './redux/app-reducer';
import Dialogs from './component/dialogs/dialogs';
import { actions } from './redux/app-reducer';

const App: React.FC = () => {
  let appReady = useSelector(getAppReadySelector)
  const dispatch = useDispatch()
  let history = useHistory()
  dispatch(actions.setHistory(history))
  useEffect(() => {
    dispatch(appInitialize())
  }, [])
  if(!appReady){
    <Loader/>
  }
  return (
      <div className={cls.app}>
        <Header/>
        <div className={cls.container}>
          <NavBar/>
          <Route path='/Login' render={() => <Login/>}/>
          {/* @ts-ignore */}
          <Route path='/Profile:userId?' render={() => <ProfileContainer/>}/>
          <Route path='/Users' render={() => <Users/>}/>
          <Route path='/Chat' render={() => <Chat/>}/>
          <Route path='/Dialogs:userId?' render={() => <Dialogs/>}/>
        </div>
      </div>
  );
}

const AppContainer = () => {
  return (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <App/>
  </HashRouter>
  )
}

export default AppContainer;


// https://github.com/WhoIsMiracle/penultimate.git