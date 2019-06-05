const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get poems
router.get('/', async (req, res) => {
  const poems = await loadPostsCollection();
  res.send(await poems.find({}).toArray());
})

// Add poem

// Delete poem

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://poem_creator:poem_creator123@ds133137.mlab.com:33137/poem_creator', {
    useNewUrlParser: true
  });

  return client.db('poem_creator').collection('poems');
}

module.exports = router;