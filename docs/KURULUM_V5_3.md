# Piano Deri V5.3 Kurulum

## 1. Google Sheet Sekmeleri

### Hotels
ID | HOTEL_NAME | USER_CODE | PASSWORD | STATUS | CREATED_AT

### Reservations
ID | DATE | TIME | HOTEL | PAX_ADULT | PAX_CHILD | NATION | NOTES | STATUS | KART | AYAK | TEZGAHTAR_1 | TEZGAHTAR_2 | TEZGAHTAR_3 | TEZGAHTAR_4 | GIRDI | CIKTI | QR_CODE | CREATED_AT | UPDATED_AT

### Staff
ID | STAFF_NAME | STATUS | CREATED_AT

### Logs
ID | DATE | ACTION | USER | DETAILS

## 2. Apps Script

Google Sheet → Uzantılar → Apps Script

`apps-script/code.gs` içeriğini yapıştır.

Deploy → New Deployment → Web App

- Execute as: Me
- Who has access: Anyone

## 3. config.js

`config/config.js` içindeki değerleri doldur:

```js
const API_URL = "https://script.google.com/macros/s/XXXX/exec";
const API_KEY = "PIANO_DERI_SECRET_2025";
const ADMIN_PIN = "1907";
```

## 4. Giriş Hatırlama

Otel girişinde veya admin girişinde “Beni Hatırla” seçilirse:
- Kod/PIN tarayıcıda saklanır.
- Bir sonraki girişte otomatik dolar.
- Admin PIN hatırlanmışsa panel otomatik açılır.

## 5. Güvenlik Notu

Apps Script Web App yayınında `Anyone` gereklidir.  
Bu yüzden V5.3 içinde basit API key kontrolü vardır.
