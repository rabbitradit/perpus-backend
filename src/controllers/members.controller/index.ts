import { Request, Response } from "express";
import { querySql } from "../../util/query.sql";
import { v4 as uuid } from "uuid";

export const getMembers = async(req: Request, res: Response) => {
    try {
        const { search, idSearch, page = 1, limit_data = 5 } = req.query
        let members;
        const offset = Number(limit_data) * (Number(page) - 1)

        if(!search) {
            members = await querySql(
                'SELECT * FROM members LIMIT ? OFFSET ?',
                [Number(limit_data), offset]
            )
        } else if(search && !idSearch) {
            members = await querySql(
                'SELECT * FROM members WHERE id LIKE ? or name LIKE ? or email LIKE ? LIMIT ? OFFSET ?',
                [search, search, search, Number(limit_data), offset]
            )
        } else if(idSearch && !search) {
            members = await querySql(
                'SELECT * FROM MEMBERS WHERE id LIKE ?',
                [idSearch]
            )
        }
        
        const totalData: any = await querySql(
            'SELECT COUNT(*) as totalData FROM members',
            []
        )

        const totalPage = Math.ceil(totalData[0].totalData)

        res.status(200).json({
            error: false,
            message: 'Get data members success',
            data: {members, totalPage}
        })
        
    } catch (error: any) {
        res.status(500).json({
            error: true,
            message: 'Get data members failed',
            data: {}
        })
    }   
}

export const createMember = async(req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, phone_number, address, id_card_number } = req.body
        const randId = uuid()

        const id = `MMBER-${randId.slice(0, 10)}-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay() + 1}`
        const created_at = new Date()
        
        const checkDuplicate: any = await querySql(
            'SELECT * FROM members where email = ? OR phone_number = ? OR id_card_number = ?',
            [email, phone_number, id_card_number]
        )
        console.log(checkDuplicate)

        if(checkDuplicate.length > 0) {
            console.log(checkDuplicate)
            throw {msg: 'Email or Phone Number or ID Card Number have been used'}
        }

        await querySql(
            'INSERT INTO members(id, first_name, last_name, email, phone_number, address, id_card_number, created_at) values(?, ?, ?, ?, ?, ?, ?, ?)',
            [id, first_name, last_name, email, phone_number, address, id_card_number, created_at]
        )

        res.status(201).json({
            error: false,
            message: 'create data member success',
            data: {
                id,
                first_name, 
                last_name, 
                email, 
                phone_number, 
                address, 
                id_card_number
            }
        })
    } catch (error: any) {
        res.status(error.status || 500).json({
            error: true,
            message: error.msg,
            data: {}
        })
    }
}

export const countMembers = async(req: Request, res: Response) => {
    const membersNum = await querySql(
        'SELECT COUNT(*) FROM members',
        []
    )
}