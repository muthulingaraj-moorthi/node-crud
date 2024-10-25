import express from 'express';
import bodyParser from 'body-parser'
const app = express();
import userRoutes from './Schema/User.js';
import profileRouter from "./Schema/Profile.js";
import mongoose from 'mongoose';

const PORT = 5000;

app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use('/users', userRoutes);
app.use('/profile',profileRouter)

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'))


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));