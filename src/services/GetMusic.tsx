import axios from "axios"
const queryUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&'
const GetVideo = (queryString: string | number): string[] => {
    let allDataArray: any = [];
    let allVIds: any;
    axios.get(queryUrl + `q=${queryString}&fields=items(snippet(title))&key=API_KEY`) //GET all video titles
        .then((allItems: any) => {
            let allTitles: string[] = allItems.data.items.map((itemsObject:any) => {
                return itemsObject.snippet.title; //return all video titles to allTitles
            })
            let newAllTitles = allTitles.filter((f:any) => f) //remove possible undefineds
            axios.get(queryUrl + `q=${queryString}&fields=items(id(videoId))&key=API_KEY`) //GET all videoIDs
                .then((allvideoids: any) => {
                    allVIds = allvideoids.data.items.map((itemsObject: any) => {
                        return itemsObject.id.videoId //return all videoIDs to allVIds
                    })
                    for(let i = 0; i<newAllTitles.length; i++) {
                        allDataArray[i] = {
                            videoid: allVIds[Object.keys(allVIds)[i]],
                            title: newAllTitles[i]
                        }
                    }
                }).catch(e => console.log(e))
        }).catch(e => console.log(e))
        return allDataArray
}

const GetSongs = () => {
    return axios.get('/all')
}
const SaveSong = ((songObject: object) => {
    return axios.post('/song', songObject)
})
const DeleteSong = ((id: string) => {
    return axios.delete(`/song/${id}`) //for debugging locally the url should be service/song/${id} for i.e. http://localhost:3001/song/${id}
})

export default {
    GetVideo:GetVideo,
    GetSongs:GetSongs,
    SaveSong:SaveSong,
    DeleteSong:DeleteSong
}