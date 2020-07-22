import React, {useState, useEffect} from 'react';
import GetVideoService from './services/GetMusic'
const App = () => {
  useEffect(() => {
    GetVideoService.GetVideo("snöörit");
  })
  return(
    <div>
      
    </div>
  )
}

export default App;
