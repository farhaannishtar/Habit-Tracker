export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Guard clause checks for habit,
  // and returns early if it's not found
  if (!body.text) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Habit not found' })
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ 
    text: `${body.text}`,
    emoji: `${body.emoji}`,
    selected: `${body.selected}`
  })
}