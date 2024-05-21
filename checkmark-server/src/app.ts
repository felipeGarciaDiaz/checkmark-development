import express, { NextFunction } from 'express';

// Functionality middleware
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

// Performance middleware
import compression from 'compression';

// Security middleware
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import csurf from 'csurf';

// Monitoring middleware
import statusMonitor from 'express-status-monitor';
import morgan from 'morgan';
import winston from 'winston';

import sequelize from './config/sequelize';
import User from './models/Copyrights';
import copyrightRoutes from './routes/copyrights.routes';
import { CopyrightsController } from './controllers/copyrights.controller';
import { Request, Response } from 'express';
import securityRoutes from './routes/security.routes';


const app = express();
const port = 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: '../logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: '../logs/combined.log'
        })
    ]
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


app.use(compression());

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(csurf());


const limits = rateLimit({
    windowMs: 10 * 50 * 1000,
    max: 25,
    message: 'Too many requests, try again later...'
});


app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api', copyrightRoutes);
app.use('/general', securityRoutes)
const copyrightsController = new CopyrightsController();

sequelize.sync({force: true}).then(() => {
    copyrightsController.createTestData();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});

