import React, { useState } from 'react';
import axios from 'axios';

const BusinessSearch = () => {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/api/places', {
                params: { type, location }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    return (
        <div>
            <h1>Find Businesses</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Business Type:
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </label>
                <br />
                <label>
                    City/Area:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Search</button>
            </form>
            <div>
                {results.map((business, index) => (
                    <div key={index}>

                        <h2><strong>Business Name: </strong>{business.name}</h2>
                        <p><strong>Address: </strong>{business.formatted_address}</p>
                        <p><strong>Opening Hours: </strong>{business.opening_hours?.open_now? 'Open' : 'Closed'}</p>
                        <p><strong>Rating: </strong>{business.rating}</p>
                        <p><strong>Website: </strong><a href={business.website}>{business.website}</a></p>
                        <p><strong>Phone Number: </strong>{business.formatted_phone_number}</p>

                        <hr/>
                        <hr/>
                        <hr/>




                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessSearch;
