---
layout: wiki
title: MySQL
cate1: Interview
cate2: 
description: MySQL Wiki
keywords: MySQL
---

### **Q: What is an aggregate in SQL?**

**A:** An aggregate in SQL refers to a function that performs a calculation on a set of values and returns a single result. These functions are used to summarize or aggregate data, often in combination with the `GROUP BY` clause to group rows based on specified columns. Common aggregate functions include:

- **COUNT()**: Returns the number of rows or non-NULL values.
- **SUM()**: Calculates the total sum of a numeric column.
- **AVG()**: Computes the average value of a numeric column.
- **MIN()**: Returns the minimum value from a column.
- **MAX()**: Returns the maximum value from a column.

**Example:**
```sql
SELECT department, COUNT(*) AS total_employees, AVG(salary) AS average_salary
FROM employees
GROUP BY department;
```

In this query, the `COUNT()` function is used to count the number of employees per department, and the `AVG()` function calculates the average salary within each department.

---

### **Q: What is the difference between a foreign key and a primary key in SQL?**

**A:** The primary difference between a **foreign key** and a **primary key** lies in their role and constraints in a relational database:

1. **Primary Key**:
   - A **primary key** is a unique identifier for each record in a table.
   - It ensures that no two rows in a table have the same value for the primary key column(s).
   - A primary key column cannot contain **NULL** values.
   - A table can only have **one primary key**, which may consist of a single column or multiple columns (called a composite key).
   
   **Example:**
   ```sql
   CREATE TABLE employees (
       employee_id INT PRIMARY KEY,
       name VARCHAR(100)
   );
   ```
   Here, `employee_id` is the primary key, and it uniquely identifies each employee.

2. **Foreign Key**:
   - A **foreign key** is a column (or set of columns) in one table that establishes a link between data in two tables.
   - It refers to the **primary key** or a **unique key** in another table.
   - A foreign key can contain **NULL** values, and multiple rows in a table can reference the same foreign key value.
   - A table can have multiple foreign keys, each referring to a primary key in a different table.

   **Example:**
   ```sql
   CREATE TABLE orders (
       order_id INT PRIMARY KEY,
       employee_id INT,
       FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
   );
   ```
   Here, `employee_id` in the `orders` table is a foreign key that references the `employee_id` column (primary key) in the `employees` table, establishing a relationship between the two tables.

---

**Key Differences:**

| **Primary Key**                       | **Foreign Key**                             |
|---------------------------------------|---------------------------------------------|
| Uniquely identifies each record.      | Refers to a primary key in another table.   |
| Cannot contain NULL values.           | Can contain NULL values.                   |
| A table can have only one primary key.| A table can have multiple foreign keys.    |
| Ensures data integrity within the table.| Enforces referential integrity between tables. |


---

### **Q: What is RDBMS?**

**A:** **RDBMS** stands for **Relational Database Management System**. It is a type of database management system (DBMS) that stores data in a **relational** format, using tables (also called relations) to represent data. These tables consist of rows and columns, where each row represents a record and each column represents an attribute of that record.

**Key features of RDBMS:**
1. **Tables**: Data is stored in tables with rows and columns.
2. **Primary Key**: Each table has a primary key to uniquely identify each record.
3. **Foreign Key**: A foreign key is used to link tables together, ensuring referential integrity.
4. **SQL**: Structured Query Language (SQL) is used to query and manage the database.
5. **Normalization**: Data is normalized to reduce redundancy and improve data integrity.
6. **ACID Properties**: RDBMS supports **ACID** (Atomicity, Consistency, Isolation, Durability) properties to ensure reliable transactions.

**Examples of RDBMS:**
- **MySQL**
- **PostgreSQL**
- **Oracle Database**
- **SQL Server**

