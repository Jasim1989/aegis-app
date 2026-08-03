module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تطبيق Aegis | المنصة المتكاملة</title>
      <style>
        :root {
          --bg-color: #0f172a;
          --card-bg: #1e293b;
          --text-color: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --primary-color: #38bdf8;
          --btn-bg: #0284c7;
          --btn-hover: #0369a1;
          --input-bg: #0f172a;
        }

        .light-mode {
          --bg-color: #f8fafc;
          --card-bg: #ffffff;
          --text-color: #0f172a;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --primary-color: #0284c7;
          --btn-bg: #0284c7;
          --btn-hover: #0369a1;
          --input-bg: #f1f5f9;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; transition: background-color 0.3s, color 0.3s; }
        body { background-color: var(--bg-color); color: var(--text-color); min-height: 100vh; padding: 1.5rem; }
        .container { max-width: 950px; margin: 0 auto; }
        
        /* Header & Navigation */
        nav { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 2rem; }
        .logo { font-size: 1.5rem; font-weight: bold; color: var(--primary-color); display: flex; align-items: center; gap: 0.5rem; }
        .nav-controls { display: flex; align-items: center; gap: 1rem; }
        .status-badge { background: rgba(5, 150, 105, 0.2); color: #34d399; border: 1px solid #059669; padding: 0.3rem 0.8rem; border-radius: 9999px; font-size: 0.85rem; }
        .theme-btn { background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 0.4rem 0.8rem; border-radius: 0.5rem; cursor: pointer; font-weight: bold; }

        /* Stats Grid */
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem; }
        .card h3 { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem; }
        .card .value { font-size: 1.8rem; font-weight: bold; }

        /* Content Sections Layout */
        .main-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        
        .section-box { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem; }
        .section-box h2 { font-size: 1.2rem; color: var(--primary-color); margin-bottom: 1rem; }
        
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.4rem; color: var(--text-muted); font-size: 0.875rem; }
        input, select { width: 100%; padding: 0.75rem; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 0.5rem; color: var(--text-color); font-size: 0.95rem; }
        input:focus { outline: 1px solid var(--primary-color); }
        
        .btn { width: 100%; background: var(--btn-bg); color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; font-size: 1rem; font-weight: bold; cursor: pointer; }
        .btn:hover { background: var(--btn-hover); }

        /* Security Key Box */
        .key-output { background: var(--input-bg); border: 1px dashed var(--primary-color); padding: 0.75rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.9rem; word-break: break-all; margin-top: 1rem; text-align: center; color: var(--primary-color); display: none; }

        /* Table Area */
        .table-section { background: var(--card-bg); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; text-align: right; }
        th, td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; }
        th { color: var(--text-muted); font-weight: 600; }
        .no-data { text-align: center; color: var(--text-muted); padding: 1.5rem 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Navigation -->
        <nav>
          <div class="logo">🛡️ Aegis App</div>
          <div class="nav-controls">
            <button class="theme-btn" onclick="toggleTheme()" id="themeBtn">☀️ الوضع الفاتح</button>
            <div class="status-badge">● متصل ورسمي</div>
          </div>
        </nav>

        <!-- Stats -->
        <div class="grid">
          <div class="card">
            <h3>حالة النظام</h3>
            <div class="value" style="color:#34d399;">مستقر 100%</div>
          </div>
          <div class="card">
            <h3>إجمالي المعاملات</h3>
            <div class="value" id="totalCount">0</div>
          </div>
          <div class="card">
            <h3>آخر تحديث</h3>
            <div class="value" style="font-size:1.1rem; padding-top: 0.5rem;" id="lastUpdate">الآن</div>
          </div>
        </div>

        <!-- Main Form & Generator Split -->
        <div class="main-layout">
          <!-- Order Form -->
          <div class="section-box">
            <h2>📝 إرسال طلب جديد</h2>
            <form id="actionForm" onsubmit="handleFormSubmit(event)">
              <div class="form-group">
                <label>اسم المستخدم / المعرف</label>
                <input type="text" id="username" placeholder="أدخل اسمك..." required>
              </div>
              <div class="form-group">
                <label>نوع الخدمة المطلوبة</label>
                <select id="service">
                  <option value="تأكيد الحساب والأمان">تأكيد الحساب والأمان</option>
                  <option value="إنشاء مفتاح API">إنشاء مفتاح API متقدم</option>
                  <option value="طلب دعم فني مباشر">طلب دعم فني مباشر</option>
                </select>
              </div>
              <button type="submit" class="btn">تنفيذ وإضافة للسجل 🚀</button>
            </form>
          </div>

          <!-- Key Generator -->
          <div class="section-box">
            <h2>🔑 مولد مفاتيح الأمان (Security Keys)</h2>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.2rem;">يمكنك توليد مفاتيح مشفرة لاستخدامها في الربط والتكامل مع الخدمات.</p>
            <button class="btn" style="background: #059669;" onclick="generateKey()">توليد مفتاح أمان جديد ⚡</button>
            <div class="key-output" id="keyDisplay"></div>
          </div>
        </div>

        <!-- Transactions History Table -->
        <div class="table-section">
          <h2 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 1rem;">📋 سجل المعاملات والطلبات المباشرة</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>المستخدم</th>
                <th>نوع الخدمة</th>
                <th>الوقت</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              <tr id="emptyRow">
                <td colspan="5" class="no-data">لا توجد معاملات مسجلة حتى الآن. قم بتقديم طلب لتسجيله هنا!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <script>
        let count = 0;

        // Dark / Light Theme Toggle
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

        // Generate Random Security Key
        function generateKey() {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
          let key = 'aegis_sec_';
          for (let i = 0; i < 24; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          const display = document.getElementById('keyDisplay');
          display.style.display = 'block';
          display.innerText = key;
        }

        // Handle Form Submit & Live Table Append
        function handleFormSubmit(e) {
          e.preventDefault();
          const user = document.getElementById('username').value;
          const service = document.getElementById('service').value;
          const time = new Date().toLocaleTimeString('ar-EG');

          count++;
          document.getElementById('totalCount').innerText = count;
          document.getElementById('lastUpdate').innerText = time;

          const emptyRow = document.getElementById('emptyRow');
          if (emptyRow) emptyRow.remove();

          const tableBody = document.getElementById('tableBody');
          const newRow = document.createElement('tr');
          newRow.innerHTML = \`
            <td>\${count}</td>
            <td><b>\${user}</b></td>
            <td>\${service}</td>
            <td>\${time}</td>
            <td><span style="color:#34d399; font-weight:bold;">مكتمل ✅</span></td>
          \`;
          tableBody.prepend(newRow);

          document.getElementById('username').value = '';
        }
      </script>
    </body>
    </html>
  `);
};
