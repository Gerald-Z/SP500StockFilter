

import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Padding from '@components/Padding';


export const metadata = {
    title: "S&P 500 Stock Filter",
    description: "Quickly Search Through Stocks in the S&P500 Index with your own criterias."
}


const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className='main'>
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        <Padding />
                        {children}
                    </main>
                </Provider>
                
            </body>
        </html>
    )
}

export default RootLayout