// إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyDji6EHiPjZmVDo_Bj................",
    authDomain: "aegis-cash.firebaseapp.com",
    projectId: "aegis-cash",
    storageBucket: "aegis-cash.appspot.com",
    messagingSenderId: "1065982977576",
    appId: "1:1065982977576:web:40f7daee0eafe93a5371d"
};

// تهيئة Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

window.onload = async () => {
    const container = document.getElementById('flightsResultsList');

    try {
        const snapshot = await db.collection('flights').get();
        
        if (snapshot.empty) {
            // إضافة رحلات تجريبية افتراضية في حال كانت القاعدة فارغة
            await db.collection('flights').add({ airline: 'الخطوط الجوية العراقية', price: 210, origin: 'بغداد (BGW)', destination: 'دبي (DXB)', time: '08:00 AM' });
            await db.collection('flights').add({ airline: 'فلاي بغداد', price: 185, origin: 'بغداد (BGW)', destination: 'إسطنبول (IST)', time: '11:15 AM' });
            window.location.reload();
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const f = doc.data();
            container.innerHTML += `
                <div class="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-sky-500/40 transition duration-300">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs font-bold bg-sky-500/10 text-sky-400 px-3 py-1 rounded-lg border border-sky-500/20">${f.airline || 'خطوط جوية'}</span>
                        <span class="text-emerald-400 font-extrabold text-lg">$${f.price} <span class="text-[10px] text-slate-400 font-normal">USD</span></span>
                    </div>
                    
                    <div class="flex justify-between items-center text-sm my-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                        <div class="text-center">
                            <span class="font-extrabold block text-base text-white">${f.time || '08:00'}</span>
                            <span class="text-[11px] text-slate-400">${f.origin || 'بغداد'}</span>
                        </div>
                        <div class="flex-1 px-3 text-center">
                            <span class="text-[10px] text-sky-400 font-medium block">مباشر (Direct)</span>
                            <div class="border-t border-dashed border-slate-700 my-1.5 relative">
                                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-1.5 text-xs">✈️</span>
                            </div>
                        </div>
                        <div class="text-center">
                            <span class="font-extrabold block text-base text-emerald-400">مؤكد</span>
                            <span class="text-[11px] text-slate-400">${f.destination || 'دبي'}</span>
                        </div>
                    </div>

                    <button onclick="bookFlight('${f.airline}', '${f.price}')" class="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-sky-900/30 transition transform active:scale-95">
                        اختر هذه الرحلة 🎫
                    </button>
                </div>
            `;
        });
    } catch (e) {
        container.innerHTML = `<p class="text-center text-red-400 text-xs py-4">عذراً، حدث خطأ في الاتصال بالسحابة.</p>`;
    }
};

async function bookFlight(airline, price) {
    try {
        await db.collection('bookings').add({
            airline: airline,
            price: price,
            date: new Date().toLocaleDateString(),
            status: 'مؤكدة'
        });
        alert(`تم حجز الرحلة بنجاح على متن (${airline}) بمبلغ $${price}!`);
    } catch (e) {
        alert("فشل إتمام الحجز، حاول مرة أخرى.");
    }
}
