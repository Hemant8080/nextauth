import { getDataFromtoken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromtoken(request);
        const user = await User.findOne({_id: userId.id}).select("-password");
        console.log(user);
        
        return NextResponse.json({
            mesaaage: "User found",
            data: user,
            username:userId.username
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}