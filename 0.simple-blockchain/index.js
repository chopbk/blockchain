"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
// Transfer of funds between two wallets
var Transaction = /** @class */ (function () {
    function Transaction(amount, payer, //public key
    payee // public key
    ) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    Transaction.prototype.toString = function () {
        console.log("Transaction: " + JSON.stringify(this));
        return JSON.stringify(this);
    };
    return Transaction;
}());
// Individual block on the chain
var Block = /** @class */ (function () {
    function Block(prevHash, transaction, ts) {
        if (ts === void 0) { ts = Date.now(); }
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        this.nonce = Math.round(Math.random() * 999999999);
    }
    Object.defineProperty(Block.prototype, "hash", {
        get: function () {
            var str = JSON.stringify(this);
            var hash = crypto.createHash("SHA256");
            hash.update(str).end();
            return hash.digest('hex');
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
// The block chain
var Chain = /** @class */ (function () {
    function Chain() {
        this.chain = [
            // Genesis block
            new Block('', new Transaction(100, 'genesis', 'satoshi'))
        ];
    }
    Object.defineProperty(Chain.prototype, "lastBlock", {
        get: function () {
            return this.chain[this.chain.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    // Proof of work system
    Chain.prototype.mine = function (nonce) {
        var solution = 1;
        console.log('⛏️ mining ');
        while (true) {
            var hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();
            var attempt = hash.digest('hex');
            if (attempt.substr(0, 4) === '0000') {
                console.log("Solved " + solution);
                return solution;
            }
            solution += 1;
        }
    };
    Chain.prototype.addBlock = function (transaction, senderPublicKey, signature) {
        var verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());
        var isValid = verify.verify(senderPublicKey, signature);
        if (isValid) {
            var newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    };
    // Singleton instance
    Chain.instance = new Chain();
    return Chain;
}());
var Wallet = /** @class */ (function () {
    function Wallet() {
        var keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
    }
    Wallet.prototype.sendMoney = function (amount, payeePublickey) {
        var transaction = new Transaction(amount, this.publicKey, payeePublickey);
        var sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        var signature = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, signature);
    };
    return Wallet;
}());
// example usage
var satoshi = new Wallet();
var bob = new Wallet();
var alice = new Wallet();
console.log("Init wallet");
console.log(Chain.instance);
satoshi.sendMoney(50, bob.publicKey);
console.log("satoshi send");
console.log(Chain.instance);
bob.sendMoney(20, alice.publicKey);
console.log("bob send");
console.log(Chain.instance);
alice.sendMoney(30, satoshi.publicKey);
console.log("alice send");
console.log(Chain.instance);
