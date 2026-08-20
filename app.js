// إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyDji6EHiPjZmVDo_Bj...", // ضع مفتاحك كاملاً هنا
    authDomain: "aegis-cash.firebaseapp.com",
    projectId: "aegis-cash",
    storageBucket: "aegis-cash.appspot.com",
    messagingSenderId: "1065982977576",
    appId: "1:1065982977576:web:40f7daee0eafe93a5371d"
};

// تهيئة فايربيس
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// دالة البحث وجلب الرحلات من سحابة فايربيس
async function searchFlights() {
    const resultsContainer = document.getElementById('flightsResultsList');
    resultsContainer.innerHTML = '<p class="text-center text-slate-400 py-4">جاري تحميل الرحلات الحقيقية...</p>';

    try {
        const snapshot = await db.collection('flights').get();
        let flights = [];
        
        snapshot.forEach(doc => {
            flights.push({ id: doc.id, ...doc.data() });
        });

        // إذا كانت القاعدة فارغة، ننشئ رحلات افتراضية أولية تلقائياً
        if (flights.length === 0) {
            await db.collection('flights').add({ airline: 'الخطوط الجوية العراقية', price: 210, origin: 'بغداد', destination: 'دبي', time: '08:00' });
            await db.collection('flights').add({ airline: 'فلاي بغداد', price: 185, origin: 'بغداد', destination: 'دبي', time: '11:15' });
            return searchFlights();
        }

        resultsContainer.innerHTML = '';
        flights.forEach(flight => {
            const card = `
                <div class="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-sky-500/50 transition">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs font-bold bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-lg">${flight.airline}</span>
                        <span class="text-emerald-400 font-extrabold text-base">$${flight.price} USD</span>
                    </div>
                    <div class="flex justify-between items-center text-sm mb-4">
                        <div class="text-center">
                            <span class="font-bold block text-lg">${flight.time || '08:00'}</span>
                            <span class="text-xs text-slate-400">${flight.origin || 'بغداد'}</span>
                        </div>
                        <div class="flex-1 px-4 text-center">
                            <span class="text-xs text-slate-500 block">direct</span>
                            <div class="border-t border-dashed border-slate-600 my-1 relative">
                                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-1 text-xs">✈️</span>
                            </div>
                        </div>
                        <div class="text-center">
                            <span class="font-bold block text-lg">مؤكد</span>
                            <span class="text-xs text-slate-400">${flight.destination || 'دبي'}</span>
                        </div>
                    </div>
                    <button onclick="bookFlight('${flight.airline}', '${flight.price}')" class="w-full bg-slate-700 hover:bg-sky-600 text-white py-2 rounded-xl text-xs font-bold transition">
                        اختر هذه الرحلة 🎫
                    </button>
                </div>
            `;
            resultsContainer.innerHTML += card;
        });

    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p class="text-center text-red-400 py-4">فشل الاتصال بقاعدة البيانات.</p>';
    }
}

// دالة لحفظ الحجز حقيقياً في قاعدة البيانات
async function bookFlight(airline, price) {
    try {
        await db.collection('bookings').add({
            airline: airline,
            price: price,
            date: new Date().toLocaleDateString()
        });
        alert(`تم حجز الرحلة بنجاح على متن (${airline}) وتم حفظها في قاعدة البيانات السحابية!`);
    } catch (e) {
        alert("حدث خطأ أثناء الحجز.");
    }
}
