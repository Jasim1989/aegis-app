// server.js - الخادم الخلفي لمشروع Aegis Wings
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// مسار تجريبي للتحقق من الاتصال
app.get('/api/health', (req, res) => {
    res.json({ message: "Backend is online!" });
});

// مسارات الطيران
app.get('/api/flights', (req, res) => {
    // هنا ستضع لاحقاً الكود الخاص بجلب البيانات من API حقيقي (مثل Amadeus)
    const flights = [
        { id: 1, airline: 'الخطوط الجوية العراقية', price: 250, time: '10:00' },
        { id: 2, airline: 'فلاي بغداد', price: 180, time: '14:30' }
    ];
    res.json(flights);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Aegis Wings Backend running on port ${PORT}`);
});
