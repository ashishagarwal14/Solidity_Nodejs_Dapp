import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/IsContract.module.css'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'


var jsoncoins = []
const axios = require('axios');
let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=250', {
            headers: {
                'X-CMC_PRO_API_KEY': '9acaa99c-8e80-4024-a3a5-c3dc2448dea0',
            },
        });
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    }
    try {
        if (response) {
            // success
            var json = response.data;


            resolve(json);
            //console.log(json);

            var x1 = json.data;
            var i = 0;
            x1.forEach((item) => {
                if (Math.abs(item.quote.USD.volume_change_24h) >= 14) {
                    var data = {};
                    data['name'] = item.name;
                    data['volume_change_24h'] = item.quote.USD.volume_change_24h;
                    data['price'] = item.quote.USD.price;
                    data['symbol'] = item.symbol;
                    jsoncoins[i] = data;
                    i++;
                    //console.log('name: ' + item.name);
                    //console.log('24_vol_change: ' + item.quote.USD.volume_change_24h)
                }
            });
        }
    }
    catch (ex) {
        console.log(ex);
    }
});


const apicall = () => {
    const updateResult = async () => {
        if (typeof window !== "undefined") {

            var listDiv = document.getElementById('list-coins');
            var ul = document.createElement('ul');

            // console.log(jsoncoins);
            for (var i = 0; i < jsoncoins.length; i++) {
                var li = document.createElement('li');
                var textnode = document.createTextNode(i + 1 + ": " + jsoncoins[i].name + '(' + jsoncoins[i].symbol + ') ' + ' ==> (price) :' + jsoncoins[i].price
                    + ' ==> (Volume Change 24h) : ' + jsoncoins[i].volume_change_24h);
                //console.log(textnode);
                li.appendChild(textnode);
                ul.appendChild(li);
                var fextnode = document.createTextNode("----------------------------------------------------------------------------------------------------------------");
                li = document.createElement('li');
                li.appendChild(fextnode);
                ul.appendChild(li);
                if (i >= 99) {
                    break
                }
            }
            listDiv.appendChild(ul);
        }
    }
    return (
        <div className={styles.main}>
            <Head>
                <title>Top Cryptos with more than 14% change in daily volume</title>
                <meta name="description" content="A blockchain app" />
            </Head>
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>Top 24 Hour Volume changed Crypto</h1>
                    </div>
                </div>
            </nav>

            <section className="mt-5">
                <div className="container">
                    <div className="field">
                        <label className="label">Show me the 100 Coins (sorted by market cap) </label>

                        <button
                            onClick={updateResult}
                            className="button is-primary mt-2"
                        >Show</button>
                    </div>
                </div>
            </section>
            <section>
                <div id="list-coins">

                </div>
            </section>



        </div>
    )
}

export default apicall