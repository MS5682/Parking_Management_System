const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// exports.join = (req, res) => {
//   console.log(req.body);
//   var id = req.body.id;
//   var passwd = req.body.passwd;
//   var phone_number = req.body.phone_number;
//   var email = req.body.email;
//   var name = req.body.name;
//   var car_number = req.body.car_number;
//   console.log(id, passwd, phone_number, email, name, car_number);
//   // 비밀번호 해시 생성
//   const saltRounds = 10; // 솔트 반복 횟수
//   bcrypt.hash(passwd, saltRounds)
//     .then((hashedPassword) => {
//       console.log(id, hashedPassword, phone_number, email, name, car_number);
//       return userModel.join(id, hashedPassword, phone_number, email, name, car_number);
//     })
//     .then((result) => {
//       res.redirect('/user/login?result=회원가입 성공');
//     })
//     .catch((error) => {
//       // 회원가입 실패
//       res.redirect('/user/login?result=회원가입 실패');
//     });
// };
exports.join = (req, res) => {
  var id = req.body.id_signup;
  var passwd = req.body.passwd_signup;
  // 비밀번호 해시 생성
  const saltRounds = 10; // 솔트 반복 횟수
  bcrypt.hash(passwd, saltRounds)
    .then((hashedPassword) => {
      return userModel.join(id, hashedPassword);
    })
    .then((result) => {
      res.redirect('/user/login?result=회원가입 성공');
    })
    .catch((error) => {
      // 회원가입 실패
      res.redirect('/user/login?result=회원가입 실패');
    });
};

exports.userLogin = async function(req, res){
  const {id, password} = req.body;
  const result = await userModel.login(id);
  if(result[0]){
    const passwordMatch = await bcrypt.compare(password, result[0].passwd);
    if(passwordMatch){
      const car_number = await userModel.getUserCar(id);
      req.session.user = {
        id: id,
        name: result[0].name,
        dong: result[0].dong,
        ho: result[0].ho,
        car_number: car_number
      }
      res.status(200).json({success : true, id: id, car_number: car_number, name: result[0].name, dong: result[0].dong, ho: result[0].ho});
    }
    else{
      res.status(401).json({success: false, message: 'Invalid Credentials'});
    }

  }
}

exports.adminLogin = async (req, res) => {
  try {
    const id = req.body.id;
    const passwd = req.body.passwd;
    const result = await userModel.adminLogin(id);
    if (result[0]) {
      const passwordMatch = await bcrypt.compare(passwd, result[0].passwd);
      if (passwordMatch) {
        // session
        req.session.admin = {
          id: id
        };
        // 인증 성공
        res.redirect('/');
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


// exports.findId = (req, res) => {
//   var name = req.query.name;
//   var phone_number = req.query.phone_number;

//   userModel.findId(name, phone_number)
//     .then((result) => {
//       if (result !== undefined) {
//         res.redirect(`/user/login?result=아이디는 ${result[0].id}입니다`);
//       } else {
//         res.redirect('/user/forget?result=해당하는 아이디가 존재하지 않습니다.');
//       }
//     })
//     .catch((error) => {
//       // Handle error appropriately
//       console.error(error);
//       res.redirect('/user/forget?result=해당하는 아이디가 존재하지 않습니다.'); // 에러 발생 시 리디렉션
//     });
// }

// exports.changePw = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const passwd = req.body.passwd;
//     const phone_number = req.body.phone_number;
//     const name = req.body.name;
//     console.log(id, passwd, phone_number, name)
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(passwd, saltRounds);

//     var result = await userModel.changePw(id, hashedPassword, phone_number, name);
//     console.log(result);
//     res.redirect('/user/login?result=비밀번호 변경 성공');
//   } catch (error) {
//     console.log(error);
//     res.redirect('/user/forget?result=비밀번호 변경 실패');
//   }
// };

exports.getUserList = (req, res)=>{
  if(req.query.field !== undefined && req.query.value !== undefined){
    const column = req.query.field;
    const value = "%" + req.query.value + "%";


    userModel.getUserFromValue(column,value)
      .then((result) => {
        res.render('user',{ result: result });
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send("에러발생");
      });
    }
    else{
      userModel.getUserList()
          .then((result) => {
            res.render('user',{ result: result });
          })
          .catch((error) => {
            res.status(400).send("에러발생");
          });
      }
  
}
exports.getUserInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await userModel.getUserInfo(id);
    const result = {
      userInfo: userInfo
    };
    res.render('update', {result : result  });
  } catch (error) {
    res.status(400).send("에러발생");
  }
}
exports.getUserCarInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await userModel.getUserInfo(id);
    const userCar = await userModel.getUserCar(id);
    const result = {
      userInfo: userInfo, 
      userCar: userCar
    };
    res.render('updateCar', {result : result  });
  } catch (error) {
    res.status(400).send("에러발생");
  }
}
// 컨트롤러 코드
exports.updateUserInfo = async (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const dong = req.body.dong;
  const ho = req.body.ho;

  try {
    // name이 빈 문자열이 아닌 경우에만 업데이트
    if (name !== '') {
      await userModel.updateName(userId, name);
    }
    // phone_number 업데이트
    if (phone_number !== '') {
      await userModel.updatePhoneNumber(userId, phone_number);
    }

    // email이 빈 문자열이 아닌 경우에만 업데이트
    if (email !== '') {
     await userModel.updateEmail(userId, email);
    }

    // dong이 빈 문자열이 아닌 경우에만 업데이트
    if (dong !== '') {
      await userModel.updateDong(userId, dong);
    }

    // ho가 빈 문자열이 아닌 경우에만 업데이트
    if (ho !== '') {
      await userModel.updateHo(userId, ho);
    }
    res.redirect('/user/update/' + req.params.id);
  } catch (error) {
    res.status(400).send("에러발생");
  }
};



exports.deleteUserInfo = (req, res)=>{
  const id = req.params.id;
  userModel.deleteUserInfo(id)
      .then((result) => {
        userModel.getUserList()
        .then((result) => {
          //res.send({ result: result })
          res.render('user',{ result: result });
        })
        .catch((error) => {
          res.status(400).send("에러발생");
        });
      })
      .catch((error) => {
        res.status(400).send("에러발생");
      });
}

exports.updateUserCar = (req, res)=>{
  const current_car = req.params.current;
  const new_car = req.params.new;
  userModel.updateUserCar(current_car, new_car)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((error) => {
        res.status(400).send("에러발생");
      });
}

exports.addUserCar = (req, res)=>{
  const id = req.params.id;
  const car_number = req.params.car_number;
  userModel.addUserCar(id, car_number)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((error) => {
        res.status(400).send("에러발생");
      });
}

exports.deleteUserCar = (req, res)=>{
  const car_number = req.params.car_number;
  userModel.deleteUserCar(car_number)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((error) => {
        res.status(400).send("에러발생");
      });
}