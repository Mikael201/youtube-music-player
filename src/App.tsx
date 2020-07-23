import React, {useState, useEffect} from 'react';
import GetVideoService from './services/GetMusic'
import YouTube from 'react-youtube';
const App = () => {
  const [isPlayed, setIsPlayed] = useState('pFzL_8c494M')
  const [autoplay, setAutoplay] = useState('?autoplay=1&mute=1&enablejsapi=1')
  const [userInput, setUserInput] = useState('')
  const [queryResults, setQueryResults] = useState<string[]>([])
  const [songQueue, setSongQueue] = useState<any>([])
  useEffect(() => {
    setQueryResults(queryResults)
  },[queryResults])
  const makeQuery = () => {
    let titlesAndVideoIDs:string[] = GetVideoService.GetVideo(userInput);
    setQueryResults(titlesAndVideoIDs)
    console.log(queryResults)
  }
  const change = (event:any) => {
    setUserInput(event.target.value)
  }
  const putToQueue = (queryObject:any): any => {
    setSongQueue(songQueue.concat(queryObject))
    setUserInput('')
    setQueryResults([])
  }
  const takeNextSong = () => {
    setSongQueue(songQueue.filter((obj:any) => obj.videoid !== isPlayed))
    setIsPlayed(songQueue[0].videoid)
  }
  const showQueue = () =>
  songQueue.map((song:any) => {
    return(
      <div>
        <h5>{song.title}</h5>
      </div>
    )
  })
  const getQueryResults = () => 
    queryResults.map((query:any) => {
    return(
      <div>
        <h5>{query.title}</h5><button onClick={putToQueue(query)}>JONOON</button>
      </div>
    )
    }
  )
  return(
    <div>
        <YouTube
          onEnd={takeNextSong}
          videoId={isPlayed+autoplay}
        />
        <input type = "text" value={userInput} name="userInput" onChange={change}></input> <button onClick = {makeQuery}>Etsi</button><br />
        Ehdotukset biisillesi: <br />
        {getQueryResults()} <br /> <br />
        Biisijono: <br />
        {showQueue()}
    </div>
  )
}

export default App;
