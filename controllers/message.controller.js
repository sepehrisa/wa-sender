const Message = require("../models/message.model");

exports.saveMessage = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "متن پیام الزامی است" });
  }

  try {
    const message = new Message({ userId, text });
    await message.save();

    res.status(201).json({ message: "پیام ذخیره شد", data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ذخیره پیام" });
  }
};
