const express = require('express');
const parkingModel = require('../models/parkingModel');

exports.getCarList = (req, res)=>{
    parkingModel.getCarList()
      .then((result) => {
        //res.send({ result: result })
        res.render('parking', { result: result });
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send("에러발생");
      });
}