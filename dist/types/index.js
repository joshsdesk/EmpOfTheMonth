import { pool } from '../db/connection.js';
export default class Db {
    constructor() { }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            client.release();
        }
    }
    findAllEmployees() {
        const sql = "SELECT * FROM employee";
        return this.query(sql);
    }
}
