import { pool } from "../../../config/db";


export class CouponStatusRepository {


async updateStatus(id:number,status:boolean){


const result = await pool.query(
`
UPDATE coupons
SET
is_active = $1,
updated_at = NOW()
WHERE id = $2
RETURNING *
`,

[status,id]


);


return result.rows[0];


        }


}