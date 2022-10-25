
<p align="center">
  <h1>Node-Mentoring-programm Homework 2</h1>
</p>

# TASK 2.1
Write a simple REST service withCRUD operations for User entity.
<ul>
  <li>To create REST service,use ExpressJS (https://expressjs.com/). The User should have the following properties(you can use UUIDas a user identifier (id)): <br>
  <img width="293" alt="image" src="https://user-images.githubusercontent.com/48913019/197864044-a32d0147-e413-4778-a805-45eef2249de9.png">
  </li>
  <li>
    Service should have the following CRUD operations for User:
    <ul>
      <li>get user by id;</li>
      <li>create and update user;</li>
      <li>get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property: <strong>getAutoSuggestUsers(loginSubstring, limit)</strong></li>
      <li>remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection).</li>
    </ul>
  </li>
  <li>Store user’scollection in the service memory (while the service is running).</li>
</ul>
To test the service CRUDmethods,you can use Postman (https://www.getpostman.com/).

# TASK 2.2
Add server-side validation for create/update operations of Userentity: 
<ul>
  <li>all fields are required;</li>
  <li>login validationis required;</li>
  <li>password must contain letters and numbers;</li>
  <li>user’s age must be between 4 and 130.</li>
</ul>
In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message. <br>
For requests validation use special packages like joi 
