import User from '@models/user';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

// The route that will handle the authentication process
const handler = async (req, res) => {
    const user = req.nextUrl.searchParams.get('user');
    const body = await req.json();
    const newUsername = body.name;

    await connectTodb();
    const userInfo = await User.findOne({
        email: user
    });
    const response = await User.replaceOne(
        {
            email: user
        },
        {
            image: userInfo.image, 
            email: userInfo.email,
            creationDate: userInfo.creationDate.toDateString(),
            username: newUsername
        }
    );

    if (response) {
        return NextResponse.json(
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


export { handler as POST};