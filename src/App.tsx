import React, {useState, useEffect} from 'react';
import GetVideoService from './services/GetMusic'
import YouTube from 'react-youtube';
const App = () => {
  const [isPlayed, setIsPlayed] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('')
  const [queryResults, setQueryResults] = useState<string[]>([])
  const [songQueue, setSongQueue] = useState<any>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [adminText, setAdminText] = useState<string>('')
  const [now, setNow] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(false)
  useEffect(() => {
    GetVideoService.GetSongs()
      .then((songs: any) => {
        setSongQueue(songs.data.data)
      })
  },[])
  const makeQuery = () => {
    setDisable(false)
    let dataArray = GetVideoService.GetVideo(userInput)
    setTimeout(() => {
      setQueryResults(dataArray)
    },4000)
  }
  const change = (event:any) => {
    setUserInput(event.target.value)
  }
  const adminChange = (event:any) => {
    setAdminText(event.target.value)
    if(adminText === 'YOUSHOULDNEVERDOITLIKETHIS') { // this is done like this because we dont have any login on the page (how to be admin) + on parties no-one has computers so they cant see the source code from for i.e. developer tools that easy. However it's crucial that the users who are on phone cant see the Youtube media player. This should be visible only for the main music playing device for i.e. the computer.
      setIsAdmin(true)
    }
  }
  const putToQueue = (queryObject:object): any => {
    setDisable(true)
    GetVideoService.SaveSong(queryObject)
      .then((object:object) => {
        setSongQueue(songQueue.concat(object))
        setUserInput('')
        setQueryResults([])
        GetVideoService.GetSongs()
          .then((songs: any) => {
            setSongQueue(songs.data.data)
      })
      }).catch(e => console.log(e))
  }
  const takeNextSong = (event:any) => {
    GetVideoService.GetSongs()
    .then((songs: any) => {
      setSongQueue(songs.data.data)
    })
      event.target.playVideo()
  }
  const showQueue = () =>
  songQueue.map((song: any) =>  
      <div key={song.videoid} style={{borderStyle: '5px solid red'}}>
        <h5>{song.title} <hr /></h5>
      </div>
)
  const getQueryResults = () => 
    queryResults.map((query: any) => 
      <div key={query.videoid} style={{borderStyle: 'solid'}}>
        <h5>{query.title}</h5><button disabled={disable} onClick={() => putToQueue(query)}>JONOON</button> <br />
      </div>
)
const play = (event:any) => {
  GetVideoService.DeleteSong(isPlayed)
  .then(() => {
    setNow(songQueue[0].title)
    setSongQueue(songQueue.filter((obj:any) => obj.videoid !== isPlayed))
    setIsPlayed(songQueue[0].videoid)
  })
}
  return(
    <div>
      {isAdmin ? 
      <div>
        <button onClick={() => setIsPlayed(songQueue[0].videoid)}>aloita</button>
        <YouTube
          onPlay={play}
          onStateChange={takeNextSong}
          videoId={isPlayed}
        /></div> : null}
        <input type = "text" placeholder="biisin nimi / esittäjä tmv" value={userInput} name="userInput" onChange={change}></input> <button onClick = {makeQuery}>Etsi</button><br />
        {getQueryResults()} <br /> <br />
        <h1>Biisijono:</h1> <br />
        {showQueue()} <br /> <br /> <br />
        <input type = "text" placeholder="tube playerin käyttöönotto" value={adminText} name="adminText" onChange={adminChange}></input>
    </div>
  )
}

export default App;
