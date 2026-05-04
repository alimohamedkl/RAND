# تثبيت التطبيق على هاتف أندرويد

ما أكدر أنصّب التطبيق مباشرة على هاتفك من اللاب، لكن إلك 3 طرق سهلة:

---

## 🔥 الطريقة 1 — تشغيل محلي عبر USB (الأسرع)

```bash
cd "/Users/apple/Desktop/RAND"
python3 -m http.server 8080
```

ثم على الهاتف:
1. وصّل الكيبل بالحاسوب
2. فعّل **USB Tethering** أو **Reverse Tethering** (شبكة موحدة)
3. شغّل Chrome على الهاتف
4. افتح: `http://[IP-حاسوبك]:8080`
5. للحصول على IP الحاسوب على الـMac:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

---

## ☁️ الطريقة 2 — رفع GitHub Pages (الأبسط للتثبيت كـPWA)

```bash
cd "/Users/apple/Desktop/RAND"
git init
git add .
git commit -m "RAND designs"
# أنشئ ريبو على GitHub باسم RAND
git remote add origin https://github.com/[username]/RAND.git
git branch -M main
git push -u origin main
```

ثم:
- فعّل GitHub Pages من Settings → Pages → Branch: main
- افتح الرابط من الهاتف:  
  `https://[username].github.io/RAND/`
- اختر تصميم → Chrome menu → **"إضافة إلى الشاشة الرئيسية"**

---

## 📱 الطريقة 3 — chrome://inspect (الديف ميثود)

1. على الهاتف: فعّل **خيارات المطور** + **USB Debugging**
2. وصّل الكيبل
3. على الحاسوب افتح Chrome:
   ```
   chrome://inspect
   ```
4. شغّل السرفر المحلي:
   ```bash
   cd "/Users/apple/Desktop/RAND"
   python3 -m http.server 8080
   ```
5. اعمل **Port Forwarding** في chrome://inspect ← Port: 8080
6. على الهاتف افتح: `http://localhost:8080`

---

## 🎯 لتثبيت أي نموذج كـPWA منفصل

كل نموذج يدعم التثبيت كـPWA كامل:
- `index.html` ← صفحة الاختيار (PWA)
- `app/index.html` ← التطبيق الأصلي (PWA كامل)
- `designs/1-glassmorphism.html` ← Glassmorphism
- `designs/2-material3.html` ← Material 3
- `designs/3-ios-liquid.html` ← iOS Liquid Glass
- `designs/4-neon-cyber.html` ← Neon Cyberpunk
- `designs/5-bento-minimal.html` ← Bento Minimal

افتح أي تصميم على الهاتف ← Menu (⋮) ← **"تثبيت التطبيق"** أو **"إضافة إلى الشاشة الرئيسية"**

---

## معلومات تسجيل الدخول

- **PIN الافتراضي:** `8787`
- يمكن تغييره من الإعدادات داخل التطبيق
- نفس قاعدة البيانات (Supabase) لكل النماذج
