import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import Search from './components/SearchDiv/Search';
import Jobs from './components/JobDiv/Jobs';
import Value from './components/ValueDiv/Value';
import Footer from './components/FooterDiv/Footer';
import Profile from './components/Profile/profile';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

const Home = () => (
  <div className='w-[85%] m-auto bg-white'>
    <Navbar />
    <Search />
    <Jobs />
    <Value />
    <Footer />
  </div>
);

const ProfilePage = () => (
  <div className='w-[85%] m-auto bg-white'>
    <Profile />
    {/* No need to render the Navbar here */}
  </div>
);

export default App;
