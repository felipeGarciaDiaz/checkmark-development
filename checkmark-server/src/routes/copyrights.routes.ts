import { Router } from 'express';
import { CopyrightsController } from '../controllers/copyrights.controller';
export class CopyrightsRouter {
  public router: Router;
  public controller: CopyrightsController;
  constructor() {
    this.router = Router();
    this.controller = new CopyrightsController();
    this.initializeRoutes();

  }

  private initializeRoutes() {

    this.router.get('/getCopyrights', this.controller.getCopyrights.bind(this.controller));
    this.router.post('/registrations', (req, res) => {
      res.status(201).json({ message: 'Create route' });
    });

    this.router.post('/addCopyright', (req, res) => {
      res.status(200).json({ message: 'Get all route' });
    });

    this.router.put('/updateCopyright', (req, res) => {
      res.status(200).json({ message: 'Get single route' });
    });
    
    this.router.delete('/deleteCopyright', (req, res) => {
      res.status(204).json({ message: 'Delete route' });
    });
  }
}

export default new CopyrightsRouter().router;