**Example of a relational database structure:**

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);
```

In this example, the `employees` table is related to the `departments` table through the foreign key `department_id`.

RDBMSs are widely used for managing structured data and supporting business applications.

---

### **Q: What is SQL Injection?**

**A:** **SQL Injection** is a type of security vulnerability that occurs when an attacker is able to manipulate SQL queries by injecting malicious SQL code into an input field. This can allow the attacker to execute arbitrary SQL commands on the database, potentially gaining unauthorized access, modifying data, or even deleting data.

**How SQL Injection Works:**
When user input is improperly sanitized, attackers can inject SQL code that modifies the behavior of a query. For example, if a web application directly uses user input in an SQL query without proper validation or escaping, an attacker can insert malicious SQL code to bypass authentication or retrieve sensitive data.

**Example of SQL Injection:**
Suppose there’s a login form where the SQL query is constructed like this:
```sql
SELECT * FROM users WHERE username = 'user_input' AND password = 'user_password';
```
If the user enters:
- `username = 'admin'`
- `password = 'password'`

An attacker could input the following:
- `username = 'admin' OR 1=1 --`
- `password = 'any_password'`

This would result in the following query:
```sql
SELECT * FROM users WHERE username = 'admin' OR 1=1 --' AND password = 'any_password';
```
The `OR 1=1` condition always evaluates to true, and the `--` comment causes the rest of the query to be ignored. As a result, the attacker would be logged in as the `admin` user, bypassing authentication.

**Potential Risks:**
- **Data theft**: Attackers can retrieve sensitive data, such as user credentials or personal information.
- **Data modification**: Attackers can insert, update, or delete data in the database.
- **Privilege escalation**: Attackers can gain administrative privileges, allowing them full control over the database.
- **Denial of service**: Attackers can cause performance issues or even crash the system.

**Prevention Methods:**
1. **Prepared Statements (Parameterized Queries)**: Use parameterized queries to ensure user input is treated as data, not executable code.
   ```sql
   SELECT * FROM users WHERE username = ? AND password = ?;
   ```
2. **Stored Procedures**: Use stored procedures to avoid direct concatenation of user input in queries.
3. **Input Validation**: Validate and sanitize user input to ensure it matches expected formats.
4. **Escaping User Input**: Escape special characters in user input to prevent them from being interpreted as part of the SQL query.
5. **Least Privilege**: Ensure that the database account used by the application has only the necessary permissions.

SQL injection is one of the most common and dangerous security vulnerabilities, so securing applications against it is essential.

---

### **Q: What are indexes in a database?**

**A:** An **index** in a database is a data structure that improves the speed of data retrieval operations on a table at the cost of additional space and some overhead on data modification operations. Indexes are created on columns to allow quick lookups and efficient sorting, reducing the time it takes to search for specific data.

Indexes function similarly to the index in a book, where you can quickly find the page number (the data) for a specific topic (the column value).

**Types of Indexes:**
1. **Single-column index**: Indexes created on a single column.
2. **Multi-column (Composite) index**: Indexes created on multiple columns.
3. **Unique index**: Ensures that all values in the indexed column(s) are unique.
4. **Full-text index**: For text search operations in large text fields.
5. **Clustered index**: The physical order of the data in the table is determined by the clustered index.
6. **Non-clustered index**: A separate structure that references the actual data in the table.

---

**Q: What happens if all fields are indexed?**

**A:** If **all fields** in a table are indexed, several things can happen:

1. **Increased storage requirements**: Indexes consume disk space. Indexing all columns would require significant storage overhead.
2. **Slower data modification**: Inserting, updating, and deleting records would become slower because the indexes would also need to be updated whenever the data changes.
3. **Potentially better query performance for complex queries**: Indexes on multiple columns might benefit complex queries that involve filtering or sorting on various columns. However, this improvement can be marginal if the query does not use all the indexed columns.

---

**Q: What are the advantages and disadvantages of indexing?**

**Advantages of Indexing:**
1. **Faster Data Retrieval**: Indexes speed up query performance, especially for read-heavy operations like SELECT statements, as they reduce the amount of data the database needs to scan.
   - **Example**: Searching for a specific value in a large table can be faster with an index.
2. **Efficient Sorting and Filtering**: Indexes can speed up operations involving ORDER BY, GROUP BY, and filtering using WHERE clauses.
3. **Improved Join Performance**: When joining tables, indexes can significantly speed up the matching of rows between tables.
4. **Better Query Execution Plans**: Databases can choose efficient execution plans using indexes to access the required data faster.

**Disadvantages of Indexing:**
1. **Increased Storage Space**: Indexes require additional disk space, which can be substantial for large tables with many indexed columns.
2. **Slower Data Modifications (Insert, Update, Delete)**: Every time a row is inserted, updated, or deleted, the corresponding indexes need to be updated. This can slow down write operations.
3. **Complexity**: Overuse of indexes can complicate database management, and deciding which columns to index requires careful consideration of query patterns.
4. **Diminishing Returns**: Indexing all columns may not lead to significant performance improvement for every query. In some cases, creating too many indexes can actually degrade performance due to overhead.

---

### **Best Practices for Indexing:**
- **Index frequently queried columns**: Focus on columns that are often used in WHERE clauses, JOIN conditions, or ORDER BY clauses.
- **Use composite indexes for multi-column queries**: If a query filters on multiple columns, a composite index on those columns may improve performance.
- **Monitor performance**: Regularly assess query performance and adjust indexing strategies based on actual usage patterns.
- **Avoid unnecessary indexes**: Do not index columns that are rarely used in queries, as the overhead may outweigh the benefits.

In summary, while indexes can significantly improve query performance, it's essential to balance them with the additional storage and maintenance costs, especially when considering indexing every column in a table.

<details>
<summary>Click to expand</summary>

**Cardinality in Database Indexing**:

**Q: What is the role of cardinality in indexing?**

**A:** **Cardinality** in a database refers to the number of distinct values in a column or the uniqueness of the data in that column. Cardinality plays a crucial role in determining the effectiveness of an index and how the database optimizer chooses which indexes to use for query execution.

### **Types of Cardinality**:
1. **High Cardinality**: A column with many distinct, unique values. For example, a column like `email` or `user_id` in a user table would have high cardinality.
2. **Low Cardinality**: A column with few distinct values. For example, a column like `gender` (with values 'male', 'female', 'other') or `status` (with values 'active', 'inactive') would have low cardinality.

---

### **Role of Cardinality in Indexing**:

1. **Impact on Index Effectiveness**:
   - **High Cardinality**: Indexing columns with high cardinality (e.g., `user_id`, `email`) is generally beneficial because it allows the database to quickly narrow down to a few rows based on the unique values. Indexing these columns improves query performance, especially for lookups, joins, and range queries.
   - **Low Cardinality**: Indexing columns with low cardinality is often **less effective** because the index might not significantly reduce the search space. For example, if a column only has a few distinct values, using an index might not provide much performance improvement, as the database would still have to scan a large portion of the table. In some cases, it might even degrade performance due to the overhead of maintaining the index.

2. **Query Optimization**:
   - When optimizing a query, the database query planner considers the cardinality of columns in deciding whether to use an index. If a column has high cardinality, the planner is more likely to use an index to improve performance.
   - **Example**: A query filtering on `email` (high cardinality) is more likely to benefit from an index, whereas filtering on `status` (low cardinality) may not see as significant a benefit.
   
3. **Index Selection**:
   - The **optimizer** in relational databases takes cardinality into account when choosing indexes. It tends to select indexes for high cardinality columns, where the selectivity (ability to return a small result set) is high. Low cardinality columns are typically not indexed unless used in combination with other columns.

4. **Composite Indexes**:
   - When creating composite (multi-column) indexes, cardinality plays a role in determining the order of the columns in the index. The most selective (high cardinality) columns are generally placed first in a composite index, as this provides the most filtering power.

---

### **Example**:
Consider a table `employees` with columns `id`, `name`, and `department`:
- `id` (high cardinality, unique for each row)
- `department` (low cardinality, few distinct values such as "HR", "Engineering", "Sales")

If you index the `id` column, the query will perform significantly faster when searching for a specific employee. However, if you index the `department` column, the performance boost may be minimal because the query will still need to scan large portions of the table due to the low number of distinct values in the `department` column.

---

### **Summary**:
- **High cardinality** columns generally benefit more from indexing because they provide better filtering, reducing the number of rows to search.
- **Low cardinality** columns are less beneficial to index, as the query might not benefit much from the index due to a large number of duplicate values.
- Understanding cardinality helps in deciding which columns to index for optimal query performance and efficient use of resources.

</details>

---

### **Q: How do you write a SQL query to find the second highest salary?**

**A:** To find the second highest salary in a table, you can use several approaches. Below are some of the common methods.

**Method 1: Using `LIMIT` and `OFFSET` (for MySQL, PostgreSQL)**:
If you're using databases like MySQL or PostgreSQL that support `LIMIT` and `OFFSET`, you can write the query as follows:

```sql
SELECT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```
Explanation:
- The `ORDER BY salary DESC` sorts the salaries in descending order.
- The `LIMIT 1 OFFSET 1` skips the highest salary (first row) and returns the second highest salary.

**Method 2: Using `SUBQUERY` with `MAX()`**:
You can use a subquery that finds the maximum salary less than the overall maximum salary:

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```
Explanation:
- The inner subquery `(SELECT MAX(salary) FROM employees)` finds the highest salary.
- The outer query finds the maximum salary that is **less than** the highest salary, effectively returning the second highest.

