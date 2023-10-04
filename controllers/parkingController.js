const express = require('express');
const parkingModel = require('../models/parkingModel');

exports.getCarList = async (req, res) => {
  const floor = req.params.floor;
  const user_code = req.session.user.user_code;
  const car_number = req.session.user.car_number;

  try {
    let resultData;
    let carLocData = null;
    let carCnt;
    if (user_code == 0) {
      resultData = await parkingModel.getCarList(floor);
      carLocData = await parkingModel.getMyCarLoc(car_number,floor)
    } else if (user_code == 1) {
      resultData = await parkingModel.getCarListDetail(floor);
    }
    carCnt = await parkingModel.getCarCnt(floor);
    const result = {
      user_code: user_code,
      carLocData: carLocData, // carLocData를 result에 추가
      result: resultData,
      carCnt: carCnt,
      floor: floor
    };

    //res.send({ result: result })
    res.render('parking', { result: result });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(400).send("에러발생");
  }
};

exports.updateParking = async (req, res) => {
  
  const parkingData = req.body;
  const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  for (let floor = 1; floor <= 3; floor++) {  //임의의 층수
    for (const section of ['A', 'B', 'C', 'D']) { //임의의 섹션
      for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {  //임의의 섹션 넘버

        // 모델을 사용하여 데이터베이스 작업 수행
        try {
          const existingEntry = await parkingModel.checkParkingSpace(section, sectionNumber, floor);
          if(existingEntry.length == 0) { // 주차 공간에 차량이 없는 경우
            const matchingData = parkingData.find((entry) => {  // 해당 주차공간에 들어온 차량이 있는지 확인
              return entry.section === section && entry.sectionNumber === sectionNumber && entry.floor === floor;
            });
            console.log(section, sectionNumber, floor, matchingData);
            if (matchingData !== undefined) {    // 들어온 차가 있는경우, 데이터베이스에 차량 추가
              const { carNumber } = matchingData;
              await parkingModel.addParkingInfo(section, sectionNumber, floor, carNumber, currentTime);
              console.log(`차량 ${carNumber}가 주차되었습니다.`);
            }
          } else {  //주차 공간에 차량이 있는 경우
            const carNumber = existingEntry[0].car_num;
            const matchingData = parkingData.find((entry) => {  //현재 시점에서, 해당 공간에 차량이 있는지 확인
              return entry.section === section && entry.sectionNumber === sectionNumber && entry.floor === floor;
            });

            if (!matchingData) {  //차량이 현재 없는 경우
              await parkingModel.updateParkingInfo(section, sectionNumber, floor, carNumber, currentTime);  //원래 차량이 나갔다고 판단하여 나간시간 업데이트
              console.log(`차량 ${carNumber}가 출차했습니다.`);
            } else if (matchingData.carNumber !== carNumber) {  //새로운 차량이 있는 경우 원래 차량의 나간시간을 업데이트하고 새로운 차량 추가
              await parkingModel.updateParkingInfo(section, sectionNumber, floor, carNumber, currentTime);
              console.log(`차량 ${carNumber}가 출차했습니다.`);
              const { carNumber: newCarNumber } = matchingData;
              await parkingModel.addParkingInfo(section, sectionNumber, floor, newCarNumber, currentTime);
              console.log(`차량 ${newCarNumber}가 주차되었습니다.`);
            }
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: '서버 오류입니다.' });
          return;
        }
      }
    }
  }

  res.status(200).json({ message: '데이터베이스 작업이 완료되었습니다.' });
};