import React from 'react'
import { Route, Routes } from 'react-router-dom';
import FullInfoHero from '../MainPage/FullInfoHero';
import MainPage from '../MainPage/MainPage';
import Pageadd from '../MainPage/PageAddHero';

const AppRouter =()=> {

    return (
        <Routes>
          <Route  path='/' element=<MainPage /> exact />  
          <Route  path='/addhero' element=<Pageadd /> exact />  
          <Route  path='/superhero/:id' element=<FullInfoHero /> exact />  
            
            <Route
                path="*"
                element={<h1>Error</h1>}
            />
        </Routes>
    )
}

export default AppRouter