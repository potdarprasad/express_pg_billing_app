(async () => {
    console.log('Running create database commands');
    const pool = require('../config/db.config');

    await pool.query('create extension if not exists "uuid-ossp";');

    await pool.query(`
        create table if not exists users(
            id uuid default uuid_generate_v4(),
            first_name varchar(50),
            last_name varchar(50),
            email varchar(100) unique not null,
            password varchar(100),
            user_type varchar(20) default APPUSER,
            primary key(id)
        );
    `);

    console.log('End running create database commands');
})();