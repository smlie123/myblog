// lib/db.js
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",    // MySQL 地址
  user: "root",         // 数据库用户名
  password: "wangjia33", // 数据库密码
  database: "myblog" // 数据库名
});