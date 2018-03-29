const graphql = require('graphql')
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var books = [
  {name: 'the little prince', genre: 'fantasy', id: '1', authorId: '1'},
  {name: 'bla', genre: 'whatever', id: '2', authorId: '2'},
  {name: 'harry potty', genre: 'whatever', id: '3', authorId: '2'},
  {name: 'hunger gaes', genre: 'horror', id: '4', authorId: '1'},
  {name: 'hungry gays', genre: 'fantasy', id: '5', authorId: '2'},
  {name: 'superman', genre: 'horror', id: '6', authorId: '1'}
];

var authors = [
 {name: 'Stephanie Fu', age: 24, id: '1'},
 {name: 'Wilma Wang', age: 23, id: '2'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
})

//RootQuery: how we initially jump into the graph to query data
const RootQuery = new GraphQLObjectType({ 
  name: 'RootQueryType',
  fields:{
    book:{
      type: BookType,
      args: { id: {type: GraphQLID}},
      resolve(parent, args){
        //code to get data from db/other source
        console.log(typeof(args.id))
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id}) //look inside the authors aRRay, look for book with id that matches args.id. the id that comes with the query
      }
    }
  }
});

// book(id:'2') {
//   name
//   genre
// }

module.exports = new GraphQLSchema({
  query: RootQuery
})