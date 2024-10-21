import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";

export const getBooks = async(req: Request, res: Response) => {
    try {
        const { search } = req.body
        let books;
        
        if(!search) {
            books = await querySql(
                'SELECT * FROM books',
                []
            )
        } else {
            books = await querySql(
                'SELECT * FROM books WHERE title LIKE ? or author LIKE ?',
                [search, search]
            )
        }
    
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