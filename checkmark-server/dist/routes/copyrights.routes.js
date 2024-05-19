"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyrightsRouter = void 0;
const express_1 = require("express");
class CopyrightsRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Create a new registration item
        this.router.post('/registrations', (req, res) => {
            // Controller logic will go here
            res.status(201).json({ message: 'Create route' });
        });
        // Get all registration items
        this.router.get('/registrations', (req, res) => {
            // Controller logic will go here
            res.status(200).json({ message: 'Get all route' });
        });
        // Get a single registration item by ID
        this.router.get('/registrations/:id', (req, res) => {
            // Controller logic will go here
            res.status(200).json({ message: 'Get single route' });
        });
        // Delete a registration item by ID
        this.router.delete('/registrations/:id', (req, res) => {
            // Controller logic will go here
            res.status(204).json({ message: 'Delete route' });
        });
    }
}
exports.CopyrightsRouter = CopyrightsRouter;
exports.default = new CopyrightsRouter().router;
