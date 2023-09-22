const express = require('express');
const parkingModel = require('../models/parkingModel');

exports.getCarList = async (req, res) => {
  const user_code = req.session.user.user_code;
  const car_number = req.session.user.car_number;

  try {
    let resultData;
    let carLocData = null;

    if (user_code == 0) {
      resultData = await parkingModel.getCarList();
      carLocData = await parkingModel.getMyCarLoc(car_number);
    } else if (user_code == 1) {
      resultData = await parkingModel.getCarListDetail();
    }

    const result = {
      user_code: user_code,
      carLocData: carLocData, // carLocData를 result에 추가
      result: resultData
    };

    //res.send({ result: result })
    res.render('parking', { result: result });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(400).send("에러발생");
  }
};
