'use strict'

const readline = require('readline');
const EventEmmitter = require('events')

class ASTDIN extends EventEmmitter {
    constructor() {
        super();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.pause();
    }

    async line() {
        return new Promise((resolve) => {
            this.rl.on('line', (line) => {
                this.rl.pause();
                resolve(line);
            });
            this.rl.resume();
        })
    }

    async SIGCONT() {
        return new Promise((resolve) => {
            this.rl.on('SIGCONT', () => {
                this.rl.pause();
                resolve(true);
            });
            this.rl.resume();
        })
    }

    async SIGINT() {
        return new Promise((resolve) => {
            this.rl.on('SIGINT', () => {
                this.rl.pause();
                resolve(true);
            });
            this.rl.resume();
        })
    }

    async SIGSTP() {
        return new Promise((resolve) => {
            this.rl.on('SIGTSTP', () => {
                this.rl.pause();
                resolve(true);
            });
            this.rl.resume();
        })
    }

    close() {
        this.rl.close();
    }
}

module.exports = ASTDIN;