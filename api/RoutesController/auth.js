import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  const registerData = req.body;
  try {
    const registerWrong =
      (await User.findOne({
        username: registerData.username,
      })) || (await User.findOne({ email: registerData.email }));
    if (registerWrong)
      return next(errorMessage(400, "錯誤，此帳號或信箱已被註冊"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(registerData.password, salt);
    const newUser = new User({
      username: registerData.username,
      email: registerData.email,
      password: hash,
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    next(errorMessage(400, "註冊失敗", error));
  }
};

const login = async (req, res, next) => {
  const loginData = req.body;
  try {
    const userData =
      (await User.findOne({ username: loginData.account })) ||
      (await User.findOne({ email: loginData.account }));
    if (!userData) return next(errorMessage(404, "沒有此使用者，請重新確認"));

    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      userData.password
    );
    if (!isPasswordCorrect) return next(errorMessage(404, "密碼輸入錯誤"));

    // Generate JWT token with user ID and admin status
    const token = jwt.sign(
      { id: userData._id, isAdmin: userData.isAdmin },
      process.env.JWT
    );

    // Set JWT token as an HTTP-only cookie
    res
      .cookie("JWT_token", token, {
        httpOnly: true, // Prevent access from client-side scripts
      })
      .status(200)
      .json(`${userData.username} 登入成功`);
  } catch (error) {
    next(errorMessage(400, "登入失敗", error));
  }
};

const logout = (req, res) => {
  res.clearCookie("JWT_token").status(200).json("登出成功");
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies.JWT_token;
  if (!token) return next(errorMessage(401, "請先登入"));

  jwt.verify(token, process.env.JWT, async (err, decoded) => {
    if (err) return next(errorMessage(403, "TOKEN 無效"));

    try {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return next(errorMessage(404, "使用者不存在"));

      res.status(200).json(user);
    } catch (error) {
      next(errorMessage(500, "伺服器錯誤"));
    }
  });
};

export { register, login, logout, verifyJWT };
