import Watchlist from '@models/watchlist';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

// The route that will handle the authentication process
const handler = async (req, res) => {
    const user = req.nextUrl.searchParams.get('user');

    await connectTodb();
    const watchlistInfo = await Watchlist.findOne({
        userEmail: user
    });
    if (watchlistInfo) {
        return NextResponse.json({ 
            tickerList: watchlistInfo.tickerList, 
            nameList: watchlistInfo.nameList,
            dateAddedList: watchlistInfo.dateAddedList,
            costList: watchlistInfo.costList,
            size: watchlistInfo.tickerList.length
        }, 
        {status: 200}
        );
    } else {
        return NextResponse.json({
            message: "This user does not have a watchlist!"
          }, {
            status: 400,
          })
    }
}


export { handler as GET};