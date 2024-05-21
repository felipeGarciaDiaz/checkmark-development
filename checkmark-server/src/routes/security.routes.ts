import { Router, Request, Response } from "express";

export class SecurityRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/csrf-token', (req: Request, res: Response) => {
            res.json({ csrfToken: req.csrfToken() })
        });
    }
}

export default new SecurityRoutes().router;
