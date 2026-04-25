import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import dbConnect from './db/connect'
import FavYoutubeModel from './db/fav-youtube-models'
import { isValidObjectId } from 'mongoose'

const app = new Hono()

app.use( poweredBy())
app.use(logger())

dbConnect()
.then(() => {
  app.get('/', async(c) =>{
    const documents = await FavYoutubeModel.find()
    return c.json(
      documents.map((d) => d.toObject()),
      200
    )
  })

  //craete doc
  app.post('/', async(c) => {
    const formData = await c.req.json();
    if(!formData.thumbnailUrl) delete formData.thumbnailUrl

    const FavYoutubeObjects = new FavYoutubeModel(formData)
    try{
        const savedDocument = await FavYoutubeObjects.save()
        return c.json(savedDocument.toObject(), 201)
    }catch(err){
      return c.text(`Error creating document: $(err.message)`, 500)
    }
  })

app.get('/:documentId', async(c) => {
  const id = c.req.param('documentId')
  if(!isValidObjectId(id)){
    return c.json(({error: "Invalid document ID"}), 400)
  }
  try{
  const document = await FavYoutubeModel.findById(id)
  if(!document){
    return c.json({error: "Document not found"}, 404)
  }
  return c.json(document.toObject(), 200)
  }catch(err){
  return c.text(`Error fetching document: $(err.message)`, 500)
  }

  })

  
})
.catch((err) => {
  app.get('/*', (c) => {
    return c.text(`Failed to connect to mongodb database, error: $(err.message)`)
  })

}) 
//now we are goign to define the routes one by one in order to make this app work

app.onError((err, c) => {
  return c.text(`App Error: ${err.message}`)
})



export default app
