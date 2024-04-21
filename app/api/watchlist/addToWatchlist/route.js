import Watchlist from '@models/watchlist';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

// The route that will handle the authentication process
const handler = async (req, res) => {
    const user = req.nextUrl.searchParams.get('user');
    const body = await req.json();
    const newName = body.addedName;
    const newTicker = body.addedTicker;
    const newDate = body.addedDate;
    const newCost = body.addedCost;

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
            nameList: [...watchlistInfo.nameList, newName],
            tickerList: [...watchlistInfo.tickerList, newTicker],
            dateAddedList: [...watchlistInfo.dateAddedList, newDate],
            costList: [...watchlistInfo.costList, newCost],
        }
    );

    if (response) {
        return NextResponse.json(
            {status: 200}
        );
        
    } else {
        return NextResponse.json({
            message: "Edit of this watchlist failed."
          }, {
            status: 400,
          })
    }
}


export { handler as POST};