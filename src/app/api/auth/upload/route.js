import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { writeFile } from "fs/promises";

export async function POST(request) {
  const formData = await request.formData();
  // 获取上传文件
  const file = formData.get("image")
  // 将文件保存到服务器的文件系统中
  const fileBuffer = await file.arrayBuffer();
  let path = "/uploads/" + file.name;
  await writeFile('./public'+path, Buffer.from(fileBuffer));
  
  return new Response(JSON.stringify({ message: "发布成功", path: path }), { status: 201 });
 


  
}

