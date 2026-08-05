let state = {
    points: 1315,
    diamonds: 35,
    usd: 0.00,
    transparencyLogs: [
        { text: "🎁 مكافأة الدخول اليومي", amount: "+50 نقطة", time: "الآن" }
    ]
};

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    document.getElementById(tabId + '-section').classList.add('active');
    btnElement.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUI() {
    document.getElementById('userBalance').innerText = 'pt ' + state.points.toLocaleString();
    document.getElementById('userDiamonds').innerText = '💎 ' + state.diamonds + ' جواهر';
    state.usd = (state.points * 0.001).toFixed(2);
    document.getElementById('userUsd').innerText = '💵 $' + state.usd + ' USD';
    
    // تحديث لوحة التحكم إن وجدت
    let adminPts = document.getElementById('adminPointsCount');
    if(adminPts) adminPts.innerText = state.points;
    
    renderTransparencyLogs();
}

function addLog(text, amount) {
    state.transparencyLogs.unshift({ text, amount, time: "منذ لحظات" });
    if (state.transparencyLogs.length > 5) state.transparencyLogs.pop();
    updateUI();
}

function renderTransparencyLogs() {
    let container = document.getElementById('transparencyLogList');
    if (!container) return;
    container.innerHTML = state.transparencyLogs.map(log => `
        <div style="background: #fdf2f8; padding: 8px 12px; border-radius: 10px; display: flex; justify-content: space-between; font-size: 11px; border: 1px solid #fce7f3; margin-bottom: 5px;">
            <span style="color: #1f2937; font-weight: 700;">${log.text} (${log.time})</span>
            <span style="color: #047857; font-weight: 800;">${log.amount}</span>
        </div>
    `).join('');
}

function spinWheel() {
    let rewards = [10, 50, 100, 200, 500, 20];
    let win = rewards[Math.floor(Math.random() * rewards.length)];
    state.points += win;
    addLog("🎡 عجلة الحظ", `+${win} نقطة`);
    alert(`مبروك! ربحت ${win} نقطة من عجلة الحظ.`);
}

function requestWithdraw() {
    let acc = document.getElementById('withdrawAccount').value;
    if(!acc) {
        alert("الرجاء إدخال تفاصيل حساب السحب");
        return;
    }
    alert("تم تقديم طلب السحب بنجاح وسيتم معالجته بشفافية قريباً.");
    document.getElementById('withdrawAccount').value = '';
}
