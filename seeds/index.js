const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '6188c8777ea3c3a10cc419aa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'In the woods',
            price,
            geometry: { 
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/yelpcampxpiyush/image/upload/v1637566416/YelpCamp/ygz7qubamkpcaxjqse0z.jpg',
                  filename: 'YelpCamp/ygz7qubamkpcaxjqse0z'
                },
                {
                  url: 'https://res.cloudinary.com/yelpcampxpiyush/image/upload/v1637566416/YelpCamp/u9nnzsc64lqxtjequ2bj.jpg',
                  filename: 'YelpCamp/u9nnzsc64lqxtjequ2bj'
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

