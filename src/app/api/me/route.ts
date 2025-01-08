import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ data: user ,message: 'user found' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}