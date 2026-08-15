import { pool } from "../../config/db";


export class UpdateCouponRepository {

async update(id:number, data:any){
const result = await pool.query(

`
UPDATE coupons
SET
name = COALESCE($1,name),
type = COALESCE($2,type),
discount_percent = COALESCE($3,discount_percent),
required_points = COALESCE($4,required_points),
updated_at = NOW()

WHERE id = $5
RETURNING *
`,

[
data.name,
data.type,
data.discount_percent,
data.required_points,
id
]


);


return result.rows[0];

    }
}