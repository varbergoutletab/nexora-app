"use client";

import { useEffect, useState } from "react";

type CryptoCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type ForexRatesResponse = {
  rates: Record<string, number>;
};

type StockItem = {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
};

function getCompanyLogo(symbol: string) {
  const logos: Record<string, string> = {
    AAPL: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    TSLA: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    MSFT: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    NVDA: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
    IBM: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  };

  return logos[symbol] || "https://via.placeholder.com/40";
}

function getCompanyName(symbol: string) {
  const map: Record<string, string> = {
    AAPL: "Apple",
    TSLA: "Tesla",
    MSFT: "Microsoft",
    NVDA: "Nvidia",
    IBM: "IBM",
  };

  return map[symbol] || symbol;
}

export default function MarketPage() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [forex, setForex] = useState<Record<string, number>>({});
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loadingStocks, setLoadingStocks] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Crypto fetch error:", error);
      }
    };

    const fetchForex = async () => {
      try {
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,SAR,AED,CHF,CAD,AUD,CNY"
        );
        const data: ForexRatesResponse = await res.json();
        setForex(data.rates || {});
      } catch (error) {
        console.error("Forex fetch error:", error);
      }
    };

    const fetchStocks = async () => {
      try {
        const symbols = ["AAPL", "TSLA", "MSFT", "NVDA", "IBM"];

        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`
            );
            const data = await res.json();
            const q = data["Global Quote"] || {};

            return {
              symbol,
              price: q["05. price"] || "-",
              change: q["09. change"] || "-",
              changePercent: q["10. change percent"] || "-",
            };
          })
        );

        setStocks(results);
      } catch (error) {
        console.error("Stocks fetch error:", error);
      } finally {
        setLoadingStocks(false);
      }
    };

    fetchCrypto();
    fetchForex();
    fetchStocks();

    const interval = setInterval(() => {
      fetchCrypto();
      fetchForex();
      fetchStocks();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-yellow-400 glow">
          Market Overview
        </h1>

        {/* Crypto */}
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-red-400">
            Crypto Market
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className="card p-5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="h-10 w-10"
                  />

                  <div>
                    <div className="font-semibold text-yellow-400">
                      {coin.name}
                    </div>
                    <div className="text-sm uppercase text-red-300">
                      {coin.symbol}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-2xl font-bold">
                  ${coin.current_price.toLocaleString()}
                </div>

                <div
                  className={`mt-2 text-sm font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Forex */}
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-red-400">
            Global Exchange Rates
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {Object.entries(forex).map(([code, value]) => (
              <div
                key={code}
                className="card p-5"
              >
                <div className="text-lg font-semibold text-yellow-400">
                  USD / {code}
                </div>

                <div className="mt-3 text-2xl font-bold">
                  {value.toFixed(2)}
                </div>

                <div className="mt-2 text-sm text-red-300">
                  Reference Rate
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stocks */}
        <section>
          <h2 className="mb-5 text-2xl font-semibold text-red-400">
            Global Stocks
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {loadingStocks ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              stocks.map((stock) => {
                const negative = stock.change.startsWith("-");

                return (
                  <div
                    key={stock.symbol}
                    className="card p-5"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getCompanyLogo(stock.symbol)}
                        alt={stock.symbol}
                        className="h-10 w-10 rounded-full bg-white p-1"
                      />

                      <div>
                        <div className="font-semibold text-yellow-400">
                          {stock.symbol}
                        </div>
                        <div className="text-sm text-red-300">
                          {getCompanyName(stock.symbol)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-2xl font-bold">
                      {stock.price !== "-"
                        ? `$${Number(stock.price).toLocaleString()}`
                        : "-"}
                    </div>

                    <div
                      className={`mt-2 text-sm font-semibold ${
                        negative ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {stock.change} ({stock.changePercent})
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Display only - no real trading
          </p>
        </section>
      </div>
    </div>
  );
}