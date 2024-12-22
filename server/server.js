const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // This is needed to be able to read the JSON in the request's body

const settingsPath = path.join(__dirname, 'store-settings.json');


app.get('/settings', async (req, res) => {
    try {
        const data = await fs.readFile(settingsPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error loading settings', error });
    }
});

app.put('/settings', async (req, res) => {
    try {
        await fs.writeFile(settingsPath, JSON.stringify(req.body, null, 2), 'utf8');
        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving settings', error });
    }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});