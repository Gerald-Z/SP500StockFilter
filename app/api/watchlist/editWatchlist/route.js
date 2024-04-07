import Watchlist from '@models/watchlist';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

// The route that will handle the authentication process
const handler = async (req, res) => {
    const user = req.nextUrl.searchParams.get('user');
    const body = await req.json();
    const newName = body.newName;
    const newTicker = body.newTicker;
    const newDate = body.newDate;
    const newCost = body.newCost;

    await connectTodb();
    const watchlistInfo = await Watchlist.findOne({
        userEmail: user
    });
    const response = await Watchlist.replaceOne(
        {
            userEmail: user
        },
        {
            userEmail: watchlistInfo.userEmail,
            nameList: newName,
            tickerList: newTicker,
            dateAddedList: newDate, 
            costList: newCost,
        }
    );

    if (response) {
        return NextResponse.json(
            {status: 200}
        );
        
    } else {
        return NextResponse.json({
            message: "This watchlist does not exist!"
          }, {
            status: 400,
          })
    }
}


export { handler as POST};