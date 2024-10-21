import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";
import { v4 as uuid } from "uuid";

export const getLendingData = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        
        const lendingData = await querySql(
            'SELECT * FROM member_transactions as mt INNER JOIN member_transaction_details as mtd on mt.id = mtd.id WHERE mt.id = ?',
            [id]
        )
        
        res.status(200).json({
            error: false,
            message: 'get lending detail data success',
            data: lendingData
        })
    } catch (error) {
        res.status(500).json({
            error: false,
            message: 'get lending detail data success',
            data: {}
        })
        
    }
}

export const createLendingData = async(req: Request, res: Response) => {
    try {
        const { members_id, books_id } = req.body
        const staffs_id = 1
        const id = uuid()
        const due_date = new Date().setDate(new Date().getDate() + 3)
    
        await querySql(
            'INSERT INTO member_transactions(members_id, staffs_id, due_date) values(?, ?, ?)',
            [id, members_id, staffs_id, due_date]
        )
    
        const member_transactions_id = id

        for(let i = 0; i < books_id.length; i++) {
            await querySql(
                'INSERT INTO member_transaction_details(books_id, member_transactions_id) values(?, ?)',
                [books_id, member_transactions_id]
            )
        }

        res.status(201).json({
            error: false,
            message: 'Create transaction data success',
            data: {
                members_id,
                books_id
            }
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Create transaction data failed',
            data: {}
        })
        
    }

}

