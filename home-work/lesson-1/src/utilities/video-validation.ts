import { Resolutions } from "./videos";

export function updateValidation(title: any, author: any, availableResolutions: Resolutions[], canBeDownloaded: any,
                                 minAgeRestriction: any, publicationDate: any) {

  const message = generalValidation(title, author)

 if (typeof minAgeRestriction === 'number' && minAgeRestriction < 1 || minAgeRestriction > 18) {
    const erroreMessage = {
      "message": "minAgeRestriction must be more 0 and less 18",
      "field": "minAgeRestriction"
    }
    message.errorsMessages.push(erroreMessage)
  }
 else if (minAgeRestriction && typeof minAgeRestriction !== 'number') {
   const erroreMessage = {
     "message": "minAgeRestriction must be number",
     "field": "minAgeRestriction"
   }
   message.errorsMessages.push(erroreMessage)
 }

  if (typeof canBeDownloaded !== 'boolean') {
    const erroreMessage = {
      "message": "canBeDownloaded must be boolean",
      "field": "canBeDownloaded"
    }
    message.errorsMessages.push(erroreMessage)
  }

  const validDate = isIsoDate(publicationDate)

  if (!publicationDate || typeof publicationDate !== 'string' || !validDate ) {
    const erroreMessage = {
      "message": "publicationDate must be date string",
      "field": "publicationDate"
    }
    message.errorsMessages.push(erroreMessage)
  }

  return message
}

export function postValidation(title: any, author: any, availableResolutions: Resolutions[]) {
  const message = generalValidation(title, author)


  if(!(availableResolutions.length > 0) || !(Array.isArray(availableResolutions)&& availableResolutions.every(k => Object.values(Resolutions).includes(k))) ) {
    const erroreMessage = {
      "message": "availableResolutions must be array and at least one resolution should be added",
      "field": "availableResolutions"
    }
    message.errorsMessages.push(erroreMessage)
  }


  return message
}

function generalValidation(title: any, author: any) {
  const message : ErrorInterface = {errorsMessages: []}

  if(!title) {
    const erroreMessage = {
      "message": "title must be string",
      "field": "title"
    }
    message.errorsMessages.push(erroreMessage)
  }
  else if(typeof title !== 'string' || title.length > 40 ) {
    const erroreMessage = {
      "message": "title must be string and length must be less than 40 characters",
      "field": "title"
    }
    message.errorsMessages.push(erroreMessage)
  }

  if(!author) {
    const erroreMessage = {
      "message": "author must be string",
      "field": "author"
    }
    message.errorsMessages.push(erroreMessage)
  }
  else if(typeof author !== 'string' || author.length > 20) {
    const erroreMessage = {
      "message": "author must be string and length must be less than 20 characters",
      "field": "author"
    }
    message.errorsMessages.push(erroreMessage)
  }

  return message
}


function isIsoDate(str: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  // @ts-ignore
  return d instanceof Date && !isNaN(d) && d.toISOString()===str; // valid date
}
