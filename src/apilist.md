#Apis are possible which enables different features in our applications.

#AuthRouter

POST- /signup
POST-/login
POST-/logout


#profileRouter

GET-/profile/view
PATCH-/profile/edit
PATCH-/profile/password

#requestRouter
POST-/request/send/interested/:userId
POST-/request/send/ignored/:usrerId
POST-/request/review/accepted/:requestedId
POST-/request/review/rejected/:requestedId

#userRouter


GET-/user/request
GET-/user/connections
GET-/user/feed

