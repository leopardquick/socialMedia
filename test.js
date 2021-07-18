 const crypto = require('crypto')
  let encryptPassword = function(password) {
    if (!password) return ''
    try {
    return crypto
    .createHmac('sha1', "saltsaltsalt")
    .update(password)
    .digest('hex')
    } catch (err) {
      console.log(err)
    }
    }

    console.log(encryptPassword('nadir'))

    
   