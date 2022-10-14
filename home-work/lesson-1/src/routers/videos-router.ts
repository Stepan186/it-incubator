import { Request, Response, Router } from "express";
import { postValidation, updateValidation } from "../utilities/video-validation";

const videos: any = []

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
  res.send(videos)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  const video = videos.find((v: { id: number; }) => v.id === +req.params.id)
  res.send(video)
})

videosRouter.post('/', (req: Request, res: Response) => {

  const data = req.body
  const messages = postValidation(data.title, data.author, data.availableResolutions? data.availableResolutions : [])

  if (messages.length > 0 ) {
    res.status(400).send(messages)
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
    if(videos[i].id ===+ req.params.id) {
      videos.splice(i, 1)
      res.send(204)
      return
    }
    res.send(404)
  }
})

videosRouter.put('/:id', (req: Request, res: Response) => {

  const data = req.body
  const messages = updateValidation(data.title, data.author, data.availableResolutions? data.availableResolutions : [],
    data.canBeDownloaded, data.minAgeRestriction, data.publicationDate )

  if (messages.length > 0) {
    res.status(400).send({"errorsMessages": messages})
  }

  const video = videos.find((v: { id: number; }) => v.id === + req.params.id)

  if (!video) {
    res.status(404)
    return;
  }



})
