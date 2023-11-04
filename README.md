# Parking_Management_System

## User API
|Method|URL|Description|
|------|---|---|
|POST|/user/join|회원가입|
|POST|/user/login|로그인|
|GET|/user/list|유저 목록 조회|
|GET|/user/update/:id|유저 업데이트를 위한 기존 정보 조회|
|GET|/user/updateCar/:id|유저의 차 정보 업데이트를 위한 기존 정보 조회|
|POST|/user/update/:id|유저의 정보를 수정|
|POST|/user/delete/:id|유저의 정보 삭제|
|POST|/user/updateCar/:current/:new|차 정보 수정|
|POST|/user/updateCarVistor/:car_number/:visitor|방문자 차량 수정|
|POST|/user/addCar/:id/:car_number/:visitor|방문자 차량 추가|
|POST|/user/deleteCar/:car_number|차량 정보 삭제|

---
### 회원가입
유저의 정보를 받아 회원가입합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/join|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|아이디|
|passwd|필수|비밀번호|

---
### 로그인
입력받은 정보로 로그인합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/login|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|아이디|
|passwd|필수|비밀번호|

---
### 유저 목록 조회
모든 유저의 목록을 조회합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/list|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|field|선택|검색을 위한 칼럼명|
|value|선택|검색을 위한 값|

---
### 유저 업데이트를 위한 기존 정보 조회
해당하는 유저의 기존 정보를 가져옵니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/update/:id|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|해당 유저의 아이디|

