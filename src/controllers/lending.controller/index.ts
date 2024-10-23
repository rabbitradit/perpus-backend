import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { addDays } from "date-fns";

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
        const { members_id, books_id, staffs_id } = req.body
        const id = uuid()
        const due_date = addDays(new Date(), 3)
        
        await querySql(
            'Start Transaction',
            []
        )

        const findTransactionsByDate: any = await querySql(
            'SELECT * FROM member_transactions WHERE members_id = ? ORDER BY created_at DESC LIMIT 1',
            [members_id]
        )

        if(findTransactionsByDate.length) {
            const transactionMember = format(findTransactionsByDate[0].created_at, 'yyyy-MM-dd')
            const dateNow = format(new Date(), 'yyyy-MM-dd')

            if(transactionMember === dateNow) throw {msg: 'Transaction Limit Exceeded'}
        }

        if(books_id.length > 5) throw {msg: 'Books Limit Exceeded'}

        await querySql(
            'INSERT INTO member_transactions(id, members_id, staffs_id, due_date) values(?, ?, ?)',
            [id, members_id, staffs_id, due_date]
        )
    
        const member_transactions_id = id
        
        const insertBooks = books_id?.map((bookId: any) => {
            return [bookId, member_transactions_id]
        })

        await querySql(
            'INSERT INTO member_transaction_details(books_id, member_transactions_id) VALUES ?',
            [insertBooks]
        )

        await querySql(
            'Commit',
            []
        )

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

