import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from "swiper";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import 'swiper/css';
import 'swiper/css/free-mode';


const TopPlay = () => {
  const dispatch = useDispatch();
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.tracks?.slice(0, 6);



  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // }

  // const handlePlayClick = (song, i) => {
  //   dispatch(setActiveSong({song,data,i}));
  //   dispatch(playPause(true));
  // }

  return(
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">


      <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer"> See more</p>
          </Link>
        </div>
        <Swiper 
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
          >
            {topPlays?.map((song,i)=>(
              song?.images ?
              <SwiperSlide
              key={song?.key}
              style={{width:'25%',height:'auto'}}
              className="shadow-lg rounded-full animate-slideright"
              >

                  <img  src={song?.images?.background} alt="name" className="rounded-full w-full object-cover"/>

              </SwiperSlide>
              : null
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay;
