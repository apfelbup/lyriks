import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';

import { Sidebar, MusicPlayer, TopPlay } from './components';
import {TopArtists, Discover, TopCharts } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };


  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
      <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-5 h-5 ml-4"/>
      <input name="search-field" autoComplete="off" id="search-field" 
      placeholder="Search" type="search" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} 
      className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"/>
    </div>
      </form>

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover searchTerm={searchTerm} />} />
              <Route path="/top-artists" element={<TopArtists searchTerm={searchTerm} />} />
              <Route path="/top-charts" element={<TopCharts searchTerm={searchTerm} />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
