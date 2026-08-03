module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aegis Mobile</title>
  <style>
    :root { --bg: #0b0f19; --card: #151c2c; --text: #f8fafc; --muted: #94a3b8; --border: #26334d; --primary: #38bdf8; --green: #10b981; }
    .light { --bg: #f1f5f9; --card: #ffffff; --text: #0f172a; --muted: #64748b; --border: #cbd5e1; --primary: #0284c7; --green: #059669; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    body { background: var(--bg); color: var(--text); height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
    header { background: var(--card); padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }
    main { flex: 1; overflow-y: auto; padding: 1rem; max-width: 600px; margin: 0 auto; width: 100%; }
    .tab { display: none; }
    .tab.active { display: block; }
    .card { background: var(--card); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem; margin-bottom: 1rem; }
    .val { font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem; }
    input, select, button { width: 100%; padding: 0.75rem; margin-top: 0.5rem; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 0.5rem; }
    button.btn-primary { background: var(--primary); color: #000; font-weight: bold; border: none; cursor: pointer; }
    nav { background: var(--card); display: flex; border-top: 1px solid var(--border); }
    nav button { flex: 1; background: none; border: none; padding: 0.75rem; color: var(--muted); cursor: pointer; border-radius: 0; }
    nav button.active { color: var(--primary); font-weight: bold; border-top: 2px solid var(--primary); }
    table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.85rem; }
    th, td { padding: 0.5rem; border-bottom: 1px solid var(--border); text-align: right; }
    <style>
    :root { --bg: #0b0f19; --card: #151c2c; --text: #f8fafc; --muted: #94a3b8; --border: #26334d; --primary: #38bdf8; --green: #10b981; }
    .light { --bg: #f1f5f9; --card: #ffffff; --text: #0f172a; --muted: #64748b; --border: #cbd5e1; --primary: #0284c7; --green: #059669; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    html, body { height: 100vh; overflow: hidden; background: var(--bg); color: var(--text); }
    
    /* جعل الصفحة مقسمة تلقائياً: رأس + محتوى + شريط سفلي مثبت */
    body { display: flex; flex-direction: column; justify-content: space-between; }
    
    header { background: var(--card); padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }
    main { flex: 1; overflow-y: auto; padding: 1rem; width: 100%; max-width: 600px; margin: 0 auto; }
    .tab { display: none; }
    .tab.active { display: block; }
    .card { background: var(--card); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem; margin-bottom: 1rem; }
    .val { font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem; }
    input, select, button { width: 100%; padding: 0.75rem; margin-top: 0.5rem; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 0.5rem; }
    button.btn-primary { background: var(--primary); color: #000; font-weight: bold; border: none; cursor: pointer; }
    
    /* تثبيت القائمة السفليّة في مكانها بشكل دائم */
    nav { background: var(--card); display: flex; border-top: 1px solid var(--border); position: sticky; bottom: 0; left: 0; right: 0; z-index: 999; }
    nav button { flex: 1; background: none; border: none; padding: 0.85rem 0.5rem; color: var(--muted); cursor: pointer; border-radius: 0; font-size: 0.9rem; }
    nav button.active { color: var(--primary); font-weight: bold; border-top: 3px solid var(--primary); background: rgba(56, 189, 248, 0.05); }
    table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.85rem; }
    th, td { padding: 0.5rem; border-bottom: 1px solid var(--border); text-align: right; }
  </style>


  <main>
    <!-- TAB 1 -->
    <div id="t1" class="tab active">
      <h3 style="color:var(--primary); margin-bottom: 1rem;">الرئيسية | حالة النظام</h3>
      <div class="card">
        <div>حالة الخادم</div>
        <div class="val" style="color:var(--green);">نشط 100%</div>
      </div>
      <div class="card">
        <div>إجمالي الطلبات المنفذة</div>
        <div class="val" id="cnt">0</div>
      </div>
    </div>

    <!-- TAB 2 -->
    <div id="t2" class="tab">
      <h3 style="color:var(--primary); margin-bottom: 1rem;">تقديم طلب جديد</h3>
      <div class="card">
        <form onsubmit="addReq(event)">
          <label>اسم المشترك</label>
          <input type="text" id="usr" required placeholder="أدخل الاسم...">
          <label style="margin-top:0.5rem; display:block;">نوع الخدمة</label>
          <select id="svc">
            <option>فحص أمني</option>
            <option>توليد مفتاح API</option>
            <option>حماية السيرفر</option>
          </select>
          <button type="submit" class="btn-primary" style="margin-top:1rem;">ارسال الطلب 🚀</button>
        </form>
      </div>
    </div>

    <!-- TAB 3 -->
    <div id="t3" class="tab">
      <h3 style="color:var(--primary); margin-bottom: 1rem;">أدوات الحماية</h3>
      <div class="card">
        <div>🔑 توليد مفتاح مشفر</div>
        <button class="btn-primary" onclick="genKey()">توليد مفتاح عشوائي</button>
        <input type="text" id="keyOut" readonly style="margin-top:0.5rem; text-align:center;">
      </div>
    </div>

    <!-- TAB 4 -->
    <div id="t4" class="tab">
      <h3 style="color:var(--primary); margin-bottom: 1rem;">سجل العمليات</h3>
      <div class="card">
        <table>
          <thead>
            <tr><th>#</th><th>المستخدم</th><th>الخدمة</th></tr>
          </thead>
          <tbody id="logs">
            <tr><td colspan="3" style="text-align:center;">لا توجد سجلات.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <nav>
    <button class="active" onclick="tab('t1', this)">الرئيسية</button>
    <button onclick="tab('t2', this)">الطلبات</button>
    <button onclick="tab('t3', this)">الأدوات</button>
    <button onclick="tab('t4', this)">السجل</button>
  </nav>

  <script>
    var total = 0;
    function tab(id, b) {
      var tabs = document.querySelectorAll('.tab');
      for(var i=0; i<tabs.length; i++) tabs[i].classList.remove('active');
      var btns = document.querySelectorAll('nav button');
      for(var j=0; j<btns.length; j++) btns[j].classList.remove('active');
      document.getElementById(id).classList.add('active');
      b.classList.add('active');
    }
    function genKey() {
      var str = 'aegis_' + Math.random().toString(36).substring(2, 12);
      document.getElementById('keyOut').value = str;
    }
    function addReq(e) {
      e.preventDefault();
      total++;
      document.getElementById('cnt').innerText = total;
      var u = document.getElementById('usr').value;
      var s = document.getElementById('svc').value;
      var logs = document.getElementById('logs');
      if(total === 1) logs.innerHTML = '';
      logs.innerHTML = '<tr><td>'+total+'</td><td>'+u+'</td><td>'+s+'</td></tr>' + logs.innerHTML;
      document.getElementById('usr').value = '';
      alert('تم إضافة الطلب بنجاح!');
    }
  </script>
</body>
</html>
  `);
};
