const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63977fabd4ca3a51d97b4d96',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dunbqpis8/image/upload/v1671057457/YelpCamp/f49xlmamn9s4joo5uyte.jpg',
                    filename: 'YelpCamp/f49xlmamn9s4joo5uyte'
                },
                {
                    url: 'https://res.cloudinary.com/dunbqpis8/image/upload/v1671057457/YelpCamp/bq4e2mn3km9njcqj9nu1.jpg',
                    filename: 'YelpCamp/bq4e2mn3km9njcqj9nu1'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga accusantium illum omnis esse modi sequi sunt debitis, alias, architecto unde dolores! Quam esse, accusamus velit deserunt eaque natus tenetur et?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})