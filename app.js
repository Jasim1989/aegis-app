// دالة البحث عن الرحلات وتحديث الواجهة برمجياً
async function searchFlights() {
    const fromCity = document.getElementById('fromCity').value || 'بغداد';
    const toCity = document.getElementById('toCity').value || 'دبي';
    const resultsContainer = document.getElementById('flightsResultsList');

    resultsContainer.innerHTML = '<p class="text-center text-slate-400 py-4">جاري استعلام شبكة الطيران...</p>';

    // محاكاة استجابة الخادم الحقيقي برمجياً لمنع خطأ الاتصال
    setTimeout(() => {
        const liveFlights = [
            { id: 'AW-501', airline: 'الخطوط الجوية العراقية', price: 210, time: '08:00', origin: fromCity, destination: toCity },
            { id: 'AW-502', airline: 'فلاي بغداد', price: 185, time: '11:15', origin: fromCity, destination: toCity },
            { id: 'AW-503', airline: 'القطرية للخطوط الجوية', price: 340, time: '03:30 PM', origin: fromCity, destination: toCity }
        ];

        resultsContainer.innerHTML = '';

        liveFlights.forEach(flight => {
            const card = `
                <div class="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-sky-500/50 transition">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs font-bold bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-lg">${flight.airline}</span>
                        <span class="text-emerald-400 font-extrabold text-base">$${flight.price} USD</span>
                    </div>
                    <div class="flex justify-between items-center text-sm mb-4">
                        <div class="text-center">
                            <span class="font-bold block text-lg">${flight.time}</span>
                            <span class="text-xs text-slate-400">${flight.origin}</span>
                        </div>
                        <div class="flex-1 px-4 text-center">
                            <span class="text-xs text-slate-500 block">direct</span>
                            <div class="border-t border-dashed border-slate-600 my-1 relative">
                                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-1 text-xs">✈️</span>
                            </div>
                        </div>
                        <div class="text-center">
                            <span class="font-bold block text-lg">مؤكد</span>
                            <span class="text-xs text-slate-400">${flight.destination}</span>
                        </div>
                    </div>
                    <button onclick="bookFlight('${flight.id}', '${flight.price}', '${flight.airline}')" class="w-full bg-slate-700 hover:bg-sky-600 text-white py-2 rounded-xl text-xs font-bold transition">
                        اختر هذه الرحلة 🎫
                    </button>
                </div>
            `;
            resultsContainer.innerHTML += card;
        });
    }, 1000);
}

function bookFlight(id, price, airline) {
    alert(`تم بنجاح حجز الرحلة (${airline}) برمز (${id}) بسعر $${price}!`);
}
