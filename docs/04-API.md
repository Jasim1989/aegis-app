# واجهات برمجة التطبيقات (API) - مشروع Aegis

## مقدمة

يعتمد مشروع Aegis على واجهات REST API للتواصل بين تطبيقات المستخدم والخادم.

- البروتوكول: HTTPS
- نوع البيانات: JSON
- المصادقة: JWT
- الترميز: UTF-8

---

# المصادقة

## تسجيل مستخدم جديد

POST /api/v1/auth/register

### البيانات

```json
{
  "name": "Ali",
  "email": "ali@example.com",
  "password": "12345678"
}
```

### الاستجابة

```json
{
  "success": true,
  "message": "User created"
}
```

---

## تسجيل الدخول

POST /api/v1/auth/login

```json
{
  "email": "ali@example.com",
  "password": "12345678"
}
```

الاستجابة:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# المستخدم

## عرض بيانات المستخدم

GET /api/v1/users/me

الاستجابة

```json
{
  "id": 1,
  "name": "Ali",
  "email": "ali@example.com"
}
```

---

# المحافظ

## إنشاء محفظة

POST /api/v1/wallets

```json
{
  "currency": "USD"
}
```

---

## عرض الرصيد

GET /api/v1/wallets/{id}

---

## تحويل الأموال

POST /api/v1/transactions/transfer

```json
{
  "from_wallet": 1,
  "to_wallet": 2,
  "amount": 150
}
```

---

# المعاملات

## سجل المعاملات

GET /api/v1/transactions

---

## تفاصيل معاملة

GET /api/v1/transactions/{id}

---

# الإدارة

## قائمة المستخدمين

GET /api/v1/admin/users

---

## تجميد مستخدم

POST /api/v1/admin/users/{id}/freeze

---

## إلغاء التجميد

POST /api/v1/admin/users/{id}/unfreeze

---

# رموز الاستجابة

| الكود | المعنى |
|-------|---------|
|200|نجاح|
|201|تم الإنشاء|
|400|طلب غير صحيح|
|401|غير مصرح|
|403|ممنوع|
|404|غير موجود|
|500|خطأ داخلي|

---

# الإصدار

الإصدار الحالي:

v1

جميع الواجهات تبدأ بـ

```
/api/v1/
```
