// الحالة العامة للتطبيق
const state = {
    points: 1315,
    diamonds: 35,
    usd: 0.00,
    logs: [
        { title: "استضافة فيديو جديد", desc: "+150 نقطة", time: "منذ ساعة" },
        { title: "عمولة مشاهدة فيديو", desc: "+15 نقطة", time: "منذ ساعتين" },
        { title: "تسجيل الدخول اليومي", desc: "+10 نقاط", time: "اليوم" }
    ],
    hostedVideos: [
        { title: "مقدمة في الطهي المنزلي", url: "#", commission: "15 نقطة" }
    ]
};

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(tabId + '-section').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    updateUI();
}

function updateUI() {
    document.getElementById('userBalance').innerText = 'pt ' + state.points.toLocaleString();
    document.getElementById('userDiamonds').innerText = '💎 ' + state.diamonds + ' جواهر';
    document.getElementById('userUsd').innerText = '💵 $' + state.usd.toFixed(2) + ' USD';
    
    if(document.getElementById('adminPointsCount')) {
        document.getElementById('adminPointsCount').innerText = state.points.toLocaleString();
    }

    const logContainer = document.getElementById('transparencyLogList');
    if(logContainer) {
        logContainer.innerHTML = state.logs.map(log => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #fce7f3; font-size: 11px;">
                <div>
                    <strong style="color: #be185d;">${log.title}</strong>
                    <div style="color: #6b7280; font-size: 10px;">${log.time}</div>
                </div>
                <span style="color: #059669; font-weight: bold;">${log.desc}</span>
            </div>
        `).join('');
    }
}

function addLog(title, desc) {
    state.logs.unshift({ title, desc, time: "الآن" });
    updateUI();
}

function submitVideoHosting() {
    const titleInput = document.getElementById('videoTitleInput');
    const urlInput = document.getElementById('videoUrlInput');
    const commInput = document.getElementById('videoCommissionInput');

    if(!titleInput.value || !urlInput.value || !commInput.value) {
        alert('الرجاء إدخال كافة بيانات الفيديو والعمولة!');
        return;
    }

    state.hostedVideos.push({
        title: titleInput.value,
        url: urlInput.value,
        commission: commInput.value + ' نقطة'
    });

    addLog('استضافة فيديو جديد: ' + titleInput.value, 'عمولة: ' + commInput.value + ' نقطة');
    
    // تحديث قائمة الفيديوهات المستضافة
    const listEl = document.getElementById('hostedVideosList');
    if(listEl) {
        listEl.innerHTML += `
            <div style="background: #fdf2f8; border: 1px solid #fce7f3; border-radius: 12px; padding: 10px; font-size: 11px; margin-bottom: 6px;">
                <strong>فيديو:</strong> ${titleInput.value} (العمولة: ${commInput.value} نقطة/مشاهدة)
            </div>
        `;
    }

    titleInput.value = '';
    urlInput.value = '';
    commInput.value = '';
    alert('تمت إضافة الفيديو بنجاح إلى منصة الاستضافة!');
}

function spinWheel() {
    const reward = Math.floor(Math.random() * 50) + 10;
    state.points += reward;
    addLog('عجلة الحظ', '+' + reward + ' نقطة');
    updateUI();
    alert('مبروك! ربحت ' + reward + ' نقطة من عجلة الحظ.');
}

function requestWithdraw() {
    const acc = document.getElementById('withdrawAccount').value;
    if(!acc) {
        alert('الرجاء إدخال رقم الحساب أو المحفظة أولاً!');
        return;
    }
    addLog('طلب سحب أرباح', 'قيد المعالجة');
    alert('تم إرسال طلب السحب بنجاح وسيتم معالجته قريباً.');
    document.getElementById('withdrawAccount').value = '';
}

// تهيئة أولية
updateUI();
