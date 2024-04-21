import Stock from '@models/stock';

import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";


const handler = async (req, res) => {
    await connectTodb();
    const stockInfo = await Stock.distinct('symbol');

    if (stockInfo) {
        return NextResponse.json(
            {list: stockInfo}, 
            {status: 200}
        );
        
    } else {
        return NextResponse.json({
            message: "There are no symbols in the database."
          }, {
            status: 400,
          })
    }
}


export { handler as GET};