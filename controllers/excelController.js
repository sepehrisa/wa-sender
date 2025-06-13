const XLSX = require('xlsx');
const path = require('path');

exports.readExcel = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'فایل ارسال نشده است' });
    }

    const filePath = path.join(__dirname, '../', req.file.path);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    res.json({ message: 'فایل با موفقیت خوانده شد', data });
  } catch (error) {
    console.error('خطا در خواندن فایل اکسل:', error);
    res.status(500).json({ message: 'خطا در پردازش فایل' });
  }
};
