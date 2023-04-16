import app from './server'

const port = 3000

// Listening on port 3000
app.listen(port, () => {
  if (port != null) {
    console.log(`Server listening at http://localhost:${port}`)
  } else {
    console.log('Invalid server port!')
  }
})
