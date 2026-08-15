// server.js - الخادم الخلفي لمشروع Aegis Wings (مدعوم بالرحلات المحلية والعراقية)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// قاعدة بيانات الرحلات الخاصة بمطارات العراق
const iraqFlightsDatabase = [
    { id: 'AW-901', airline: 'الخطوط الجوية العراقية', origin: 'بغداد (BGW)', destination: 'دبي (DXB)', price: 210, time: '08:00 AM' },
    { id: 'AW-902', airline: 'فلاي بغداد', origin: 'بغداد (BGW)', destination: 'إسطنبول (IST)', price: 175, time: '11:30 AM' },
    { id: 'AW-903', airline: 'الخطوط الجوية القطرية', origin: 'أربيل (EBL)', destination: 'الدوحة (DOH)', price: 340, time: '03:00 PM' },
    { id: 'AW-904', airline: 'الخطوط الجوية العراقية', origin: 'النجف (NJF)', destination: 'بيروت (BEY)', price: 190, time: '05:15 PM' },
    { id: 'AW-905', airline: 'فلاي اربيل', origin: 'أربيل (EBL)', destination: 'دبي (DXB)', price: 220, time: '09:00 PM' }
];

// مسار جلب الرحلات بناءً على المدن المطلوبة
app.get('/api/flights', (req, res) => {
    const { origin, destination } = req.query;

    let results = iraqFlightsDatabase;

    // تصفية النتائج إذا قام المستخدم بتحديد مطار معين
    if (origin) {
        results = results.filter(f => f.origin.includes(origin) || f.origin.toLowerCase().includes(origin.toLowerCase()));
    }

    res.json({
        status: 'success',
        count: results.length,
        results: results.length > 0 ? results : iraqFlightsDatabase // إرجاع الكل افتراضياً لضمان ظهور البيانات
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Aegis Wings Iraqi Server running on port ${PORT}`);
});
