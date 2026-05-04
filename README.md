# Rand ATM

نظام إدارة مشتركين الإنترنت — Progressive Web App بالعربية

## 🚀 رابط التطبيق

افتح: **`https://[USERNAME].github.io/RAND/`**

## 🔐 الدخول
- PIN الافتراضي: `8787`
- يمكن تغييره من: المزيد ← الأمان ← رمز PIN

## 📱 التثبيت كتطبيق على الموبايل
1. افتح الرابط أعلاه على Chrome
2. Menu (⋮) ← **"تثبيت التطبيق"** أو **"إضافة إلى الشاشة الرئيسية"**

## ✨ الميزات
- إدارة المشتركين (إضافة/تعديل/حذف/تجديد)
- تجديد جماعي + واتساب جماعي
- 4 ثيمات (فاتح/داكن/منتصف الليل/رملي)
- تصدير: PDF / Excel / JSON
- نسخة احتياطية على Telegram
- Push notifications + Biometric (Face ID/Touch ID)
- رسوم بيانية (Chart.js)
- يعمل أوفلاين (Service Worker)

## 🏗 البنية
- `index.html` — التطبيق الرئيسي (الهيكلية النظيفة v2)
- `app/` — التطبيق الأصلي (مرجعي)
- `designs/` — 6 معاينات تصاميم بصرية مختلفة
- `chooser.html` — صفحة لاختيار التصميم
- `sw.js` — Service Worker

## 🔧 التشغيل المحلي
```bash
python3 -m http.server 8080
```
ثم افتح: `http://localhost:8080`

## 📦 التقنيات
- HTML/CSS/JS (vanilla — بدون frameworks)
- Supabase (قاعدة بيانات + auth)
- Chart.js (رسوم بيانية)
- xlsx (تصدير Excel)
- Service Worker (PWA + Push)
- WebAuthn (Biometric)
