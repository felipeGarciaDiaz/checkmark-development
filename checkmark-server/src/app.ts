import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/sequelize';
import User from './models/Copyrights';
import copyrightRoutes from './routes/copyrights.routes';
import { CopyrightsController } from './controllers/copyrights.controller';
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', copyrightRoutes); // Use the routes defined in Routes class
const copyrightsController = new CopyrightsController();

sequelize.sync({force: true}).then(() => {
    copyrightsController.createTestData();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});