const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const dotenv = require('dotenv');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/ressolver');

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : 'development.env'
});

const app = express();
require('./database').mongoose();

//middlewares
const verifyToken = require('./middlewares/verifytoken');
const middlewares = [verifyToken];

app.use('/graphql', cors(), ...middlewares, (req, res) => {
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: process.env.NODE_ENV === 'development',
        context: { req }
    })(req, res);
});

const port = process.env.PORT || 7001;
app.listen(port, () =>
    console.log(
        `Server started at http://localhost:${port}/graphql`,
        `\nEnvironment: ${process.env.NODE_ENV}`
    )
);

module.exports = app;
