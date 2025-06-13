const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, phone, password, subscriptionEndsAt, field } = req.body;
  const existing = await User.findOne({ phone });
  if (existing) return res.status(409).json({ message: "شماره تکراری است" });

  const newUser = new User({ name, phone, password, subscriptionEndsAt, field });
  await newUser.save();

  res.status(201).json({ message: "کاربر ساخته شد" });
};

exports.toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "کاربر پیدا نشد" });

  user.isActive = !user.isActive;
  await user.save();

  res.json({ message: `اکانت ${user.isActive ? "فعال شد" : "مسدود شد"}` });
};

exports.extendSubscription = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "کاربر پیدا نشد" });

  const { days } = req.body;
  if (!days || isNaN(days) || days < 1) {
    return res.status(400).json({ message: "تعداد روز معتبر وارد کنید" });
  }

  const now = new Date();
  const current = user.subscriptionEndsAt && user.subscriptionEndsAt > now
    ? new Date(user.subscriptionEndsAt)
    : now;
  const newDate = new Date(current.setDate(current.getDate() + Number(days)));

  user.subscriptionEndsAt = newDate;
  await user.save();

  const updatedUser = await User.findById(user._id);

  res.json({
    message: `${days} روز اشتراک تمدید شد`,
    subscriptionEndsAt: updatedUser.subscriptionEndsAt,
    remainingDays: updatedUser.remainingDays
  });
};

exports.searchUsers = async (req, res) => {
  const { name, phone } = req.query;

  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (phone) query.phone = new RegExp(phone, "i");

  const users = await User.find(query).select("-password");
  res.json(users);
};
