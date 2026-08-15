// دالة لجلب الرحلات وتحديث الواجهة تلقائياً
async function loadDynamicFlights() {
    try {
        // يمكنك استبدال الرابط أدناه برابط السيرفر الحقيقي الخاص بك عندما تستضيفه
        const response = await fetch('/api/flights');
        const flights = await response.json();

        if (flights && flights.length > 0) {
            const firstFlight = flights[0];

            // البحث عن عناصر الواجهة وتحديثها بالبيانات الجديدة
            const airlineElement = document.querySelector('.card-airline, h3, .airline-name');
            const priceElement = document.querySelector('.card-price, .price');
            const timeElement = document.querySelector('.card-time, .time');

            if (airlineElement) airlineElement.innerText = firstFlight.airline;
            if (priceElement) priceElement.innerText = `USD $${firstFlight.price}`;
            if (timeElement) timeElement.innerText = firstFlight.time;

            console.log("تم تحديث الواجهة بنجاح من السيرفر:", firstFlight);
        }
    } catch (error) {
        console.error("خطأ أثناء جلب البيانات من السيرفر:", error);
    }
}

// تنفيذ الدالة بمجرد تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadDynamicFlights);
