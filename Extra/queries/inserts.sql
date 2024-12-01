USE db_crypto;

/*Inserts para as criptos*/
INSERT INTO cryptos(author, createdAt, updatedAt) VALUES ('Satoshi Nakamoto', NOW(), NOW());

INSERT INTO money(name, imgUrl, abbreviation, type, valueInDollar, cryptoId, realMoneyId, createdAt, updatedAt) VALUES
	('Bitcoin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png','BTC', 'Crypto', 50000, 1, null, NOW(), NOW());
    
/*Inserts para as realMoneys*/
INSERT INTO real_moneys(country, symbol,  createdAt, updatedAt) VALUES ('United States Of America', '$', NOW(), NOW());

INSERT INTO money(name, imgUrl, abbreviation, type, valueInDollar, cryptoId, realMoneyId, createdAt, updatedAt) VALUES
	('Bitcoin', 'https://images.vexels.com/content/152579/preview/orange-circle-question-mark-icon-960a07.png','BTC', 'Crypto', 50000, null, 1, NOW(), NOW());