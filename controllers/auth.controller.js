const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });
    if (!user.isActive) return res.status(403).json({ message: "اکانت شما مسدود است" });

    if (password !== user.password)
      return res.status(401).json({ message: "رمز عبور اشتباه است" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
};
