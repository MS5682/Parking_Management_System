const express = require('express');
const apiModel = require('../models/apiModel')

// mobile api
exports.getParkingLotsStatus = async function(req, res){
    b1fStatus = await apiModel.getParkingStatus(1);
    b2fStatus = await apiModel.getParkingStatus(2);
    res.status(200).json({b1f: b1fStatus[0].status, b2f: b2fStatus[0].status});
    return;
}

exports.getParkingLotCarInformation = function(req, res){
    const floor = req.params.floor;
    apiModel.getParkingLotCarInformation(1, function(result){
        res.status(200).json(result);
    });
}

exports.getMyCarLocation = function(req, res){
    const car_number = req.body.car_number;
    console.log(car_number);
    apiModel.getMyCarLocation(car_number, function(result){
        
        console.log(result)
        if(result === undefined){
            res.status(404).json({error: 'Data not found'});
        }
        else{
            res.status(200).json(result);
        }
    })
}