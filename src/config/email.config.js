const PROD_EMAIL_CONFIG = {
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}

const TEST_EMAIL_CONFIG = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.TEST_EMAIL_USER,
    pass: process.env.TEST_EMAIL_PASS
  }
}

export let EMAIL_CONFIG
if (process.env.NODE_ENV === 'PROD') {
  EMAIL_CONFIG = PROD_EMAIL_CONFIG
  console.log("ENV PROD")
} else {
  EMAIL_CONFIG = TEST_EMAIL_CONFIG
  console.log("ENV test/dev")
  
}