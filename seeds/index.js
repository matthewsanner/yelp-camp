const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample= array=> array[Math.floor(Math.random() * array.length)]

const seedDb= async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga accusantium illum omnis esse modi sequi sunt debitis, alias, architecto unde dolores! Quam esse, accusamus velit deserunt eaque natus tenetur et?',
            price
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})