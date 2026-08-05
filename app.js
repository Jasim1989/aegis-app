// الحالة العامة لتطبيق الطيران
const state = {
    searchHistory: [],
    bookings: []
};

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(tabId + '-section').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

function searchFlights() {
    const from = document.getElementById('fromCity').value;
    const to = document.getElementById('toCity').value;
    const depart = document.getElementById('departDate').value;

    if (!from || !to) {
        alert('الرجاء إدخال مدينة المغادرة ومدينة الوصول على الأقل!');
        return;
    }

    const resultsList = document.getElementById('flightsResultsList');
    
    // محاكاة لنتائج بحث حقيقية بناءً على المدخلات
    resultsList.innerHTML = `
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 12px; font-size: 11px; margin-bottom: 8px;">
            <strong>الخطوط الجوية الملكية</strong><br>
            ${from} ➔ ${to} (${depart || 'غداً'})\br>
            <span style="color: #0284c7; font-weight: bold;">السعر: $180</span> 
            <button onclick="bookFlight('${from}', '${to}', '$180')" style="float: left; background: #0284c7; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer;">حجز الآن</button>
        </div>
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 12px; font-size: 11px; margin-bottom: 8px;">
            <strong>طيران الشرق الأوسط</strong><br>
            ${from} ➔ ${to} (${depart || 'غداً'})\br>
            <span style="color: #0284c7; font-weight: bold;">السعر: $220</span> 
            <button onclick="bookFlight('${from}', '${to}', '$220')" style="float: left; background: #0284c7; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer;">حجز الآن</button>
        </div>
    `;
    
    alert('تم العثور على الرحلات المتاحة بنجاح!');
}

function bookFlight(from, to, price) {
    state.bookings.push({ from, to, price, date: new Date().toLocaleDateString() });
    
    // تحديث قائمة الحجوزات
    const myBookingsSection = document.getElementById('mybookings-section');
    myBookingsSection.querySelector('.card').innerHTML = `
        <h3 style="color: #0284c7; font-size: 15px; font-weight: 800; margin-bottom: 10px; text-align: center;">🎫 تذاكري والحجوزات المؤكدة</h3>
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 12px; font-size: 11px;">
            <strong>رحلة مؤكدة ✅</strong><br>
            من: ${from} إلى: ${to}<br>
            السعر المدفوع: ${price}<br>
            <span style="color: #059669; font-weight: bold;">رقم الحجز: PNR-${Math.floor(Math.random() * 90000 + 10000)}</span>
        </div>
    `;

    alert('تم حجز التذكرة بنجاح! يمكنك الاطلاع عليها في قسم "حجوزاتي".');
}
