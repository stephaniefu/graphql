const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true //use graphiql tool when you go to localhost:4000/graphql
}));

app.listen(4000, () => {
  console.log('listening on port 4000')
});
