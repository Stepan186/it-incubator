import { Request, Response, Router } from "express";
import { postValidation, updateValidation } from "../utilities/video-validation";
import { checkServerIdentity } from "tls";

const videos: any = []

export const videosRouter = Router({})
export const testingRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
  res.send(videos)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  const video = videos.find((v: { id: number; }) => v.id === +req.params.id)
  if (video) {
    res.status(200).send(video)
  } else {
    res.sendStatus(404)
  }
})

videosRouter.post('/', (req: Request, res: Response) => {

  const data = req.body
  const message = postValidation(data.title, data.author, data.availableResolutions? data.availableResolutions : [])

  if ( message.errorsMessages.length > 0 ) {
    res.status(400).send(message)
    return
  }

  const today = new Date()
  let publicationD = new Date();
  publicationD.setDate(publicationD.getDate() + 1);

  const newVideo = {...req.body, id: today.setDate(today.getDate()), canBeDownloaded: false, minAgeRestriction: null, createdAt: today.toISOString(),
    publicationDate: publicationD.toISOString()}
  videos.push(newVideo)
  res.status(201).send(newVideo)
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < videos.length ; i++) {
    if(videos[i].id === +req.params.id) {
      videos.splice(i, 1)
      res.sendStatus(204)
      return
    }
  }
  res.sendStatus(404)
})

videosRouter.put('/:id', (req: Request, res: Response) => {

  const data = req.body
  const message = updateValidation(data.title, data.author, data.availableResolutions? data.availableResolutions : [],
    data.canBeDownloaded? data.canBeDownloaded: false, data.minAgeRestriction? data.minAgeRestriction: null, data.publicationDate )

  if ( message.errorsMessages.length > 0) {
    res.status(400).send(message)
    return;
  }

  let video = videos.find((v: { id: number; }) => v.id === + req.params.id)

  if (!video) {
    res.sendStatus(404)
    return
  }

  Object.assign(video, {...data})
  res.sendStatus(204)


})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
  videos.length = 0
  res.sendStatus(204)
})
