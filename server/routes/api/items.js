const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Fridge Items
router.get('/', async (req, res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({}).toArray());
});

//Add new Item
router.post('/', async (req, res) => {
    const items = await loadItemsCollection();
    await items.insertOne({
        naziv: req.body.naziv,
        kolicina: req.body.kolicina,
        kupljeno: new Date()
    });
    res.status(201).send();
});

//Obrisi item
router.delete('/:id', async (req, res)=> {
    const items = await loadItemsCollection();
    await items.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});


async function loadItemsCollection(){
    const client = await mongodb.MongoClient.connect (
        'mongodb+srv://Rubi:rubiRUBI@cluster0.1c7kl.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true
        }
    );
    return client.db('DWA').collection('items');
}

module.exports = router;