import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/places', async (req, res) => {
    const { type, location } = req.query;
    if (!type || !location) {
        return res.status(400).send('Type and location are required');
    }

    try {
    
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: `${type} in ${location}`,
                key: process.env.GOOGLE_API_KEY
            }
        });

        
        //old version
        // const r = res.json(response.data.results);
        // console.log('my new response:', response.data.results[0])
        
        //new version
        const places = response.data.results;

        const detailedPlaces = await Promise.all(places.map(async place => {
            const placeDetails = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                params: {
                    place_id: place.place_id,
                    key: process.env.GOOGLE_API_KEY,
                    fields: 'name,formatted_address,formatted_phone_number,website,rating,opening_hours,price_level,icon'
                }
            });
            return placeDetails.data.result;
        }));
        const r = detailedPlaces;
        res.json(detailedPlaces);
        console.log(r);



    } catch (error) {
        res.status(500).send('Error fetching data from Google Places API');
    }
});
//port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
