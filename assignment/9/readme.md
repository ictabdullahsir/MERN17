open postman 
set

post: localhost:4000/students
body>raw>json

{
  "name": "jamal ",
  "email": "jamal@example.com",
  "age": 30,
  "department": "EEE",
  "cgpa": 2.00,
  "isActive": true
}

send

show data bellow

{
    "status": "success",
    "data": {
        "_id": "6a706ccecb34f6530feb6a3e",
        "name": "jamal ",
        "email": "jamal@example.com",
        "age": 30,
        "department": "EEE",
        "cgpa": 2,
        "isActive": true,
        "createdAt": "2026-08-03T10:26:22.353Z",
        "updatedAt": "2026-08-03T10:26:22.353Z",
        "__v": 0
    }
}

get:   localhost:4000/students/6a706ccecb34f6530feb6a3e      serch by ic