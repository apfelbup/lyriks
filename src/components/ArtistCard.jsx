
const ArtistCard = ({track}) => {

  return(
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img src={track?.images?.background} alt="artist" className="w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg text-white truncate">{track?.subtitle}</p>
    </div>
  )
};

export default ArtistCard;
