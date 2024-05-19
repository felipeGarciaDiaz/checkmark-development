import Copyright, { ICopyrightMain } from "../models/Copyrights";
import { Request, Response } from 'express';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';
import mockData from '../models/mock-data.json';
import { Op, Sequelize } from "sequelize";
export class CopyrightsController {
    constructor() { }

    public getCopyrights(req: Request, res: Response): void {
        const { copyright, publication_year, date_record_entered_on_file } = req.body;
        const query: any = {};
        if (copyright) {
            //
            query[Op.and] = [
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('title_concatenated')),
                    { [Op.like]: `%${(copyright as string).toLowerCase()}%` }
                )];
        }
        if (publication_year) query.publication_year = publication_year;
        if (date_record_entered_on_file) query.date_record_entered_on_file = date_record_entered_on_file;

        if (!copyright) {
            res.status(400).json({ message: 'Copyright Name Required' });
            return;
        }
        console.log("Query object:", JSON.stringify(query, null, 2)); // Log query object for debugging

        from(Copyright.findAll({ where: query }))
            .pipe(
                map((data: Copyright[] | null) => {
                    if (!data || data.length === 0) {
                        res.status(404).json({ message: 'No records found' });
                    } else {
                        res.json(data);
                    }
                }),
                catchError(error => {
                    res.status(500).json({ message: 'Server error', error });
                    return of(undefined);
                })
            )
            .subscribe();

    }
    public async createTestData(): Promise<any> {
        from(Copyright.bulkCreate(mockData))
            .pipe(
                map(() => console.log('Data created successfully')),
                catchError(error => {
                    console.error('Error creating data:', error);
                    return of(undefined);
                })
            )
    }
}
