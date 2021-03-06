require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 5000;
const sequelize = require('./db.js');
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

//ERROR HANDLER
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
