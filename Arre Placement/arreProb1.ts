const express = require('express');
const app = express();
const port = 3000;

//sotring all messages
let messages = [
  { id: 1, text: 'sample Message 1' },
  { id: 2, text: 'sample Message 2' },
  { id: 3, text: 'sample Message 3' },
];

//load all group messages in a paginated manner
app.get('/messages', (req, res) => {
  // Retrieve page number and page size
  const pg = req.query.page || 1;
  const pgSize = req.query.pageSize || 10;

  //specifying starting and ending index
  const sInd = (pg - 1) * pgSize;
  const eInd = sInd + pgSize;

  // Return the messages within starting and ending index range
  res.json(messages.slice(sInd, eInd));
});

// API to create a message in the group
app.post('/messages', (req, res) => {
  // Get the text of the message from the request body
  const text = req.body.text;

  // Add the message to the array of messages
  const id = messages.length + 1;
  messages.push({ id, text });

  // Return the newly message
  res.json({ id, text });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});