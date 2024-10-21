import db from "../connection";
import { promisify } from "util";

const query = promisify(db.query).bind(db)

export const querySql = async(sql: string, values: any) => {
    return await query({
        sql,
        values
    })
}