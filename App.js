const express = require('express');
const app = express();
const users = require('./Data').users;
const cars = require('./Data').cars;
const me = users[0];
const { ApolloServer, gql } = require('apollo-server-express');


const typeDefs = gql`
type Query {
  users: [User]
  user(id: Int!): User

  cars: [Car]
  car(id: Int!): Car
  me: User
}

type User {
  id: ID!
  name: String!
}

type Car {
  id: ID!
  make: String!
  model: String!
  color: String!
}
`;



const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => {
     const user = users.filter(user => user.id === id);
     return user[0]
    },
    cars: () => cars,
    car: (parent, { id }) => {
     const car = cars.filter(car => car.id === id);
     return car[0]
  },
  me: () => me
}
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({ app });

app.listen(3000, () => console.info('Apollo GraphQl server is running on port 3000'))