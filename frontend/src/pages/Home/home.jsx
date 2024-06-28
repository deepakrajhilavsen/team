import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/SearchDiv/Search';
import Jobs from '../../components/JobDiv/Jobs';

const Home = () => {
  return (
    <div className="w-[85%] m-auto bg-white">
      <Navbar />
      <Search />
      <Jobs />
    </div>
  );
};

export default Home;
