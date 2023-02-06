import { useSelector } from 'react-redux';
import {Error, Loader, SongCard} from '../components'
import {useGetTopChartsQuery} from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = ({searchTerm}) => {
    const {activeSong, isPlaying, genreListId} = useSelector((state)=> state.player); 
    const {data,isFetching,error} = useGetTopChartsQuery();

    
    const songs = data?.tracks;
    const genreTitle = 'Pop';

    if(isFetching) return <Loader title="Loading songs..."/>
    if(error) return <Error/>
    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {songs?.filter((song)=>{
                    let searchItem = song.title + song.subtitle;
                    searchItem = searchItem.replace(/\s/g, '');
                    return searchItem.toLowerCase().includes(searchTerm.replace(/\s/g, '').toLowerCase()); 
                }).map((song, i)=>(
                    song?.images ?
                    <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={songs}
                    i={i}
                    /> : null
                ))}
            </div>
        </div>
    )
};

export default Discover;
