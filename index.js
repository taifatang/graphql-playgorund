import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import fakeData from "./fake-data.js";

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        // graph entry point
        Query: { //this is the query resolver and the entry point to the graph
            games: () => fakeData.games,
            game: (_, args) => fakeData.games.find(x => x.id === args.id),
            authors: () => fakeData.authors,
            author: (_, args) => fakeData.authors.find(x => x.id === args.id),
            reviews: () => fakeData.reviews,
            review: (_, args) => fakeData.reviews.find(x => x.id === args.id),
        },

        // define relationships for the resolver, e.g. game.reviews resolver
        Game: {
            reviews: (parent) => fakeData.reviews.filter(x => x.game_id == parent.id)
        },
        Author: {
            reviews: (parent) => fakeData.reviews.filter(x => x.author_id == parent.id)
        },
        Review: {
            author: (parent) => fakeData.reviews.find(x => x.author_id == parent.id),
            game: (parent) => fakeData.reviews.find(x => x.game_id === parent.id)
        },

        // mutation 
        Mutation: {
            deleteGame: (_, args) => {
                fakeData.games = fakeData.games.filter(x => x.id !== args.id);
                console.log(fakeData.games)
                return fakeData.games;
            },
            addGame: (_, args) => {
                let game = {
                    ...args.game,
                    id: (Math.max(...fakeData.games.map(x => x.id)) + 1).toString()
                };
                fakeData.games.push(game);
                return game;
            },
            updateGame: (_, args) => {
                fakeData.games = fakeData.games.map(x => {
                    if (x.id === args.id) {
                        return { ...x, ...args.edits };
                    }
                    return x;
                });
                return fakeData.games.find(x => x.id === args.id);
            }
        }
    }
})

const start = await startStandaloneServer(server, {
    listen: { port: 4000 }
});