module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تطبيق Aegis | منصة الخدمات</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background-color: #0f172a; color: #f8fafc; min-height: 100vh; padding: 1.5rem; }
        .container { max-width: 900px; margin: 0 auto; }
        
        /* Navigation */
        nav { display: flex; justify-content: space-between; align-items: center; padding-bottom: 2rem; border-bottom: 1px solid #334155; margin-bottom: 2rem; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #38bdf8; display: flex; align-items: center; gap: 0.5rem; }
        .status-badge { background: rgba(5, 150, 105, 0.2); color: #34d399; border: 1px solid #059669; padding: 0.3rem 0.8rem; border-radius: 9999px; font-size: 0.85rem; }

        /* Grid Section */
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .card { background: #1e293b; border: 1px solid #334155; padding: 1.5rem; border-radius: 0.75rem; }
        .card h3 { color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .card .value { font-size: 1.8rem; font-weight: bold; color: #f8fafc; }

        /* Interactive Form Section */
        .form-section { background: #1e293b; border: 1px solid #334155; padding: 2rem; border-radius: 0.75rem; margin-bottom: 2rem; }
        .form-section h2 { font-size: 1.25rem; color: #38bdf8; margin-bottom: 1rem; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; color: #cbd5e1; font-size: 0.9rem; }
        input, select, textarea { width: 100%; padding: 0.75rem; background: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; color: #fff; font-size: 1rem; }
        input:focus { outline: 1px solid #38bdf8; }
        
        /* Buttons */
        .btn { width: 100%; background: #0284c7; color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; font-size: 1rem; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn:hover { background: #0369a1; }
        
        /* Alert Result */
        #response-msg { display: none; margin-top: 1rem; padding: 0.75rem; background: rgba(5, 150, 105, 0.2); border: 1px solid #059669; color: #34d399; border-radius: 0.5rem; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header / Navigation -->
        <nav>
          <div class="logo">🛡️ Aegis App</div>
          <div class="status-badge">● متصل ورسمي</div>
        </nav>

        <!-- Stats Grid -->
        <div class="grid">
          <div class="card">
            <h3>حالة النظام</h3>
            <div class="value" style="color:#34d399;">مستقر 100%</div>
          </div>
          <div class="card">
            <h3>سرعة الاستجابة</h3>
            <div class="value">45ms</div>
          </div>
          <div class="card">
            <h3>الطلبات النشطة</h3>
            <div class="value">1,240</div>
          </div>
        </div>

        <!-- User Action Form -->
        <div class="form-section">
          <h2>إرسال الطلبات والمعاملات</h2>
          <form id="actionForm" onsubmit="handleSubmit(event)">
            <div class="form-group">
              <label>اسم المستخدم أو معرف الخدمة</label>
              <input type="text" id="username" placeholder="أدخل اسمك أو معرفك..." required>
            </div>
            <div class="form-group">
              <label>نوع الخدمة المطلوبة</label>
              <select id="service">
                <option value="التحقق من البيانات">التحقق من البيانات (Data Verification)</option>
                <option value="إنشاء مفتاح أمان">إنشاء مفتاح أمان (Security Key)</option>
                <option value="الدعم الفني">الدعم الفني (Technical Support)</option>
              </select>
            </div>
            <button type="submit" class="btn">تنفيذ الطلب 🚀</button>
          </form>
          <div id="response-msg"></div>
        </div>
      </div>

      <script>
        function handleSubmit(e) {
          e.preventDefault();
          const user = document.getElementById('username').value;
          const service = document.getElementById('service').value;
          const msg = document.getElementById('response-msg');
          
          msg.style.display = 'block';
          msg.innerHTML = 'تم استقبال طلبك بنجاح للخدمة: <b>' + service + '</b> بالنسبة للمستخدم <b>' + user + '</b>!';
        }
      </script>
    </body>
    </html>
  `);
};
