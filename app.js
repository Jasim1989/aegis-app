const firebaseConfig = {
    apiKey: "AIzaSyDji6EHiPjZmVDo_Bj................", // تأكد أن مفتاحك هنا صحيح
    authDomain: "aegis-cash.firebaseapp.com",
    projectId: "aegis-cash",
    storageBucket: "aegis-cash.appspot.com",
    messagingSenderId: "1065982977576",
    appId: "1:1065982977576:web:40f7daee0eafe93a5371d"
};

// تهيئة
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

window.onload = async () => {
    const container = document.getElementById('flightsResultsList');
    container.innerHTML = '<p class="text-center text-slate-400">جارٍ تهيئة الرحلات...</p>';

    try {
        const snapshot = await db.collection('flights').get();
        
        // إذا كانت فارغة، سنقوم بإضافة أول رحلتين كبداية
        if (snapshot.empty) {
            await db.collection('flights').add({ airline: 'الخطوط الجوية العراقية', price: 210, origin: 'بغداد', destination: 'دبي', time: '08:00' });
            await db.collection('flights').add({ airline: 'فلاي بغداد', price: 185, origin: 'بغداد', destination: 'دبي', time: '11:15' });
            window.location.reload(); // إعادة تحميل لجلب البيانات
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const f = doc.data();
            container.innerHTML += `
                <div class="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4">
                    <div class="flex justify-between mb-2">
                        <span class="font-bold text-sky-400">${f.airline}</span>
                        <span class="text-emerald-400">$${f.price}</span>
                    </div>
                    <p class="text-sm text-slate-400">${f.origin} ⬅️ ${f.destination}</p>
                    <button class="w-full mt-3 bg-sky-600 py-2 rounded-lg text-sm font-bold">حجز الرحلة</button>
                </div>
            `;
        });
    } catch (e) {
        container.innerHTML = `<p class="text-center text-red-500">خطأ: ${e.message}</p>`;
    }
};
