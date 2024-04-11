import React from 'react';
import './App.css';
import MenuNavigation from './components/MenuNavigation/MenuNavigation';
import NavigationRouter from './components/NavigationRouter/NavigationRouter';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchContentData } from './store/reducer/ContentReducer';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const getContentData=async()=>{
    dispatch(fetchContentData());
  }
  React.useEffect(()=>{
    getContentData();
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      
        <BrowserRouter>
     <MenuNavigation />
     <NavigationRouter />
     </BrowserRouter>
    </div>
  );
}

export default App;
