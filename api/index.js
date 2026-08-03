module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>تطبيق Aegis Mobile</title>
      <style>
        :root {
          --bg-color: #0b0f19;
          --card-bg: #151c2c;
          --text-color: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #26334d;
          --primary-color: #38bdf8;
          --accent-green: #10b981;
          --btn-bg: #0284c7;
          --input-bg: #0b0f19;
        }
        .light-mode {
          --bg-color: #f1f5f9;
          --card-bg: #ffffff;
          --text-color: #0f172a;
          --text-muted: #64748b;
          --border-color: #cbd5e1;
          --primary-color: #0284c7;
          --accent-green: #059669;
          --btn-bg: #0284c7;
          --input-bg: #e2e8f0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; -webkit-tap-highlight-color: transparent; }
        html, body { height: 100vh; overflow: hidden; background-color: var(--bg-color); color: var(--text-color); }
        .app-viewport { display: flex; flex-direction: column; height: 100vh; max-width: 600px; margin: 0 auto; border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color); background-color: var(--bg-color); }
        header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--card-bg); border-bottom: 1px solid var(--border-color); }
        .logo { font-size: 1.25rem; font-weight: 800; color: var(--primary-color); }
        .theme-btn { background: transparent; border: 1px solid var(--border-color); color: var(--text-color); padding: 0.3rem 0.6rem; border-radius: 0.5rem; cursor: pointer; font-size: 0.8rem; }
        main { flex: 1; overflow-y: auto; padding: 1rem; position: relative; }
        .tab-content { display: none; animation: fadeIn 0.25s ease-in-out; }
        .tab-content.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 0.85rem; margin-bottom: 1rem; }
        .card h3 { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.4rem; }
        .card .value { font-size: 1.6rem; font-weight: bold; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.4rem; color: var(--text-muted); font-size: 0.85rem; }
        input, select { width: 100%; padding: 0.8rem; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 0.6rem; color: var(--text-color); font-size: 0.95rem; }
        .btn { width: 100%; background: var(--btn-bg); color: white; border: none; padding: 0.8rem; border-radius: 0.6rem; font-size: 0.95rem; font-weight: bold; cursor: pointer; }
        .meter { height: 8px; background: var(--input-bg); border-radius: 4px; margin-top: 0.5rem; overflow: hidden; }
        .meter-fill { height: 100%; width: 0%; transition: all 0.3s; }
        .key-output { background: var(--input-bg); border: 1px dashed var(--primary-color); padding: 0.75rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.85rem; word-break: break-all; margin-top: 1rem; text-align: center; color: var(--primary-color); display: none; }
        nav.bottom-nav { display: flex; justify-content: space-around; background: var(--card-bg); border-top: 1px solid var(--border-color); padding: 0.6rem 0; }
        .nav-item { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; background: none; border: none; color: var(--text-muted); font-size: 0.75rem; cursor: pointer; width: 25%; }
        .nav-item.active { color: var(--primary-color); font-weight: bold; }
        .nav-icon { font-size: 1.2rem; }
        #toast { visibility: hidden; min-width: 200px; background-color: var(--card-bg); color: var(--text-color); border: 1px solid var(--primary-color); text-align: center; border-radius: 0.5rem; padding: 0.75rem; position: fixed; z-index: 1000; left: 50%; top: 70px; transform: translateX(-50%); box-shadow: 0 10px 20px rgba(0,0,0,0.3); font-size: 0.85rem; }
        #toast.show { visibility: visible; animation: fadein 0.4s, fadeout 0.4s 2.2s; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeout { from { opacity: 1; } to { opacity: 0; } }
        table { width: 100%; border-collapse: collapse; text-align: right; }
        th, td { padding: 0.6rem; border-bottom: 1px solid var(--border-color); font-size: 0.8rem; }
      </style>
    </head>
    <body>
      <div class="app-viewport">
        <header>
          <div class="logo">🛡️ Aegis Mobile</div>
          <button class="theme-btn" onclick="toggleTheme()" id="themeBtn">☀️ فاتح</button>
        </header>
        <main>
          <div id="tab-dashboard" class="tab-content active">
            <h2 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--primary-color);">الرئيسية | حالة المنظومة</h2>
            <div class="card">
              <h3>حالة الخادم الفوري</h3>
              <div class="value" style="color:var(--accent-green);">نشط 100%</div>
            </div>
            <div class="card">
              <h3>إجمالي العمليات المنفذة</h3>
              <div class="value" id="totalCount">0</div>
            </div>
            <div class="card">
              <h3>معدل الاستجابة (Ping)</h3>
              <div class="value" id="pingValue">28 ms</div>
            </div>
          </div>
          <div id="tab-services" class="tab-content">
            <h2 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--primary-color);">إرسال طلب جديد</h2>
            <div class="card">
              <form onsubmit="handleFormSubmit(event)">
                <div class="form-group">
                  <label>اسم المشترك / المعرف</label>
                  <input type="text" id="username" placeholder="أدخل الاسم..." required>
                </div>
                <div class="form-group">
                  <label>نوع الخدمة</label>
                  <select id="service">
                    <option value="فحص أمني شامل">فحص أمني شامل</option>
                    <option value="توليد مفتاح API">توليد مفتاح API مشفر</option>
                    <option value="حماية الشبكة">حماية وسيرفر Shield</option>
                  </select>
                </div>
                <button type="submit" class="btn">تنفيذ الطلب 🚀</button>
              </form>
            </div>
          </div>
          <div id="tab-tools" class="tab-content">
            <h2 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--primary-color);">أدوات الأمان والحماية</h2>
            <div class="card">
              <h3 style="color:var(--text-color); margin-bottom:0.8rem;">🔒 فحص قوة كلمة المرور</h3>
              <input type="text" id="passInput" oninput="checkStrength()" placeholder="اكتب كلمة مرور لفحصها...">
              <div class="meter"><div class="meter-fill" id="meterFill"></div></div>
              <p id="passScore" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">ادخل نصاً للتجربة...</p>
            </div>
            <div class="card">
              <h3 style="color:var(--text-color); margin-bottom:0.8rem;">🔑 توليد مفاتيح مشفرة</h3>
              <button class="btn" style="background: var(--accent-green);" onclick="generateKey()">توليد مفتاح جديد ⚡</button>
              <div class="key-output" id="keyDisplay"></div>
            </div>
          </div>
          <div id="tab-logs" class="tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h2 style="font-size: 1.1rem; color: var(--primary-color);">📋 سجل الطلبات</h2>
              <button class="theme-btn" onclick="exportCSV()">تحميل CSV 📥</button>
            </div>
            <div class="card" style="padding:0.5rem; overflow-x:auto;">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>المشترك</th>
                    <th>الخدمة</th>
                    <th>الوقت</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  <tr id="emptyRow">
                    <td colspan="4" style="text-align:center; color:var(--text-muted); padding:1rem;">لا توجد سجلات.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <nav class="bottom-nav">
          <button class="nav-item active" onclick="switchTab('tab-dashboard', this)">
            <span class="nav-icon">📊</span>
            <span>الرئيسية</span>
          </button>
          <button class="nav-item" onclick="switchTab('tab-services', this)">
            <span class="nav-icon">📝</span>
            <span>الطلبات</span>
          </button>
          <button class="nav-item" onclick="switchTab('tab-tools', this)">
            <span class="nav-icon">⚡</span>
            <span>الأدوات</span>
          </button>
          <button class="nav-item" onclick="switchTab('tab-logs', this)">
            <span class="nav-icon">📋</span>
            <span>السجل</span>
          </button>
        </nav>
      </div>
      <div id="toast">تمت العملية بنجاح!</div>
      <script>
        var count = 0;
        var transactions = [];
        function switchTab(tabId, btn) {
          var tabs = document.querySelectorAll('.tab-content');
          for (var i = 0; i < tabs.length; i++) { tabs[i].classList.remove('active'); }
          var btns = document.querySelectorAll('.nav-item');
          for (var j = 0; j < btns.length; j++) { btns[j].classList.remove('active'); }
          document.getElementById(tabId).classList.add('active');
          btn.classList.add('active');
        }
        function showToast(msg) {
          var toast = document.getElementById("toast");
          toast.innerText = msg;
          toast.className = "show";
          setTimeout(function() { toast.className = ""; }, 2500);
        }
        function toggleTheme() {
          var body = document.body;
          var themeBtn = document.getElementById('themeBtn');
          body.classList.toggle('light-mode');
          themeBtn.innerText = body.classList.contains('light-mode') ? '🌙 داكن' : '☀️ فاتح';
        }
        function generateKey() {
          var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_!';
          var key = 'aegis_app_';
          for (var i = 0; i < 20; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          var display = document.getElementById('keyDisplay');
          display.style.display = 'block';
          display.innerText = key;
          showToast("تم إنشاء المفتاح بنجاح! 🔑");
        }
        function checkStrength() {
          var val = document.getElementById('passInput').value;
          var fill = document.getElementById('meterFill');
          var txt = document.getElementById('passScore');
          var score = 0;
          if (val.length > 5) score += 25;
          if (val.length > 10) score += 25;
          if (/[A-Z]/.test(val)) score += 25;
          if (/[0-9!@#$%^&*]/.test(val)) score += 25;
          fill.style.width = score + '%';
          if (score <= 25) { fill.style.backgroundColor = '#ef4444'; txt.innerText = 'ضعيفة ❌'; }
          else if (score <= 50) { fill.style.backgroundColor = '#f97316'; txt.innerText = 'متوسطة ⚠️'; }
          else if (score <= 75) { fill.style.backgroundColor = '#eab308'; txt.innerText = 'جيدة 👍'; }
          else { fill.style.backgroundColor = '#10b981'; txt.innerText = 'قوية ومحمية 🛡️'; }
        }
        function handleFormSubmit(e) {
          e.preventDefault();
          var user = document.getElementById('username').value;
          var service = document.getElementById('service').value;
          var time = new Date().toLocaleTimeString('ar-EG');
          count++;
          document.getElementById('totalCount').innerText = count;
          var emptyRow = document.getElementById('emptyRow');
          if (emptyRow) emptyRow.remove();
          transactions.push({ id: count, user: user, service: service, time: time });
          var tableBody = document.getElementById('tableBody');
          var newRow = document.createElement('tr');
          newRow.innerHTML = '<td>' + count + '</td><td><b>' + user + '</b></td><td>' + service + '</td><td>' + time + '</td>';
          tableBody.prepend(newRow);
          document.getElementById('username').value = '';
          showToast("تم تنفيذ الطلب بنجاح! 🚀");
        }
        function exportCSV() {
          if (transactions.length === 0) {
            showToast("لا توجد بيانات للسجل!");
            return;
          }
          var csv = "ID,User,Service,Time\\n";
          transactions.forEach(function(t) { csv += t.id + "," + t.user + "," + t.service + "," + t.time + "\\n"; });
          var blob = new Blob([csv], { type: 'text/csv' });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', 'aegis_logs.csv');
          a.click();
          showToast("تم تحميل الملف! 📥");
        }
        setInterval(function() {
          var ping = Math.floor(Math.random() * (35 - 18 + 1)) + 18;
          document.getElementById('pingValue').innerText = ping + ' ms';
        }, 3000);
      </script>
    </body>
    </html>
  `);
};
