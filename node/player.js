let server = require('server');

// const Koa = require('koa');
// const app = new Koa();
//
// const config = require('config');
//
// const path = require('path');
// const fs = require('fs');

let Player = {
    DefaultPlayer: function (name) {
        return {
            startTurn: true,
            secondTurn: true,
            name: name,
            color: "",
            victoryPoints: 0,
            army: 0,
            longestRoad: 0,

            "res_rock": 1,
            "res_tree": 1,
            "res_brick": 1,
            "res_sheep": 1,
            "res_wheat": 1,
            devCards: {
                "monopoly": 0,
                "knight": 0,
                "victoryPoint": 0,
                "roadBonus": 0,
                "resourcesBonus": 0
            },
            exchangeRate: {
                "tree": 4,
                "rock": 4,
                "brick": 4,
                "sheep": 4,
                "wheat": 4
            },
            roads: [],
            settlements: []
        };
    },

    createPlayer : function (name) {
        let playerName = name || 'Player';
        let player = new DefaultPlayer (playerName);
        return player;
    },

    getResources : function (resource) {

    }
};

module.exports = Player;