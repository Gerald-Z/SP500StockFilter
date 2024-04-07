import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import Watchlist from '@models/watchlist';

import { connectTodb } from "@utils/database";

// The route that will handle the authentication process
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    
    // Calls the callback functions
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();

            return session;
        },

        async signIn({ profile }) {
            try {
                await connectTodb();
                const today = new Date();

                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });      

                // if not, create a new user and save it to the database 
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                        creationDate: today,
                    })

                    // Creates a new watchlist that is tied to the user profile by email.
                    // By default, there is no ticker in the watchlist.
                    await Watchlist.create({
                        userEmail: profile.email,
                        nameList: 'Example Name',
                        tickerList: 'Example Ticker',
                        dateAddedList: new Date(),
                        costList: 10
                    })
                }
                return true;

            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST};