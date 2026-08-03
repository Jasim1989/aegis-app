module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aegis App</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #0f172a;
          color: #f8fafc;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background-color: #1e293b;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          text-align: center;
          max-width: 400px;
          border: 1px solid #334155;
        }
        h1 { color: #38bdf8; margin-bottom: 0.5rem; }
        p { color: #94a3b8; line-height: 1.6; }
        .badge {
          background-color: #059669;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          display: inline-block;
          margin-top: 1.2rem;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🛡️ Aegis App</h1>
        <p>&#1605;&#1610;&#1585;&#1581;&#1576;&#1575;&#1619; &#1576;&#1575;&#1603;! &#1578;&#1605; &#1578;&#1593;&#1583;&#1610;&#1604; &#1575;&#1604;&#1608;&#1575;&#1580;&#1607;&#1577; &#1576;&#1606;&#1580;&#1575;&#1581;.</p>
        <div class="badge">Status: Online 🚀</div>
      </div>
    </body>
    </html>
  `);
};
