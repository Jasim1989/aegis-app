module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تطبيق Aegis | منصة الخدمات الأمنية المتقدمة</title>
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
          --btn-hover: #0369a1;
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
          --btn-hover: #0369a1;
          --input-bg: #e2e8f0;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; transition: all 0.25s ease; }
        body { background-color: var(--bg-color); color: var(--text-color); min-height: 100vh; padding: 1.5rem; }
        .container { max-width: 1000px; margin: 0 auto; }
        
        /* Navigation */
        nav { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 2rem; }
        .logo { font-size: 1.6rem; font-weight: 800; color: var(--primary-color); display: flex; align-items: center; gap: 0.5rem; }
        .nav-controls { display: flex; align-items: center; gap: 0.8rem; }
        .status-badge { background: rgba(16, 185, 129, 0.15); color: var(--accent-green); border: 1px solid var(--accent-green); padding: 0.4rem 0.9rem; border-radius: 9999px; font-size: 0.85rem; font-weight: bold; }
        .theme-btn { background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 0.4rem 0.9rem; border-radius: 0.5rem; cursor: pointer; font-weight: bold; }

        /* Stats Grid */
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; margin-bottom: 2rem; }
        .card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 0.75rem; position: relative; overflow: hidden; }
        .card h3 { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.5rem; }
        .card .value { font-size: 1.75rem; font-weight: bold; }

        /* Content Layout */
        .main-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        
        .section-box { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem; }
        .section-box h2 { font-size: 1.15rem; color: var(--primary-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.4rem; color: var(--text-muted); font-size: 0.85rem; }
        input, select { width: 100%; padding: 0.75rem; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 0.5rem; color: var(--text-color); font-size: 0.95rem; }
        input:focus { outline: 1px solid var(--primary-color); }
        
        .btn { width: 100%; background: var(--btn-bg); color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.95rem; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 0.5rem; }
        .btn:hover { background: var(--btn-hover); transform: translateY(-1px); }

        /* Password Checker Bar */
        .meter { height: 8px; background: var(--input-bg); border-radius: 4px; margin-top: 0.5rem; overflow: hidden; }
        .meter-fill { height: 100%; width: 0%; transition: width 0.3s, background-color 0.3s; }

        /* Key Display */
        .key-output { background: var(--input-bg); border: 1px dashed var(--primary-color); padding: 0.75rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.85rem; word-break: break-all; margin-top: 1rem; text-align: center; color: var(--primary-color); display: none; }

        /* Table Area */
        .table-section { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem; overflow-x: auto; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        table { width: 100%; border-collapse: collapse; text-align: right; }
        th, td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); font-size: 0.875rem; }
        th { color: var(--text-muted); font-weight: 600; }
        .no-data { text-align: center; color: var(--text-muted); padding: 1.5rem 0; }

        /* Notification Toast */
        #toast { visibility: hidden; min-width: 250px; background-color: var(--card-bg); color: var(--text-color); border: 1px solid var(--primary-color); text-align: center; border-radius: 0.5rem; padding: 1rem; position: fixed; z-index: 1000; left: 50%; bottom: 30px; transform: translateX(-50%); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        #toast.show { visibility: visible; animation: fadein 0.5s, fadeout 0.5s 2.5s; }
        @keyframes fadein { from { bottom: 0; opacity: 0; } to { bottom: 30px; opacity: 1; } }
        @keyframes fadeout { from { bottom: 30px; opacity: 1; } to { bottom: 0; opacity: 0; } }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Navigation -->
        <nav>
          <div class="logo">🛡️ Aegis Security Hub</div>
          <div class="nav-controls">
            <button class="theme-btn" onclick="toggleTheme()" id="themeBtn">☀️ الوضع الفاتح</button>
            <div class="status-badge">● الخدمة نشطة</div>
          </div>
        </nav>

        <!-- Stats Grid -->
        <div class="grid">
          <div class="card">
            <h3>حالة الخادم</h3>
            <div class="value" style="color:var(--accent-green);">نشط 100%</div>
          </div>
          <div class="card">
            <h3>الطلبات المنفذة</h3>
            <div class="value" id="totalCount">0</div>
          </div>
          <div class="card">
            <h3>مستوى التهديدات</h3>
            <div class="value" style="color:#f59e0b;">منخفض جداً</div>
          </div>
          <div class="card">
            <h3>زمن الاستجابة</h3>
            <div class="value" id="pingValue">32 ms</div>
          </div>
        </div>

        <!-- Main Layout -->
        <div class="main-layout">
          <!-- Form Section -->
          <div class="section-box">
            <h2>📝 تقديم طلب خدمة</h2>
            <form id="actionForm" onsubmit="handleFormSubmit(event)">
              <div class="form-group">
                <label>اسم المشترك / المعرف</label>
                <input type="text" id="username" placeholder="أدخل اسمك..." required>
              </div>
              <div class="form-group">
                <label>نوع الخدمة المطلوبة</label>
                <select id="service">
                  <option value="فحص أمني شامل">فحص أمني شامل (Security Audit)</option>
                  <option value="توليد مفتاح API">توليد مفتاح API مشفر</option>
                  <option value="حماية ضد الهجمات">حماية DDoS & Shield</option>
                </select>
              </div>
              <button type="submit" class="btn">إرسال واستجابة فورية 🚀</button>
            </form>
          </div>

          <!-- Password Checker Tool -->
          <div class="section-box">
            <h2>🔒 فحص قوة الحماية</h2>
            <div class="form-group">
              <label>جرب قوة كلمة المرور الخاص بك:</label>
              <input type="text" id="passInput" oninput="checkStrength()" placeholder="اكتب كلمة مرور لتجربتها...">
              <div class="meter"><div class="meter-fill" id="meterFill"></div></div>
              <p id="passScore" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">اكتب شيئاً لفحصه...</p>
            </div>
          </div>

          <!-- Key Generator Tool -->
          <div class="section-box">
            <h2>🔑 توليد مفتاح تشفير</h2>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">إنشاء مفاتيح مشفرة عالية الأمان بضغطة واحدة.</p>
            <button class="btn" style="background: var(--accent-green);" onclick="generateKey()">توليد مفتاح رصين ⚡</button>
            <div class="key-output" id="keyDisplay"></div>
          </div>
        </div>

        <!-- Transactions History Table -->
        <div class="table-section">
          <div class="table-header">
            <h2 style="font-size: 1.15rem; color: var(--primary-color);">📋 سجل الطلبات المباشر</h2>
            <button class="theme-btn" style="font-size:0.8rem;" onclick="exportCSV()">تصدير السجل (CSV) 📥</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>المشترك</th>
                <th>نوع الخدمة</th>
                <th>الوقت</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              <tr id="emptyRow">
                <td colspan="5" class="no-data">لا توجد طلبات مسجلة حالياً. قم بإرسال طلبك ليظهر فوراً!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Toast Notification Box -->
      <div id="toast">تمت العملية بنجاح!</div>

      <script>
        let count = 0;
        let transactions = [];

        function showToast(message) {
          const toast = document.getElementById("toast");
          toast.innerText = message;
          toast.className = "show";
          setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        }

        function toggleTheme() {
          const body = document.body;
          const themeBtn = document.getElementById('themeBtn');
          body.classList.toggle('light-mode');
          if (body.classList.contains('light-mode')) {
            themeBtn.innerText = '🌙 الوضع الداكن';
          } else {
            themeBtn.innerText = '☀️ الوضع الفاتح';
          }
        }

        function generateKey() {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_!@#';
          let key = 'aegis_sec_';
          for (let i = 0; i < 28; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          const display = document.getElementById('keyDisplay');
          display.style.display = 'block';
          display.innerText = key;
          showToast("تم توليد مفتاح الأمان بنجاح! 🔑");
        }

        function checkStrength() {
          const val = document.getElementById('passInput').value;
          const fill = document.getElementById('meterFill');
          const txt = document.getElementById('passScore');
          let score = 0;

          if (val.length > 5) score += 25;
          if (val.length > 10) score += 25;
          if (/[A-Z]/.test(val)) score += 25;
          if (/[0-9!@#$%^&*]/.test(val)) score += 25;

          fill.style.width = score + '%';
          if (score <= 25) { fill.style.backgroundColor = '#ef4444'; txt.innerText = 'ضعيفة جداً ❌'; }
          else if (score <= 50) { fill.style.backgroundColor = '#f97316'; txt.innerText = 'متوسطة ⚠️'; }
          else if (score <= 75) { fill.style.backgroundColor = '#eab308'; txt.innerText = 'جيدة 👍'; }
          else { fill.style.backgroundColor = '#10b981'; txt.innerText = 'قوية جداً ومحمية 🛡️'; }
        }

        function handleFormSubmit(e) {
          e.preventDefault();
          const user = document.getElementById('username').value;
          const service = document.getElementById('service').value;
          const time = new Date().toLocaleTimeString('ar-EG');

          count++;
          document.getElementById('totalCount').innerText = count;

          const emptyRow = document.getElementById('emptyRow');
          if (emptyRow) emptyRow.remove();

          transactions.push({ id: count, user, service, time });

          const tableBody = document.getElementById('tableBody');
          const newRow = document.createElement('tr');
          newRow.innerHTML = \`
            <td>\${count}</td>
            <td><b>\${user}</b></td>
            <td>\${service}</td>
            <td>\${time}</td>
            <td><span style="color:var(--accent-green); font-weight:bold;">مكتمل ✅</span></td>
          \`;
          tableBody.prepend(newRow);

          document.getElementById('username').value = '';
          showToast("تم إرسال الطلب وإضافته للسجل! 🚀");
        }

        function exportCSV() {
          if (transactions.length === 0) {
            showToast("لا توجد بيانات لتصديرها!");
            return;
          }
          let csv = "ID,User,Service,Time\\n";
          transactions.forEach(t => {
            csv += \`\${t.id},\${t.user},\${t.service},\${t.time}\\n\`;
          });
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', 'aegis_transactions.csv');
          a.click();
          showToast("تم تحميل ملف السجل CSV! 📥");
        }

        // Live Ping Simulation
        setInterval(() => {
          const ping = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
          document.getElementById('pingValue').innerText = ping + ' ms';
        }, 3000);
      </script>
    </body>
    </html>
  `);
};
