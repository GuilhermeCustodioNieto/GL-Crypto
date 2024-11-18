import CryptoWallet from "../models/CryptoWallet.js";
import Wallet from "../models/Wallet.js";

const TransationController = {
    buyCrypto: async (req, res) => {
        const {idCrypto, idWallet, balance} = req.body;

        const wallet = await Wallet.findByPk(req.params.id, {
            include: [{ model: CryptoWallet, as: "cryptoWallets" }],
          });

          
          if(wallet) {
              console.log(wallet);
              
          }

          res.send();

        // 1. pegar carteira 
        // 2, caso na carteira eu consiga fazer um findById com o idCrypto, vma


        // Vou precisar pegar a carteira, a moeda e a quantidade de moedas.
        // Caso a crypto não exista na carteira, vamos criar uma nova.
        // Caso exista, vamos somar a balance
    }
}

export default TransationController