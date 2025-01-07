import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect();

export async function POST(req: NextRequest){
  try {
    const reqBody = await req.json();
    const {username, email, password} = reqBody;
    console.log(reqBody);

    // check if user already exists

    const user = await User.findOne({email});

    if(user){
      return NextResponse.json({error: 'User already exists'}, {status: 400});
    }

    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    // create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log(savedUser);  

    return NextResponse.json({message: 'User created successfully'}, {status: 201})
    
  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}