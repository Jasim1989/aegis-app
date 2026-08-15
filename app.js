// دالة البحث عن الرحلات وجلبها من السيرفر وعرضها في الواجهة
async function searchFlights() {
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const resultsContainer = document.getElementById('flightsResultsList');

    // إظهار رسالة جاري البحث
    resultsContainer.innerHTML = '<p class="text-center text-slate-400 py-4">جاري البحث عن الرحلات الحقيقية...</p>';

    try {
        // جلب البيانات من السيرفر (server.js)
        const response = await fetch(`/api/flights?origin=${fromCity}&destination=${toCity}`);
        const data = await response.json();

        // التأكد من وجود رحلات
        const flights = data.results || data; // دعم الصيغتين
        
        if (flights && flights.length > 0) {
            resultsContainer.innerHTML = ''; // تفريغ النتائج القديمة

            // توليد بطاقة لكل رحلة قادمة من السيرفر
            flights.forEach(flight => {
                const flightCard = `
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-sky-500/50 transition">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-xs font-bold bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-lg">${flight.airline}</span>
                            <span class="text-emerald-400 font-extrabold text-base">$${flight.price} USD</span>
                        </div>
                        <div class="flex justify-between items-center text-sm mb-4">
                            <div class="text-center">
                                <span class="font-bold block text-lg">${flight.departureTime || flight.time || '08:00'}</span>
                                <span class="text-xs text-slate-400">${flight.origin || 'بغداد'}</span>
                            </div>
                            <div class="flex-1 px-4 text-center">
                                <span class="text-xs text-slate-500 block">direct</span>
                                <div class="border-t border-dashed border-slate-600 my-1 relative">
                                    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-1 text-xs">✈️</span>
                                </div>
                            </div>
                            <div class="text-center">
                                <span class="font-bold block text-lg">11:15</span>
                                <span class="text-xs text-slate-400">${flight.destination || 'دبي'}</span>
                            </div>
                        </div>
                        <button onclick="bookFlight('${flight.id}', '${flight.price}', '${flight.destination}', '${flight.origin}')" class="w-full bg-slate-700 hover:bg-sky-600 text-white py-2 rounded-xl text-xs font-bold transition">
                            اختر هذه الرحلة 🎫
                        </button>
                    </div>
                `;
                resultsContainer.innerHTML += flightCard;
            });
        } else {
            resultsContainer.innerHTML = '<p class="text-center text-red-400 py-4">لا توجد رحلات متاحة لهذا المسار حالياً.</p>';
        }

    } catch (error) {
        console.error("خطأ في الاتصال:", error);
        resultsContainer.innerHTML = '<p class="text-center text-red-400 py-4">حدث خطأ أثناء الاتصال بالسيرفر لجلب الرحلات.</p>';
    }
}

// دالة تأكيد الحجز
function bookFlight(flightId, price, dest, orig) {
    alert(`تم اختيار الرحلة بنجاح!\nمعرف الرحلة: ${flightId}\nإلى: ${dest}\nالسعر: $${price}`);
}
