import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";

export const getAdminDataDashboard = async(req: Request, res: Response) => {
    try {
        // const dummyid = 0
        // const countMembers = await querySql(
        //     'SELECT count(*) FROM staffs inner join members on members.staffs_id = staffs.id group by staffs.id having staffs.id = ?', 
        //     [dummyid]
        // )

        const countMembers = await querySql(
            'select count(*) from members',
            []
        )

        const countLendings = await querySql(
            'select count(*) from member_transactions',
            []
        )

        const countBooks = await querySql(
            'select count(*) from books',
            []
        )
        
        res.status(200).json({
            error: false,
            message: 'get admin data dashboard success',
            data: {
                countBooks,
                countLendings,
                countMembers
            }
        })

    } catch (error: any) {
        res.status(error.message || 500).json({
            error: true,
            message: error.message,
            data: {}
        })
    }
}