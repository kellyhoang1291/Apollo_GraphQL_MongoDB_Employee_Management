Following is the list of to develop which accept all data as

Notes:
- Implement GraphQL API using Apollo server
- Validate the input data whenever required
- Return error details or success response details whenever required
- All data must be sent back and forth in JSON Object format
- Optionally apply JWT security concept to secure all your API calls


JSON Object whenever needed:
Mutation - Signup Allow user to create new account
Query - Login Allow user to access the system 
Query - Get all employees User can get all employee list 
Mutation - Add New employee User can create new employee 
Query - Search employee by eid User can get employee details by employee id
Mutation - Update employee by eid User can update employee details 
Mutation - Delete employee by eid User can delete employee by employee id


Users Collection
Field Name: _id
Type: Object ID
Constraint: Auto Generate

Field Name: username
Type: String
Constraint: Primary Key

Field Name: email
Type: String
Constraint: Unique

Field Name: password
Type: String
Constraint: May be encrypted with other fields
  
Employee Collection
Field Name: _id
Type: Object ID
Constraint: Auto Generate

Field Name: first_name
Type: String
Constraint: Required

Field Name: last_name
Type: String
Constraint: Required

Field Name: email
Type: String
Constraint: Unique

Field Name: gender
Type: String
Constraint: Male/Female/Other

Field Name: salary
Type: Float
Constraint: Required