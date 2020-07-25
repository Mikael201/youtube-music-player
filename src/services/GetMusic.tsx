import axios from "axios"
const queryUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&'
const GetVideo = (queryString: string | number): string[] => {
    let allDataArray: any = [];
    let allVIds: any;
    axios.get(queryUrl + `q=${queryString}&fields=items(snippet(title))&key=API_KEY`) //saadaan videoIdt
        .then((allItems: any) => {
            let allTitles = allItems.data.items.map((itemsObject:any) => {
                return itemsObject.snippet.title;
            })
            let newAllTitles = allTitles.filter((f:any) => f) //remove possible undefineds
            console.log("newAllTitles: " + newAllTitles)
            axios.get(queryUrl + `q=${queryString}&fields=items(id(videoId))&key=API_KEY`)
                .then((allvideoids: any) => {
                    allVIds = allvideoids.data.items.map((itemsObject: any) => {
                        return itemsObject.id.videoId
                    })
                    console.log("newAllVideoIds: " + allVIds)
                    for(let i = 0; i<newAllTitles.length; i++) {
                        console.log(allVIds[Object.keys(allVIds)[i]])
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
const SaveSong = ((songObject: any) => {
    return axios.post('/song', songObject)
})
const DeleteSong = ((id: any) => {
    return axios.delete(`/song/${id}`)
})

export default {
    GetVideo:GetVideo,
    GetSongs:GetSongs,
    SaveSong:SaveSong,
    DeleteSong:DeleteSong
}