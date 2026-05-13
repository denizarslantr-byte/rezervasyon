# Piano Deri V5.8 — Merkez Final Düzeltme

Bu sürümde aşağıdaki sorunlar düzeltildi:

1. Merkez ekrandaki QR alanı tamamen kaldırıldı.
2. Merkez ekran genişlik problemi düzeltildi. Tablo sayfaya sığacak şekilde optimize edildi.
3. Personel ekleme düzeltildi.
4. Personel listesi sağ panelde görünür.
5. İzinli personel için ayrı giriş ekranı eklendi.
6. Personel izinli yapılınca boşta listeden düşer.
7. İzin kaldırılınca tekrar boşta listede görünür.
8. Merkez rezervasyon listesinde Kaydet yanında Düzelt butonu eklendi.
9. Otel panelinde Rezervasyonlarım listesinde Düzelt / İptal vardır.
10. QR kodu ve QR onayı sistemden kaldırılmıştır.

## Sheet Başlıkları

### Hotels
ID | HOTEL_NAME | USER_CODE | PASSWORD | STATUS | CREATED_AT

### Reservations
ID | DATE | TIME | HOTEL | PAX_ADULT | PAX_CHILD | NATION | NOTES | STATUS | KART | AYAK | TEZGAHTAR_1 | TEZGAHTAR_2 | TEZGAHTAR_3 | TEZGAHTAR_4 | GIRDI | CIKTI | CREATED_AT | UPDATED_AT

### Staff
ID | STAFF_NAME | STATUS | OFF_DATES | CREATED_AT

### Logs
ID | DATE | ACTION | USER | DETAILS
