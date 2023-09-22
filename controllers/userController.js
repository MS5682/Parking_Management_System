const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.join = (req, res) => {
  console.log(req.body);
  var id = req.body.id;
  var passwd = req.body.passwd;
  var user_code = req.body.user_code;
  var phone_number = req.body.phone_number;
  var email = req.body.email;
  var name = req.body.name;
  var car_number = req.body.car_number;
  console.log(id, passwd, user_code, phone_number, email, name, car_number);
  // 비밀번호 해시 생성
  const saltRounds = 10; // 솔트 반복 횟수
  bcrypt.hash(passwd, saltRounds)
    .then((hashedPassword) => {
      console.log(id, hashedPassword, user_code, phone_number, email, name, car_number);
      return userModel.join(id, hashedPassword, user_code, phone_number, email, name, car_number);
    })
    .then((result) => {
      res.redirect('/user/login?result=회원가입 성공');
    })
    .catch((error) => {
      // 회원가입 실패
      res.redirect('/user/login?result=회원가입 실패');
    });
};

exports.login = async (req, res) => {
  try {
    const id = req.body.id;
    const passwd = req.body.passwd;
    const user_code = req.body.user_code;
    const result = await userModel.login(id, user_code);
    if (result[0]) {
      const passwordMatch = await bcrypt.compare(passwd, result[0].passwd);
      if (passwordMatch) {
        // session
        req.session.user = {
          id: id,
          user_code: user_code,
          car_number : result[0].car_number,
          name: result[0].name
        };
        // 인증 성공
        res.redirect('/user/login?result=로그인 성공');
      } else {
        // 인증 실패
        res.redirect('/user/login?result=로그인 실패');
      }
    } else {
      // 인증 실패
      res.redirect('/user/login?result=로그인 실패');
    }
  } catch (error) {
    // 인증 실패
    res.redirect('/user/login?result=로그인 실패');
  }
};


exports.findId = (req, res)=>{
  var name = req.query.name;
  var phone_number = req.query.phone_number;

  userModel.findId(name, phone_number)
      .then((result) => {
        console.log(result);
        res.render('id', { result: result });
      })
      .catch((error) => {
        // Authentication failed
        res.redirect('/user/forget?result=해당하는 아이디가 존재하지 않습니다.');
      });
}

exports.changePw = async (req, res) => {
  try {
    const id = req.body.id;
    const passwd = req.body.passwd;
    const phone_number = req.body.phone_number;
    const name = req.body.name;
    console.log(id, passwd, phone_number, name)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);

    var result = await userModel.changePw(id, hashedPassword, phone_number, name);
    console.log(result);
    res.redirect('/user/login?result=비밀번호 변경 성공');
  } catch (error) {
    console.log(error);
    res.redirect('/user/forget?result=비밀번호 변경 실패');
  }
};

exports.getUserList = (req, res)=>{
  userModel.getUserList()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send("에러발생");
      });
}