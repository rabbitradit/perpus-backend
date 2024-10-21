import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";
import { format, isAfter, isBefore } from "date-fns";
import { IStaff } from "./types";

interface IFindStaff extends IStaff {
    start_schedule: 'string',
    end_schedule: 'string',
    name: 'string',
}

export const loginStaff = async(req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const staff = await querySql(
            `SELECT * FROM staffs 
            JOIN staff_schedule on staff_schedule.id = staffs.staff_schedule_id
            JOIN library_branch on library_branch.id = staffs.library_branch_id 
            where staffs.username = ? AND staffs.password = ?`, 
            [username, password]
        ) as IFindStaff[]

        if(staff.length <= 0) throw {msg: 'Username or password invalid', status: 406}

        if(!(isAfter(format(new Date() ,'yyyy-MM-dd kk:mm:ss'), `${format(new Date(), 'yyyy-MM-dd')} ${staff[0].start_schedule}`) && 
        isBefore(format(new Date() ,'yyyy-MM-dd kk:mm:ss'), `${format(new Date(), 'yyyy-MM-dd')} ${staff[0].end_schedule}`))) {
            throw {msg: 'Login Failed!', status: 406}
        }

        res.status(200).json({
            error: false,
            message: 'Login Success',
            data: {
                username,
                role: 'STAFF',
                id: staff[0].id,
                name: staff[0].name
            }

        })
    } catch (error: any) {
        res.status(error.status || 500).json({
            error: true,
            message: error.msg || error.message,
            data: {}
        })
    }

}