# TODO 리스트 웹앱 과제

## 🔍 프로젝트 개요
Node.js + MySQL 기반의 나만의 TODO 리스트 웹앱입니다. 
회원가입 및 로그인 기능을 포함하고 있으며, JWT 토큰 인증 방식으로 사용자별 할 일을 등록, 조회, 수정, 삭제할 수 있습니다.

## 📁 폴더 구조
```
DBTodo/
├── controllers/        # 회원/할 일 API 로직
├── middlewares/        # JWT 인증 미들웨어
├── routes/             # 라우터 정의
├── public/             # HTML 테스트 파일
│   ├── signup.html
│   ├── login.html
│   └── todo.html
├── schema.sql          # MySQL 테이블 생성 스크립트
├── .env.example        # 환경변수 예시 파일
├── server.js           # Express 메인 서버
├── package.json        # npm 설정
├── README.md           # 프로젝트 설명
└── index.html          # 첫 페이지
```

## ✅ 주요 기능
- 회원가입 (`/api/signup`)
- 로그인 (`/api/login` → JWT 발급)
- 할 일 추가 (`/api/todos`, POST)
- 할 일 전체 조회 (`/api/todos`, GET)
- 할 일 수정 (`/api/todos/:id`, PUT)
- 할 일 삭제 (`/api/todos/:id`, DELETE)

## 🔐 인증 방식
- 로그인 시 JWT 토큰 발급
- 이후 모든 TODO 요청에 `Authorization: Bearer <token>` 헤더 필요

## 🛠 실행 방법
1. `.env` 파일 생성 (.env.example 참고)
2. MySQL 서버 실행 및 `todo_app` DB 생성
3. `schema.sql` 실행해 테이블 생성
4. 의존성 설치:
```bash
npm install
```
5. 개발 서버 실행:
```bash
npm run dev
```
6. 브라우저에서 테스트:
```
http://localhost:3000/signup.html
```

## 💾 환경변수 예시 (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app
JWT_SECRET=your_secret_key
```

## 📸 ERD
> ERD는 VS Code ERD Editor 확장으로 작성된 이미지를 함께 첨부하거나, GitHub에 업로드해 주세요.

## 👨‍💻 개발자
오지환 / 2025년 과제 제출용 프로젝트
