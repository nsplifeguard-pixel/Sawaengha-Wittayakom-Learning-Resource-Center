# API Specification สำหรับต่อ Backend

GET /api/resources
POST /api/resources
PUT /api/resources/:id
DELETE /api/resources/:id

GET /api/activities
POST /api/activities

GET /api/students/:id/history
POST /api/quiz-results

GET /api/reports/overview
GET /api/reports/usage

Authentication:
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me

แนะนำ JWT + Role Based Access Control:
ADMIN / TEACHER / STUDENT
