const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const port = process.env.PORT || 3000;
const END_POINT = process.env.END_POINT;

app.use(express.json());
app.use(express.static('public'));

app.post('/attach_document', async (req, res) => {
  try {
    const { url } = req.body;

    const response = await axios.post(END_POINT, {
      fileUrl: url
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error details:", error.response || error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'An error occurred during the request' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});