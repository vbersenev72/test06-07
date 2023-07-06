const pg = require('pg')
const fs = require('fs')
const axios = require('axios')

const dotenv = require('dotenv')

dotenv.config()

const config = {
        connectionString: process.env.DB_ACCESS,
        ssl: {
            rejectUnauthorized: true,
            ca: fs
            .readFileSync("./root.crt")
            .toString()
        }
    };

const writeData = async () => {
    const response = await axios.get("https://rickandmortyapi.com/api/character/306")
    const result = response.data

    const conn = new pg.Client(config)

    conn.connect((err) => {
        if (err) throw err;
    });

    const data = [result.name, result.id, result.name, result.status, result.species, result.type, result.gender, result.origin.name, result.origin.url, result.location.name, result.location.url, result.image, result.episode[0], result.url, result.created]

    conn.query("CREATE TABLE IF NOT EXISTS vbersenev72(id SERIAL PRIMARY KEY, name TEXT, data JSONB NOT NULL DEFAULT '{}')", []);

    conn.query(`INSERT INTO vbersenev72(name, data) VALUES ($1, jsonb_build_object('id', $2::text, 'name', $3::text, 'status', $4::text, 'species', $5::text, 'type', $6::text, 'gender', $7::text, 'origin', jsonb_build_object('name', $8::text, 'url', $9::text), 'location', jsonb_build_object('name', $10::text, 'url', $11::text), 'image', $12::text, 'episode', $13::text, 'url', $14::text, 'created', $15::text))`
    , data);
    
    conn.query('SELECT * FROM vbersenev72', [], (err, q) => {
        if (err) throw err;
        console.log('data : ' + JSON.stringify(q.rows));
    });

}

writeData()

