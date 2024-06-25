
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Homepage from './Website/Homepage';

import Privacy from './Website/Privacy';
import TermsService from './Website/TermsService';
import AddPostForm from './Website/AddPosts';
import PostFeed from './Website/Feed';
import RequireBack from './pages/Auth/RequireBack';
import RequireAuth from './pages/Auth/RequireAuth';
import Err404 from './pages/Auth/404';
import SettingsPage from './Website/SettingsPage';
import Event from './Website/Event';
import UserProfile from './Website/UserProfile';


function App() {
 
 
  return (
    <div className="App">
    <Routes>  
    <Route element={<RequireBack/>}> 
    {/* if have token not can return to login and signup page  */}
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element= {<Signup/>}/>
      </Route>
    <Route element={<RequireAuth/>}>
      {/* to Enter to this pages you should do login  */}
    <Route path='/' element= {<Homepage/>}/>
    <Route path='SettingsPage/:id' element={<SettingsPage/>}/>
    <Route path='Events' element={<Event/>}/>
    
      {/* <Route path='/AddPosts' element= {<AddPostForm/>}/>
      <Route path='/feedshow' element= {<PostFeed/>}/> */}
      </Route>
      <Route path='/Profile/:id' element={<UserProfile/>}/>
      <Route path='/*' element={<Err404/>}/>
      <Route path='/policy' element= {<Privacy/>}/>
      <Route path='/Terms_service' element= {<TermsService/>}/>
    </Routes>

  

    </div>
  );
}

export default App;