**Method 3: Using `ROW_NUMBER()` or `RANK()` (for SQL Server, PostgreSQL)**:
You can also use window functions like `ROW_NUMBER()` or `RANK()` to assign a ranking to each salary and filter for the second-highest rank.

```sql
WITH ranked_salaries AS (
    SELECT salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
    FROM employees
)
SELECT salary
FROM ranked_salaries
WHERE rank = 2;
```
Explanation:
- The `ROW_NUMBER()` function assigns a rank to each salary in descending order.
- The `WHERE rank = 2` filters for the second-highest salary.

**Method 4: Using `DENSE_RANK()` (for SQL Server, PostgreSQL)**:
If you want to handle cases where multiple employees have the same highest salary and still return the second unique salary, you can use `DENSE_RANK()`:

```sql
WITH ranked_salaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
    FROM employees
)
SELECT salary
FROM ranked_salaries
WHERE rank = 2;
```
Explanation:
- `DENSE_RANK()` assigns a rank without gaps (if two employees share the highest salary, both will have rank 1).
- The query filters for the second rank, ensuring you get the second highest distinct salary.

---

**Summary**:
- **Method 1** (LIMIT/OFFSET) is simple but may not work in all databases.
- **Method 2** (Subquery) is a reliable and widely supported method.
- **Method 3** (ROW_NUMBER) is useful for advanced use cases and databases supporting window functions.
- **Method 4** (DENSE_RANK) ensures you handle ties properly for distinct salary values.

