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

exports.addOrUpdateParkingInfo = async (req, res) => {
  const parkingData = req.body;
  const currentTime = new Date();

  for (const section of ['A', 'B', 'C', 'D', 'E', 'F']) {
    for (let sectionNumber = 1; sectionNumber <= 6; sectionNumber++) {
      for (let floor = 1; floor <= 3; floor++) {
        // 모델을 사용하여 데이터베이스 작업 수행
        try {
          const existingEntry = await parkingModel.checkParkingSpace(section, sectionNumber, floor);

          if (!existingEntry) {
            const matchingData = parkingData.find((entry) => {
              return entry.section === section && entry.sectionNumber === sectionNumber && entry.floor === floor;
            });

            if (matchingData) {
              const { carNumber } = matchingData;
              await parkingModel.addParkingInfo(section, sectionNumber, floor, carNumber, currentTime);
              console.log(`차량 ${carNumber}가 주차되었습니다.`);
            }
          } else {
            const { carNumber } = existingEntry;
            const matchingData = parkingData.find((entry) => {
              return entry.section === section && entry.sectionNumber === sectionNumber && entry.floor === floor;
            });

            if (!matchingData) {
              await parkingModel.updateParkingInfo(section, sectionNumber, floor, carNumber, currentTime);
              console.log(`차량 ${carNumber}의 출차 시간이 업데이트되었습니다.`);
            } else if (matchingData.carNumber !== carNumber) {
              await parkingModel.updateParkingInfo(section, sectionNumber, floor, carNumber, currentTime);

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