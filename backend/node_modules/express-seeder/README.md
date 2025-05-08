# About Express Seeder

Express Seeder is a lightweight library which is a solution to a problem lots of developers face on the backend:
Seeding a database

# How to Install
```
npm i express-seeder
```

# How to Use
```javascript
const { Seeder } = require('express-seeder')

Seeder(data, model)
```

# Data Format
A json or Javascript object format which should be an array of object
```javascript
[
  {
    "question": "which of these names did not reflect in the book of Genesis?",
    "answers": "Enoch, Ham, Elizabeth",
    "correct_answer": "Elizabeth",
    "book_of_bible": "Genesis"
  },
```

