import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// create instance server
const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const PORT = 3000;


// middleware to parse incoming requests
app.use(express.json())

// HTTP request logger middleware
app.use(morgan('common'))

// HTTP security middleware headers
app.use(helmet())

// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 2 requests per `window` (here, per 1 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      message: 'Too many requests from this IP, please try again after 15 minutes',
    })
  )

// add routing for path /
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})


app.post('/', (req, res) => {
    console.log(req.body)
    res.json({
        message: 'Hello World from post',
        data: req.body
    })
})

// start express server
app.listen(PORT, () => {
    console.log(`App runs on port ${PORT}`)
})

export default app;