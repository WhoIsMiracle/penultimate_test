import React, { useEffect } from 'react';
import cls from './App.module.css';
import ProfileContainer from './component/profile/profile';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './component/login/login';
import Users from './component/users/users';
import Chat from './component/chat/chat'
import { useDispatch, useSelector } from 'react-redux';
import { getAppReadySelector } from './redux/selectors';
import Loader from './general/loader/loader';
import { appInitialize } from './redux/app-reducer';


const App: React.FC = () => {
  let appReady = useSelector(getAppReadySelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(appInitialize())
  }, [])
  if(!appReady){
    <Loader/>
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className={cls.app}>
        <Header/>
        <div className={cls.container}>
          <NavBar/>
          <Route path='/Login' render={() => <Login/>}/>
          {/* @ts-ignore */}
          <Route path='/Profile:userId?' render={() => <ProfileContainer/>}/>
          <Route path='/Users' render={() => <Users/>}/>
          <Route path='/Chat' render={() => <Chat/>}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


// https://github.com/WhoIsMiracle/penultimate.git