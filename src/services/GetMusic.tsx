import axios from "axios"
const queryUrl = 'https://www.googleapis.com/youtube/v3/search?'
const videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&'
//'https://www.googleapis.com/youtube/v3/search?q=pynnonen&key=AIzaSyCa0SSIFUFgQ3jdm4u2grfkOxFCLpeRP30'
const GetVideo = (queryString: string | number) => {
    console.log(queryUrl + `q=${queryString}&key=AIzaSyCa0SSIFUFgQ3jdm4u2grfkOxFCLpeRP30`)
    axios.get(queryUrl + `q=${queryString}&key=AIzaSyCa0SSIFUFgQ3jdm4u2grfkOxFCLpeRP30`) //saadaan videoIdt
        .then((allItems: any) => {
            let allTitles = allItems.data.items.map((itemsObject:any) => {
                return itemsObject.id.videoId;
            })
            let videoTitles: string[] = [];
            allTitles.map((videoid:string|number) => {
                if(videoid !== undefined) {
                    console.log()
                    axios.get(videoUrl + `id=${videoid}&key=AIzaSyCa0SSIFUFgQ3jdm4u2grfkOxFCLpeRP30`)
                    .then(videodata => {
                        videodata.data.items.map((videoSpecificData: any) => {
                            videoTitles.push(videoSpecificData.snippet.title)
                        })
                    }).catch(e => console.log(e))
                }
            })
            console.log(videoTitles) //tässä kaikki titlet
            console.log(allItems) //tässä kaikki videoIdt  --> titlen ja allItems tarvii molemmat koska kun käyttis painaa niin kyseinen videoId täytyy lähteä päälle
        })
} //

//Käyttis kun kirjottaa niin eka haetaan sen queryllä eri videoIdt -> sen jälkeen haetaan videoIdeillä titlet
//sitten ehdotetaan titlejä käyttikselle --> kun painaa titleen niin sen objectin videoId lisätään soitettavien biisien jonoon
export default {
    GetVideo:GetVideo
}