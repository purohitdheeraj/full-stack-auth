import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest){
  try {
    const reqBody = await req.json();
    const {email, password} = reqBody;

    const user = await User.findOne({email});

    if(!user){
      return NextResponse.json({error: 'User does not exist'}, {status: 400});
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if(!isMatch){
      return NextResponse.json({error: 'Invalid credentials'}, {status: 400});
    }

    // create token
    const tokeData = {
      id: user._id,
      email: user.email,
      username: user.username,
      isVerified: user.isVerified
    }

    const token = jwt.sign(tokeData, process.env.JWT_SECRET, {expiresIn: '1d'});

    const response = NextResponse.json({
      message: 'User logged in successfully',
    }, {status: 200});

    response.cookies.set('token', token, {httpOnly: true})

    return response;

  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}