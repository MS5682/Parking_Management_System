# Parking_Management_System

## [User API](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI)
|Method|URL|Description|
|------|---|---|
|POST|/user/join|[회원가입](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#회원가입)|
|POST|/user/login|[로그인](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#로그인)|
|GET|/user/list|[유저 목록 조회](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#유저-목록-조회)|
|GET|/user/update/:id|[유저 업데이트를 위한 기존 정보 조회](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#유저-업데이트를-위한-기존-정보-조회)|
|GET|/user/updateCar/:id|[유저의 차 정보 업데이트를 위한 기존 정보 조회](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#유저의-차-정보-업데이트를-위한-기존-정보-조회)|
|POST|/user/update/:id|[유저의 정보를 수정](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#유저의-정보를-수정)|
|POST|/user/delete/:id|[유저의 정보 삭제](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#유저의-정보-삭제)|
|POST|/user/updateCar/:current/:new|[차 정보 수정](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#차-정보-수정)|
|POST|/user/updateCarVistor/:car_number/:visitor|[방문자 차량 수정](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#방문자-차량-수정)|
|POST|/user/addCar/:id/:car_number/:visitor|[방문자 차량 추가](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#방문자-차량-추가)|
|POST|/user/deleteCar/:car_number|[차량 정보 삭제](https://github.com/MS5682/Parking_Management_System/wiki/UserAPI#차량-정보-삭제)|

## [Parking API](https://github.com/MS5682/Parking_Management_System/wiki/ParkingAPI)
|Method|URL|Description|
|------|---|---|
|GET|/parking/:floor|[층수에 따른 주차장 현황](https://github.com/MS5682/Parking_Management_System/wiki/ParkingAPI#층수에-따른-주차장-현황)|
|POST|/parking/info|[주차장 현황 업데이트](https://github.com/MS5682/Parking_Management_System/wiki/ParkingAPI#주차장-현황-업데이트)|

## [Notify API](https://github.com/MS5682/Parking_Management_System/wiki/NotifyAPI)
|Method|URL|Description|
|------|---|---|
|GET|/notify|[알림 조회](https://github.com/MS5682/Parking_Management_System/wiki/NotifyAPI#알림-조회)|
|POST|/notify/:notify_id|[알림 삭제](https://github.com/MS5682/Parking_Management_System/wiki/NotifyAPI#알림-삭제)|

## [Board API](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI)
|Method|URL|Description|
|------|---|---|
|GET|/boards|[게시판 목록 조회](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시판-목록-조회)|
|POST|/borads|[게시판 생성](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시판-생성)|
|DELETE|/borads/:boardCode|[게시판 삭제](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시판-삭제)|
|POST|/borads/:boardCode/posts|[게시글 생성](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시판-생성)|
|GET|/borads/:boardCode/posts|[게시글 목록 조회](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시글-목록-조회)|
|GET|/borads/:boardCode/posts/:postCode|[게시글 조회](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시글-조회)|
|PUT|/borads/:boardCode/posts/:postCode/comments/:commentCode|[댓글 수정](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#댓글-수정)|
|DELETE|/borads/:boardCode/posts/:postCode/comments/:commentCode|[댓글 삭제](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#댓글-삭제)|
|POST|/borads/:boardCode/posts/:postCode/comments|[댓글 작성](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#댓글-작성)|
|GET|/borads/:boardCode/posts/:postCode/edit|[기존 게시글 내용 가져오기](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#기존-게시글-내용-가져오기)|
|PUT|/borads/:boardCode/posts/:postCode|[게시글 수정](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시글-수정)|
|DELETE|/borads/:boardCode/posts/:postCode|[게시글 삭제](https://github.com/MS5682/Parking_Management_System/wiki/BoardAPI#게시글-삭제)|
