import { Resolutions } from "./videos";

export function updateValidation(title: any, author: any, availableResolutions: Resolutions[], canBeDownloaded: any,
                                 minAgeRestriction: any, publicationDate: any) {

  const messages = generalValidation(title, author)

  if (minAgeRestriction && (minAgeRestriction < 1 || minAgeRestriction > 18 )) {
    const erroreMessage = {
      "message": "minAgeRestriction more then 1 and less then 18",
      "field": "minAgeRestriction"
    }
    messages.push(erroreMessage)
  }

  return messages
}

export function postValidation(title: any, author: any, availableResolutions: Resolutions[]) {
  const messages = generalValidation(title, author)


  if(!(availableResolutions.length > 0) || !(Array.isArray(availableResolutions)&& availableResolutions.every(k => Object.values(Resolutions).includes(k))) ) {
    const erroreMessage = {
      "message": "availableResolutions must be array and at least one resolution should be added",
      "field": "availableResolutions"
    }
    messages.push(erroreMessage)
  }


  return messages
}

function generalValidation(title: any, author: any) {
  const messages = []

  if(!title) {
    const erroreMessage = {
      "message": "title must be string",
      "field": "title"
    }
    messages.push(erroreMessage)
  }
  else if(typeof title !== 'string' || title.length > 40 ) {
    const erroreMessage = {
      "message": "title must be string and length must be less than 40 characters",
      "field": "title"
    }
    messages.push(erroreMessage)
  }

  if(!author) {
    const erroreMessage = {
      "message": "author must be string",
      "field": "author"
    }
    messages.push(erroreMessage)
  }
  else if(typeof author !== 'string' || author.length > 20) {
    const erroreMessage = {
      "message": "author must be string and length must be less than 20 characters",
      "field": "author"
    }
    messages.push(erroreMessage)
  }

  return messages
}

