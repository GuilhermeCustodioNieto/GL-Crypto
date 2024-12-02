USE db_crypto;

/* Inserts para os autores */
INSERT INTO cryptos(author, createdAt, updatedAt) 
VALUES 
('Satoshi Nakamoto', NOW(), NOW()),
('Vitalik Buterin', NOW(), NOW()),
('Charles Hoskinson', NOW(), NOW()),
('Gavin Wood', NOW(), NOW()),
('Jed McCaleb', NOW(), NOW());

/* Inserts para as moedas */
INSERT INTO money(name, imgUrl, abbreviation, type, valueInDollar, cryptoId, realMoneyId, createdAt, updatedAt) 
VALUES 
('Bitcoin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'BTC', 'Crypto', 50000, 1, null, NOW(), NOW()),
('Ethereum', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'ETH', 'Crypto', 1800, 2, null, NOW(), NOW()),
('Cardano', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'ADA', 'Crypto', 0.35, 3, null, NOW(), NOW()),
('Polkadot', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'DOT', 'Crypto', 6, 4, null, NOW(), NOW()),
('Stellar', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'XLM', 'Crypto', 0.10, 5, null, NOW(), NOW()),
('Litecoin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'LTC', 'Crypto', 150, 1, null, NOW(), NOW()),
('Ripple', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'XRP', 'Crypto', 0.45, 5, null, NOW(), NOW()),
('Tether', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'USDT', 'Crypto', 1, 2, null, NOW(), NOW()),
('Solana', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'SOL', 'Crypto', 25, 3, null, NOW(), NOW()),
('Dogecoin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'DOGE', 'Crypto', 0.06, 4, null, NOW(), NOW()),
('Binance Coin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'BNB', 'Crypto', 300, 5, null, NOW(), NOW()),
('Shiba Inu', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'SHIB', 'Crypto', 0.000007, 1, null, NOW(), NOW()),
('TRON', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'TRX', 'Crypto', 0.08, 2, null, NOW(), NOW()),
('Monero', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'XMR', 'Crypto', 200, 3, null, NOW(), NOW()),
('Tezos', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'XTZ', 'Crypto', 1.2, 4, null, NOW(), NOW()),
('Avalanche', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'AVAX', 'Crypto', 14, 5, null, NOW(), NOW()),
('Zcash', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'ZEC', 'Crypto', 50, 1, null, NOW(), NOW()),
('Dash', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'DASH', 'Crypto', 40, 2, null, NOW(), NOW()),
('Filecoin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'FIL', 'Crypto', 7, 3, null, NOW(), NOW()),
('Aave', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'AAVE', 'Crypto', 80, 4, null, NOW(), NOW()),
('Chainlink', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'LINK', 'Crypto', 7.5, 5, null, NOW(), NOW()),
('NEO', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'NEO', 'Crypto', 8, 1, null, NOW(), NOW()),
('VeChain', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'VET', 'Crypto', 0.02, 2, null, NOW(), NOW()),
('EOS', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'EOS', 'Crypto', 0.9, 3, null, NOW(), NOW()),
('IOTA', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'MIOTA', 'Crypto', 0.16, 4, null, NOW(), NOW()),
('Bitcoin Cash', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'BCH', 'Crypto', 230, 5, null, NOW(), NOW()),
('Theta', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'THETA', 'Crypto', 0.7, 1, null, NOW(), NOW()),
('Cosmos', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'ATOM', 'Crypto', 10, 2, null, NOW(), NOW()),
('Algorand', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'ALGO', 'Crypto', 0.1, 3, null, NOW(), NOW()),
('Maker', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'MKR', 'Crypto', 1100, 4, null, NOW(), NOW()),
('Kusama', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'KSM', 'Crypto', 20, 5, null, NOW(), NOW()),
('Hedera', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'HBAR', 'Crypto', 0.05, 1, null, NOW(), NOW()),
('Celo', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'CELO', 'Crypto', 0.4, 2, null, NOW(), NOW()),
('PancakeSwap', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'CAKE', 'Crypto', 2, 3, null, NOW(), NOW()),
('Uniswap', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'UNI', 'Crypto', 5, 4, null, NOW(), NOW()),
('Compound', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'COMP', 'Crypto', 45, 5, null, NOW(), NOW());

/*Inserts para as realMoneys*/
USE db_crypto;

/* Inserts para as realMoneys */
INSERT INTO real_moneys(country, symbol, createdAt, updatedAt) 
VALUES 
('United States Of America', '$', NOW(), NOW()),
('European Union', '€', NOW(), NOW()),
('United Kingdom', '£', NOW(), NOW()),
('Japan', '¥', NOW(), NOW()),
('India', '₹', NOW(), NOW()),
('Brazil', 'R$', NOW(), NOW()),
('Canada', 'C$', NOW(), NOW()),
('Australia', 'A$', NOW(), NOW()),
('China', '¥', NOW(), NOW()),
('South Korea', '₩', NOW(), NOW());

/* Inserts para o money */
INSERT INTO money(name, imgUrl, abbreviation, type, valueInDollar, cryptoId, realMoneyId, createdAt, updatedAt) 
VALUES 
('US Dollar', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'USD', 'Real', 1, null, 1, NOW(), NOW()),
('Euro', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'EUR', 'Real', 1.1, null, 2, NOW(), NOW()),
('British Pound', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'GBP', 'Real', 1.25, null, 3, NOW(), NOW()),
('Japanese Yen', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'JPY', 'Real', 0.0075, null, 4, NOW(), NOW()),
('Indian Rupee', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'INR', 'Real', 0.012, null, 5, NOW(), NOW()),
('Brazilian Real', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'BRL', 'Real', 0.2, null, 6, NOW(), NOW()),
('Canadian Dollar', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'CAD', 'Real', 0.75, null, 7, NOW(), NOW()),
('Australian Dollar', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'AUD', 'Real', 0.65, null, 8, NOW(), NOW()),
('Chinese Yuan', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'CNY', 'Real', 0.14, null, 9, NOW(), NOW()),
('South Korean Won', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'KRW', 'Real', 0.00075, null, 10, NOW(), NOW()),
('Mexican Peso', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'MXN', 'Real', 0.05, null, 1, NOW(), NOW()),
('Swiss Franc', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'CHF', 'Real', 1.1, null, 2, NOW(), NOW()),
('Russian Ruble', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'RUB', 'Real', 0.015, null, 3, NOW(), NOW()),
('Hong Kong Dollar', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'HKD', 'Real', 0.13, null, 4, NOW(), NOW()),
('Turkish Lira', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'TRY', 'Real', 0.035, null, 5, NOW(), NOW()),
('South African Rand', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'ZAR', 'Real', 0.052, null, 6, NOW(), NOW()),
('Saudi Riyal', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'SAR', 'Real', 0.27, null, 7, NOW(), NOW()),
('Singapore Dollar', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'SGD', 'Real', 0.74, null, 8, NOW(), NOW()),
('Swedish Krona', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'SEK', 'Real', 0.095, null, 9, NOW(), NOW()),
('Norwegian Krone', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png', 'NOK', 'Real', 0.1, null, 10, NOW(), NOW());
