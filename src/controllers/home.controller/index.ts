import { query, Request, Response } from "express"
import { promisify } from "util"
import db from "../../connection"

const getData = promisify(db.query).bind(db)

export const getHomeData = async(req: Request, res: Response) => {
    try {
        const membersNum = await getData({
            sql: 'SELECT COUNT(*) as membersNum FROM members'
        })
        const lendingsNum = await getData({
            sql: 'SELECT COUNT(*) as lendingsNum FROM member_transactions'
        })
        const booksNum = await getData({
            sql: 'SELECT COUNT(*) as booksNum FROM books'
        })

        res.status(200).json({
            error: false,
            message: 'Get home page data success',
            data: {
                membersNum,
                lendingsNum,
                booksNum
            }
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Get home page data failed',
            data: {}
        })
    }
}