const jwt = require("jsonwebtoken");

module.exports.protect = async function (req, res, next) {
  try {
    // //// 1. getting token and check if its present
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      console.log("I have token");
    }
    console.log(token);
    if (!token) {
      return err;
    }
    //// Verify token

    console.log("Token is NOT yet verified");
    jwt.verify(token, process.env.JWT_SECRET, (data, err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(data);
      req.user = data;
      console.log("Token is verified");
      next();
    });

    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // // //// Finding current user in database
    // const currentUser = await User.findById(decoded._id);
    // console.log(currentUser);
    // console.log("decoded user");
    // //// Granting access to current user
    // req.user = currentUser;
    // console.log(req.user);
    // next();
  } catch (err) {
    res.sendStatus(403);
  }
};

// console.log("Token is NOT yet verified");
// jwt.verify(token, process.env.JWT_SECRET, (data, err) => {
//   if (err) {
//     console.log("errrororor");
//     return err;
//   }
//   console.log(data);
//   req.user = data;
//   console.log("Token is verified");
//   next();
// });
