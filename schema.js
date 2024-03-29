const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }
    
    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }
    
    type Query {
        login(email: String!, password: String!): String!
        getEmployees: [Employee!]!
        getEmployeeByID(_id: ID!): Employee
    }
    
    type Mutation {
        signup(username: String!, email: String!, password: String!): User!
        addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        updateEmployee(_id: ID!, first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        deleteEmployee(_id: ID!): Employee!
    }
`