---

### **Q: How do you write a stored procedure in SQL?**

**A:** A **stored procedure** is a set of SQL statements that you can save and reuse, allowing for more modular and reusable code. Stored procedures help in encapsulating logic on the database side, providing benefits like better performance, reduced network traffic, and improved security.

**Basic Syntax to Create a Stored Procedure:**

```sql
CREATE PROCEDURE procedure_name
AS
BEGIN
    -- SQL statements go here
END;
```

**Steps to Write a Stored Procedure**:

1. **Declare the Procedure**: Use the `CREATE PROCEDURE` statement followed by the procedure's name.
2. **Begin and End**: The logic inside the procedure is enclosed between the `BEGIN` and `END` keywords.
3. **Write SQL Logic**: Inside the `BEGIN` and `END`, you can write any SQL logic (such as `SELECT`, `INSERT`, `UPDATE`, or `DELETE`).

---

**Example 1: Simple Stored Procedure**:

This example creates a stored procedure to retrieve employee details from the `employees` table.

```sql
CREATE PROCEDURE GetEmployeeDetails
AS
BEGIN
    SELECT employee_id, name, salary
    FROM employees;
END;
```

**Example 2: Stored Procedure with Parameters**:

You can pass input parameters to the stored procedure. Here's an example where we pass an employee's ID to retrieve their details.

```sql
CREATE PROCEDURE GetEmployeeByID
    @employee_id INT
AS
BEGIN
    SELECT employee_id, name, salary
    FROM employees
    WHERE employee_id = @employee_id;
END;
```

**Explanation**:
- `@employee_id INT` is the parameter passed to the procedure.
- The `SELECT` statement retrieves the details of the employee based on the provided `employee_id`.

---

**Example 3: Stored Procedure with Output Parameters**:

You can also have output parameters in a stored procedure to return values to the caller.

```sql
CREATE PROCEDURE GetEmployeeSalary
    @employee_id INT,
    @salary DECIMAL(10, 2) OUTPUT
AS
BEGIN
    SELECT @salary = salary
    FROM employees
    WHERE employee_id = @employee_id;
END;
```

**Explanation**:
- `@salary DECIMAL(10, 2) OUTPUT` is an output parameter.
- After executing the procedure, the `@salary` variable will contain the salary value of the employee with the provided `employee_id`.

---

**Example 4: Stored Procedure with Conditional Logic**:

You can use control flow logic (like `IF`, `ELSE`, `WHILE`, etc.) inside a stored procedure.

```sql
CREATE PROCEDURE GetEmployeeSalaryByDepartment
    @department_id INT
AS
BEGIN
    IF @department_id = 1
    BEGIN
        SELECT name, salary
        FROM employees
        WHERE department_id = @department_id;
    END
    ELSE
    BEGIN
        PRINT 'Department ID is not valid.';
    END
END;
```

**Explanation**:
- The procedure checks if the `department_id` is 1. If true, it returns the employee details. Otherwise, it prints a message.

---

**Executing a Stored Procedure**:

To execute a stored procedure, use the `EXEC` or `EXECUTE` command.

1. **For procedures without parameters**:
   ```sql
   EXEC GetEmployeeDetails;
   ```

2. **For procedures with input parameters**:
   ```sql
   EXEC GetEmployeeByID @employee_id = 101;
   ```

3. **For procedures with output parameters**:
   ```sql
   DECLARE @salary DECIMAL(10, 2);
   EXEC GetEmployeeSalary @employee_id = 101, @salary OUTPUT;
   PRINT @salary;
   ```

**Summary**:
- **CREATE PROCEDURE** defines a stored procedure with the name and logic.
- **Parameters** can be input, output, or both.
- Stored procedures improve performance, modularity, and security, and can contain complex logic and control flow statements.

---