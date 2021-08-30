const pool = require('../config/postgres_config');

module.exports.get_profile_data = async function (fields, key, value) {
    try {
        //retrieve data from DB
        return await pool.query(`SELECT ${fields.join(',')} FROM user_profile WHERE ${key} = $1`, [value]);
    } catch (error) {
        console.log(error);
    }
}

module.exports.update_profile_data = async function (field, field_data, key, value) {
    try {
        return await pool.query(`UPDATE user_profile SET ${field} = $1 WHERE ${key} = $2`, [field_data, value]);
    } catch (error) {
        console.log(error);
        
    }  
}