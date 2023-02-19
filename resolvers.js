const Employee = require('./models/Employee');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.resolvers = {
    Query: {
      login: async (_, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: user._id }, 'secret');
        return token;
      },
      getEmployees: async () => {
        const employees = await Employee.find();
        return employees;
      },
      getEmployeeByID: async (_, { _id }) => {
        const employee = await Employee.findById(_id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      },
    },
    Mutation: {
      signup: async (_, { username, email, password }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return user;
      },
      addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
        const employee = new Employee({ first_name, last_name, email, gender, salary });
        await employee.save();
        return employee;
      },
      updateEmployee: async (_, { _id, first_name, last_name, email, gender, salary }) => {
        const employee = await Employee.findByIdAndUpdate(_id, {first_name, last_name, email, gender, salary }, { new: true });
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      },
      deleteEmployee: async (_, { _id }) => {
        const employee = await Employee.findByIdAndDelete(_id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      },
    },
  };