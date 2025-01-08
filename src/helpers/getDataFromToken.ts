import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {

  try {
  
    const token = request.cookies.get("token")?.value || "";
    const data:any = jwt.verify(token, process.env.JWT_SECRET!);
    return data.id;    
    
  } catch (error) {
    throw new Error(error.message);
  }

}