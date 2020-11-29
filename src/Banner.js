import React,{useState,useEffect} from 'react';
import axios from './axios';
import './Banner.css';
import requests from './requests';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original/";

export default function Banner() {
    const[movie,setMovie]=useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
useEffect(()=>
    {
        async function fetchData(){
            //all the random movies from netflix originals
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
              request.data.results[
                Math.floor(Math.random() * request.data.results.length)
              ]
            );
            return request; 
          }
          fetchData();

        }, []);
         console.log(movie);
         const youtubeOpts = {
            hight :"500px",
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          };
         const movieClicked = (moviename) => {
            console.log(moviename);
            if (trailerUrl !== "") setTrailerUrl("");
            else {
              movieTrailer(moviename)
                .then((url) => {
                  const urlParamV = new URLSearchParams(new URL(url).search);
                  setTrailerUrl(urlParamV.get("v"));
                })
                .catch((err) => console.log(err));
            }
          };

    return (
         
        <header className="banner" 
        style={{
            backgroundSize: "cover",
            backgroundImage: `url('${base_url}${movie?.backdrop_path}')`,
            backgroundPosition: "center center"
          }} >
          {/* background image */}
        
          <div className="banner__contents">
        {/*title */}
        {/*some movies have name some title some original name so this condition for title */}
        <h1 className="banner__title">{movie?.name || movie?.title || movie?.orginal_name}</h1>
        

        { /*2 button */}
        <div className="banner__buttons">
        <button className ="banner__button" onClick={() =>
            movieClicked(movie.name || movie.title || movie.orginal_name)
          }
          >Play</button>
        <button className ="banner__button">My List</button>
        </div>

        { /* description */}
<h1 className="banner__description">{movie?.overview}</h1>


        </div>    
        <div className="banner--fadeBottom" />         
        {trailerUrl != "" && <YouTube videoId={trailerUrl} opts={youtubeOpts} />}   
        </header>
        
    )
}
