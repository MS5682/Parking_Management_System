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
|GET|/user/list|

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
|GET|/user/update/:id|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|해당 유저의 아이디|

---
### 유저의 차 정보 업데이트를 위한 기존 정보 조회
해당하는 유저 차의 기존 정보를 가져옵니다.

#### Request
|메서드|URL|
|---|---|
|GET|/updateCar/:id|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|해당 유저의 아이디|

---
### 유저의 정보를 수정
해당하는 유저 차의 기존 정보를 가져옵니다.

#### Request
|메서드|URL|
|---|---|
|POST|/update/:id|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|해당 유저의 아이디|
|name|선택|해당 유저의 이름|
|phone_number|선택|해당 유저의 전화번호|
|email|선택|해당 유저의 이메일|
|dong|선택|해당 유저의 동|
|ho|선택|해당 유저의 호수|

---
### 유저의 정보 삭제
해당하는 유저의 정보를 삭제합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/delete/:id|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|해당 유저의 아이디|

---
### 차 정보 수정
해당하는 유저의 정보를 삭제합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/updateCar/:current/:new|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|current|필수|기존 차 번호|
|new|필수|새로운 차 번호|

---
### 방문자 차량 수정
방문 차량 여부와 번호를 수정합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/updateCarVistor/:car_number/:visitor|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|car_number|필수|변경할 차 번호|
|visitor|필수|방문자 코드|

---
### 방문자 차량 추가
해당 유저에 방문 차량을 추가합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/addCar/:id/:car_number/:visitor|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|id|필수|해당 유저의 아이디|
|car_number|필수|추가할 차 번호|
|visitor|필수|방문자 코드|

---
### 차량 정보 삭제
해당 유저에 방문 차량을 추가합니다.

#### Request
|메서드|URL|
|---|---|
|POST|/user/deleteCar/:car_number|

#### Request Elements
|파라미터|필수여부|설명|
|---|---|---|
|car_number|필수|삭제할 차 번호|

