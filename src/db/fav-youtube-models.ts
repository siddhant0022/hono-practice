import {Schema, model} from 'mongoose';

export interface FavYoutubeSchema {
  title: string,
  description : string,
  thumbnailUrl ?: string,
  watched : boolean,
  youtuberName : string

}

const FavYoutubeSchema = new Schema<FavYoutubeSchema>({
  title: {type:String, required: true},
  description: {type: String, required: true},
  thumbnailUrl : {type : String, 
    default: "https://www.google.com/imgres?q=a%20basic%20thumbnail%20url&imgurl=https%3A%2F%2Fthumbnailtest.com%2Fwp-content%2Fuploads%2F2024%2F02%2FHow-to-copy-a-YouTube-thumbnail-URL.jpg&imgrefurl=https%3A%2F%2Fthumbnailtest.com%2Fguides%2Ffind-youtube-thumbnail-url%2F&docid=Zpx1X_iKc8aZjM&tbnid=a48GQHliaAt9pM&vet=12ahUKEwjgm6OByImUAxWxyjgGHf_DBlEQnPAOegQIGhAB..i&w=1800&h=1050&hcb=2&ved=2ahUKEwjgm6OByImUAxWxyjgGHf_DBlEQnPAOegQIGhAB",  
    required: false},
  watched: {type: Boolean, default: false,  required: true},
  youtuberName : {type : String, required: true},
})

const FavYoutubeModel = model('fav-youtube-videos', FavYoutubeSchema)

export default FavYoutubeModel;
