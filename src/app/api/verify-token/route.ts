import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(req: NextRequest){
  try {
    const reqBody = await req.json();
    const {token} = reqBody;
    
    const user = await User.findOne({verifyEmailToken: token, verifyEmailExpire: {$gt: Date.now()}});

    if(!user){
      return NextResponse.json({error: 'Invalid token'}, {status: 400});
    }

    user.isVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailExpire = undefined;

    await user.save();

    return NextResponse.json({message: 'Email verified successfully'}, {status: 200});

  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
  
}