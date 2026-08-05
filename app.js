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
        <div style="background: #fdf2f8; padding: 8px 12px; border-radius: 10px; display: flex; justify-content: space-between; font-size: 12px; border: 1px solid #fce7f3; margin-bottom: 5px;">
            <span style="color: #1f2937; font-weight: 700;">${log.text} (${log.time})</span>
            <span style="color: #047857; font-weight: 800;">${log.amount}</span>
        </div>
    `).join('');
}

function startCleanVideo(pointsReward) {
    let btn = document.getElementById('videoBtn');
    btn.disabled = true;
    btn.innerText = "جاري مشاهدة المحتوى التعليمي...";
    
    setTimeout(() => {
        let userShare = Math.floor(pointsReward / 2); // نظام 50/50 الشفاف
        state.points += userShare;
        addLog("📺 مشاهدة فيديو تعليمي (نظام 50/50)", `+${userShare} نقطة`);
        btn.disabled = false;
        btn.innerText = "بدء مشاهدة الفيديو واحتساب الأرباح ⏱️";
        alert(`مبروك! تمت إضافة حصيلتك بشفافية تامّة: ${userShare} نقطة.`);
    }, 3000);
}
