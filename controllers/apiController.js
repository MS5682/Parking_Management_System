const express = require('express');
const apiModel = require('../models/apiModel')

// mobile api
exports.getParkingLotsStatus = async function(req, res){
    console.log('asdf')
    b1fStatus = await apiModel.getParkingStatus(1);
    b2fStatus = await apiModel.getParkingStatus(2);
    res.status(200).json({b1f: b1fStatus[0].status, b2f: b2fStatus[0].status});
    return;
  }
  