<p align="center">
  <h1></h1>
</p>

# TASK 1.1

Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.

- The program should be started from npmscript via nodemon(i.e. npm run task1).
- The program should be running in a stand-by mode and should not be terminated after the first-stringprocessing.
- For example:

```bash
123456 789 

987 654321
```

# TASK 1.2

Write a program which should do the following:

- Read the content of csvfile from./csvdirectory. Example: https://epa.ms/nodejs19-hw1-ex1
- Use the csvtojsonpackage (https://github.com/Keyang/node-csvtojson) to convert csvfile to jsonobject.
-Write the csvfile content to a new txtfile.Use the following format: https://epa.ms/nodejs19-hw1-ex2.
- Do not load all the content of the csvfile into RAM via stream (read/write file content line by line).
- In case of read/write errors, log them in the console.
- The program should be started via npm scriptusing nodemon(i.e. npm run task2).

# TASK 1.3

Rewrite the above-mentionedprograms to use babel(https://babeljs.io/)and ES6modules.
