const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get poems
router.get('/', async (req, res) => {
  const poems = await loadPoemsCollection();
  res.send(await poems.find({}).toArray());
})

// Add poem
router.post('/', async(req, res) => {
  const poems = await loadPoemsCollection();
  await poems.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })

  res.status(201).send();
})

router.delete('/:id', async(req, res) => {
  const poems = await loadPoemsCollection();
  await poems.deleteMany({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

// Delete poem
router.put('/:id', async(req, res) => {
  const poems = await loadPoemsCollection();
  await poems.findOneAndUpdate(
   {_id: new mongodb.ObjectID(req.params.id)},
   {$set: { text: req.body.text}},
  );

  res.status(200).send();
});

async function loadPoemsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://poem_creator:poem_creator123@ds133137.mlab.com:33137/poem_creator', {
    useNewUrlParser: true
  });

  return client.db('poem_creator').collection('poems');
}

module.exports = router;