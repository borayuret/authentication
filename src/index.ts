import express from 'express';

// create instance server
const app = express();

const PORT = 3000;

// add routing for path /
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

// start express server
app.listen(PORT, () => {
    console.log(`App runs on port ${PORT}`)
})

export default app;