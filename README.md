# Node와 Squelize

> 기존 MongoDB Node 서버를 Sqeuelize로 재구성 해보았습니다.
> https://github.com/ehgks0000/node-express

## 기술 스택

> Arcitechture : node.js && Express.js  
> DB : MySQL (Sequelize)  
> ~~Server : AWS EC2 Ubuntu 20.04~~

## 라이브러리

- ~~JWT~~
- bcyrt
- passport & passport-local

## 주요기능 (Router)

### user.js

- getUser : get {{url}}/user
- registerUser : get {{url}}/user
- loginUser : get {{url}}/user/login
- logoutUser : post {{url}}/user/logout

### post.js

- createPost : post {{url}}/post

### posts.js
