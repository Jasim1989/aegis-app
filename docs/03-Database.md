# قاعدة البيانات - مشروع Aegis

## الهدف

تخزين جميع بيانات النظام بشكل آمن ومنظم مع دعم التوسع المستقبلي.

## الجداول الأساسية

### Users
- id
- full_name
- email
- phone
- password_hash
- created_at

### Wallets
- id
- user_id
- balance
- currency
- status

### Transactions
- id
- sender_wallet
- receiver_wallet
- amount
- transaction_type
- status
- created_at

### Internal Coin
- id
- symbol
- total_supply
- circulating_supply
- price

### Audit Logs
- id
- user_id
- action
- ip_address
- created_at

## العلاقات

- كل مستخدم يمتلك محفظة واحدة أو أكثر.
- كل معاملة ترتبط بمحفظتين.
- جميع العمليات يتم تسجيلها في Audit Logs.

## ملاحظات

سيتم استخدام PostgreSQL في الإصدار الأول مع إمكانية الانتقال إلى قاعدة بيانات موزعة مستقبلاً.
