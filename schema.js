export const typeDefs = `#graphql
  
  # data type or they call it resource
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }

  # the main entry point to the graph
  type Query {
    authors: [Author]
    author(id: ID!): Author
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
  }
  type Mutation {
    deleteGame(id: ID!): [Game]
    addGame(game: AddGameInput!): Game!
    updateGame(id: ID!, edits: EditGameInput!): Game
  }

  # this is input type and the input for the mutation
  input AddGameInput {
    title: String!
    platform: [String!]!
  }
  input EditGameInput {
    title: String
    platform: [String!]
  }
`