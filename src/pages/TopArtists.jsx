import { ArtistCard, Loader, Error } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const TopArtists = ({searchTerm}) => {
    const {data, isFetching, error} = useGetTopChartsQuery();
    const artists = data?.tracks;

    if(isFetching) return <Loader title="Loading top charts"/>
    if(error) return <Error/>

    return(
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Top Artists
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {artists?.filter((artist)=>{
                    let artistItem = artist.subtitle.replace(/\s/g, '');
                    return artistItem.toLowerCase().includes(searchTerm.replace(/\s/g, '').toLowerCase()); 
                }).map((track)=>(
                    track?.images ?
                    <ArtistCard key={track.key} track={track}/>
                    :null
                ))}
            </div>
        </div>
    )
};

export default TopArtists;
