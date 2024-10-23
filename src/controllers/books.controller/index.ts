import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";

export const getBooksBySearch = async(req: Request, res: Response) => {
    try {
        const { data } = req.query
        const books = await querySql(
            'SELECT * FROM books WHERE title LIKE ? or author LIKE ?',
            [`%${data}%`, `%${data}%`]
        );
    
        res.status(200).json({
            error: false,
            message: 'Get books data success',
            data: books
        })
    } catch (error: any) {
        res.status(error.status || 500).json({
            error: false,
            message: 'Get books data success',
            data: []
        })
        
    }
}