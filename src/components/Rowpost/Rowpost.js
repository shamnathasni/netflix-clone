import React, { useEffect, useState } from 'react';
import Youtube from "react-youtube"
import './Rowpost.css';
import { imageUrl , API_KEY } from '../../constants/constants';
import axios from '../../axios';

function Rowpost(props) {
  const [movies, setMovies] = useState([]); // Initialize movies as an empty array
  const [urlId,seturlId] = useState()
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    }
  };

  useEffect(() => {
    axios.get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results); // Update state with the movie data
      })
      .catch((err) => {
        console.error('Network issue or API error:', err);
      });
  }, [props.url]);

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
  .then((response) => {
    if (response.status === 404) {
      console.log('Movie videos not found.');
      // Handle this case as needed.
    } else if (response.data.results.length !== 0) {
      seturlId(response.data.results[0]);
    } else {
      console.log('No videos available for this movie.');
    }
  })
  .catch((err) => {
    console.error('Error fetching movie videos:', err);
  });

  }
  
  

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) => (
          <img onClick={(()=>
              handleMovie(obj.id)
          )} key={obj.id} className={props.isSmall? 'smallposter':'poster'} alt='posters' src={`${imageUrl}${obj.backdrop_path}`} />
        ))}
      </div>
      { urlId && < Youtube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default Rowpost;
