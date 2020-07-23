import axios from "axios"
const queryUrl = 'https://www.googleapis.com/youtube/v3/search?'
const videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&'
//'https://www.googleapis.com/youtube/v3/search?q=pynnonen&key=AIzaSyCa0SSIFUFgQ3jdm4u2grfkOxFCLpeRP30'
const GetVideo = (queryString: string | number): string[] => {
    let videoTitles: string[] = [];
    let allDataArray: any = [];
    axios.get(queryUrl + `q=${queryString}&key=AIzaSyCvyVY7J2AAfWJ1L2bFb9cZjyE57qVHTjU`) //saadaan videoIdt
        .then((allItems: any) => {
            let allTitles = allItems.data.items.map((itemsObject:any) => {
                return itemsObject.id.videoId;
            })
            let newAllTitles = allTitles.filter((f:any) => f) //remove undefines
            newAllTitles.map((videoid:string|number) => {
                if(videoid !== undefined) {
                    axios.get(videoUrl + `id=${videoid}&key=AIzaSyCvyVY7J2AAfWJ1L2bFb9cZjyE57qVHTjU`)
                    .then(videodata => {
                        videodata.data.items.map((videoSpecificData: any) => {
                            videoTitles.push(videoSpecificData.snippet.title)
                        })
                    }).catch(e => console.log(e))
                }
            })
            for(let i = 0; i<newAllTitles.length; i++) {
                allDataArray[i] = {
                    videoid: videoTitles[i],
                    title: newAllTitles[i]
                }
            }
        }).catch(e => console.log(e))
        console.log(allDataArray)
        return allDataArray
}

export default {
    GetVideo:GetVideo
}