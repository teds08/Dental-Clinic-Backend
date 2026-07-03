import { pool } from "../../../config/db";


export class DeleteCouponRepository {


async delete(id:number){
const result = await pool.query(

`
DELETE FROM coupons
WHERE id=$1
RETURNING *
`,
[id]
);


return result.rows[0];


    }
}