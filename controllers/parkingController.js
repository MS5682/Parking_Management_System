const express = require('express');
const parkingModel = require('../models/parkingModel');

exports.getCarList = (req, res)=>{
  const user_code = 0;
  //user_code = req.session.user_code;
  if(user_code == 0){
    parkingModel.getCarList()
    .then((resultData) => {
      const result = {
        user_code: user_code,
        result: resultData
      };
      //res.send({ result: result })
      res.render('parking', { result: result });
    })
    .catch((error) => {
      // Authentication failed
      res.status(400).send("에러발생");
    });
  }
  else if(user_code == 1){
    parkingModel.getCarListDetail()
      .then((resultData) => {
        const result = {
          user_code: user_code,
          result: resultData
        };
        //res.send({ result: result })
        res.render('parking', { result: result });
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send("에러발생");
      });

    }
  }