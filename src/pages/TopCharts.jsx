import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayPause from "../components/PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import 'swiper/css';
import 'swiper/css/free-mode';


const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg mb-2">
        <h3 className="font-bold text-base text-white mr-3">{i+1}.</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
          <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
          <div className="flex-1 flex flex-col justify-center mx-3">
              <p className="text-xl font-bold text-white">{song?.title}</p>
              <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
          </div>
        </div>
        <div className="cursor-pointer">
        <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick}/>
        </div>
    </div>
  )
  


const TopCharts = ({searchTerm}) => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state)=> state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.tracks?.slice(0, 10);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  }

  return(
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">


      <div className="w-full flex flex-col mt-8">
      <div className="w-fulll flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
        </div>
        <div className="mt-4 flex flex-col gap-1">
            {topPlays?.filter((song)=>{
                    let searchItem = song.title + song.subtitle;
                    searchItem = searchItem.replace(/\s/g, '');
                    return searchItem.toLowerCase().includes(searchTerm.replace(/\s/g, '').toLowerCase()); 
                }).map((song, i)=> (
              song?.images ?
              <TopChartCard key={song.key} song={song} i={i} 
              isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song,i)}/>
              :null
            ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default TopCharts;
