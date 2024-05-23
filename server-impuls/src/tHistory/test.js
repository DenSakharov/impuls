const { Client } = require('pg');

const client = new Client({
    host: '',
    user: '',
    database: '',
    password: '',
    port:,
});

const insert = async (ulog_id,datetime, author, notes, object_id, logtype, modules, actions,date_edited) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO "t_changehistory" ("log_id", "datetime", "author", "notes", "object_id", "logtype", "modules", "actions","date_edited")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [log_id, datetime, author, notes, object_id, logtype, modules, actions,date_edited]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               // closes connection
    }
};

insertRecord('1eb75e77-6h4b-4076-83b5-753032757f41','2024-05-21 12:56:25.709','UserName', 'test record','000001','error','addproj','Дублирование названия проекта',null).then(result => {
    if (result) {
        console.log('log record inserted');
    }
});