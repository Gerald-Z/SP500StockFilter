import User from '@models/user';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

// The route that will handle the authentication process
const handler = async (req, res) => {
    const user = req.nextUrl.searchParams.get('user');

    await connectTodb();
    const userInfo = await User.findOne({
        email: user
    });
    if (userInfo) {
        return NextResponse.json({ 
            image: userInfo.image, 
            username: userInfo.username,
            email: userInfo.email,
            creationDate: userInfo.creationDate.toDateString()
        }, 
        {status: 200}
        );
        
    } else {
        return NextResponse.json({
            message: "This profile does not exist!"
          }, {
            status: 400,
          })
    }
}


export { handler as GET};