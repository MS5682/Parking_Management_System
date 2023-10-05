const express = require('express');
const notifyModel = require('../models/notifyModel');


  exports.getNotification = (req, res)=>{
    notifyModel.getNotification()
        .then((result) => {
          res.send({ result: result });
        })
        .catch((error) => {
          res.status(400).send("에러발생");
        });
  }

  exports.deleteNotification = (req, res)=>{
    const notify_id = req.params.notify_id;
    notifyModel.deleteNotification(notify_id)
        .then((result) => {
          res.send({ result: result });
        })
        .catch((error) => {
          res.status(400).send("에러발생");
        });
  }