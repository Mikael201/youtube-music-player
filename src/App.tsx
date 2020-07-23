import React, {useState, useEffect} from 'react';
import GetVideoService from './services/GetMusic'
const App = () => {
  const [isPlayed, setIsPlayed] = useState('pFzL_8c494M')
  const [youtubeUrl, setyoutubeUrl] = useState('https://www.youtube.com/embed/')
  const [autoplay, setAutoplay] = useState('?autoplay=1&mute=1&enablejsapi=1')
  const [userInput, setUserInput] = useState('')
  const [queryResults, setQueryResults] = useState<string[]>([])
  const [songQueue, setSongQueue] = useState<string[]>([])
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
  const putToQueue = (id:any): any => {
    setSongQueue(songQueue.concat(id))
    setUserInput('')
    setQueryResults([])
  }
  const getQueryResults = () => 
    queryResults.map((query:any) => {
    return(
      <div>
        <h5>{query.title}</h5><button onClick={putToQueue(query.videoid)}>JONOON</button>
      </div>
    )
    }
  )
  return(
    <div>
        <iframe width="420" height="345" title="soittaja" src={youtubeUrl+isPlayed+autoplay}>
        </iframe> <br />
        <input type = "text" value={userInput} name="userInput" onChange={change}></input> <button onClick = {makeQuery}>Etsi</button><br />
        Ehdotukset biisillesi: <br />
        {getQueryResults()}
    </div>
  )
}

export default App;
