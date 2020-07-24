import React, {useState, useEffect} from 'react';
import GetVideoService from './services/GetMusic'
import YouTube from 'react-youtube';
const App = () => {
  const [isPlayed, setIsPlayed] = useState<string>('1jILZu-5xJg')
  const [userInput, setUserInput] = useState<string>('')
  const [queryResults, setQueryResults] = useState<string[]>([])
  const [songQueue, setSongQueue] = useState<any>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [adminText, setAdminText] = useState<string>('')
  useEffect(() => {
    GetVideoService.GetSongs()
      .then((songs: any) => {
        console.log(songs.data.data)
        setSongQueue(songs.data.data)
      })
  },[])
  const makeQuery = () => {
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
  const putToQueue = (queryObject:any): any => {
    GetVideoService.SaveSong(queryObject)
      .then((object:any) => {
        setSongQueue((prev:any) => [...prev, object])
        setUserInput('')
        setQueryResults([])
      }).catch(e => console.log(e))
  }
  const takeNextSong = () => {
    console.log("isPlayed: " + isPlayed)
    setIsPlayed(songQueue[0].videoid)
  }
  const showQueue = () =>
  songQueue.map((song:any) => 
      <div key={song.videoid}>
        <h5>{song.title}</h5>
      </div>
)
  const getQueryResults = () => 
    queryResults.map((query:any) => 
      <div key={query.videoid} style={{borderStyle: 'solid'}}>
        <h5>{query.title}</h5><button onClick={() => putToQueue(query)}>JONOON</button> <br />
      </div>
)
const startVideo = (event:any) => {
  console.log("onReady")
  event.target.playVideo();
  GetVideoService.DeleteSong(isPlayed)
    .then(() => {
      setSongQueue(songQueue.filter((obj:any) => obj.videoid !== isPlayed))
    })
}
  return(
    <div>
      {isAdmin ? 
        <YouTube
          onEnd={takeNextSong}
          videoId={isPlayed}
          onReady={startVideo}
          onStateChange={startVideo}
        /> : null}

        <input type = "text" placeholder="biisin nimi / esittäjä tmv" value={userInput} name="userInput" onChange={change}></input> <button onClick = {makeQuery}>Etsi</button><br />
        Ehdotukset biisillesi: <br />
        {getQueryResults()} <br /> <br />
        Biisijono: <br />
        {showQueue()}
        <input type = "text" value={adminText} name="adminText" onChange={adminChange}></input>
    </div>
  )
}

export default App;
