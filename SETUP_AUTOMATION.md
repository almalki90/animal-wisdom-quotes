# تفعيل نظام التحديث اليومي التلقائي ⚙️

يتطلب تفعيل نظام التحديث اليومي التلقائي بعض الخطوات البسيطة على GitHub:

## الخطوات:

### 1. إضافة مفتاح API الخاص بـ OpenAI
1. اذهب إلى إعدادات المستودع: **Settings** → **Secrets and variables** → **Actions**
2. انقر على **New repository secret**
3. أضف المفتاح التالي:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** ضع مفتاح OpenAI API الخاص بك (احصل عليه من [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys))

### 2. تفعيل GitHub Actions
1. اذهب إلى **Actions** في المستودع
2. تأكد من أن الـ Actions مفعلة (عادة تكون مفعلة بشكل افتراضي)

### 3. رفع ملفات الأتمتة
ملف سير العمل موجود في:
```
.github/workflows/daily_update.yml
```

إذا لم تتمكن من رفع الملف مباشرة عبر Git، يمكنك:
1. انسخ محتوى الملف من أسفل
2. اذهب إلى **Actions** → **New workflow** → **set up a workflow yourself**
3. الصق المحتوى وحفظ

### محتوى ملف سير العمل:
```yaml
name: Daily Animal Wisdom Update

on:
  schedule:
    - cron: '0 0 * * *' # كل يوم في منتصف الليل
  workflow_dispatch: # للسماح بالتشغيل اليدوي للتجربة

jobs:
  update-quotes:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install openai

      - name: Run update script
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: python update_quotes.py

      - name: Commit and push changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add quotes.json
          git commit -m "Automated daily update: new animal wisdom added" || echo "No changes to commit"
          git push
```

## التجربة اليدوية
بعد تفعيل الـ Actions، يمكنك تشغيل التحديث يدويًا:
1. اذهب إلى **Actions**
2. اختر **Daily Animal Wisdom Update**
3. انقر على **Run workflow** → **Run workflow**

---

## ملاحظات مهمة:
- ✅ السكربت يستخدم نموذج `gpt-4.1-mini` الذي يوفر أفضل توازن بين الجودة والتكلفة
- ✅ الحكم الجديدة تُضاف تلقائياً إلى `quotes.json`
- ✅ كل حكمة جديدة تحصل على ID فريد
- ⚠️ تأكد من أن لديك رصيد كافٍ في حسابك على OpenAI

---

بعد تفعيل هذا النظام، ستحصل على حكمة جديدة كل يوم تلقائياً! 🎉
