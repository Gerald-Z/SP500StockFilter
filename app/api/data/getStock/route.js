import Stock from '@models/stock';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";


const handler = async (req, res) => {
    const stock = req.nextUrl.searchParams.get('symbol');

    await connectTodb();
    const stockInfo = await Stock.findOne({
        symbol: stock
    });

    if (stockInfo) {
        return NextResponse.json(stockInfo, 
            {status: 200}
        );
        
    } else {
        return NextResponse.json({
            message: "This stock does not exist!"
          }, {
            status: 400,
          })
    }
}


export { handler as GET};