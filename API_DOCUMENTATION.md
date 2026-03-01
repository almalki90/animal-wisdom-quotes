# توثيق API حكم حيوانية 📚

## نظرة عامة
توفر هذه الخدمة واجهة برمجية بسيطة للوصول إلى مجموعة من الحكم الفلسفية المستلهمة من حياة الحيوانات. البيانات متاحة بصيغة JSON وتُحدّث يومياً بحكمة جديدة.

---

## الـ Endpoints المتاحة

### 1. الحصول على جميع الحكم
**الطلب:**
```
GET https://almalki90.github.io/animal-wisdom-quotes/quotes.json
```

**الاستجابة:**
```json
[
  {
    "id": 1,
    "quote": "القوة ليست في زئير يرجّ الأرض، بل في هيبة تجبر الغابة على الصمت قبل أن تطلّ.",
    "animal": "أسد",
    "source": "حكمة أسدية"
  },
  {
    "id": 2,
    "quote": "لا تلم السحاب إذا لم يمطرك، بل لُم أجنحتك التي لم ترتقِ لمستوى الغيم.",
    "animal": "صقر",
    "source": "حكمة صقرية"
  }
]
```

**رموز الحالة:**
- `200 OK`: تم جلب البيانات بنجاح
- `404 Not Found`: الملف غير موجود

---

## أمثلة الاستخدام

### JavaScript/Node.js
```javascript
fetch('https://almalki90.github.io/animal-wisdom-quotes/quotes.json')
  .then(response => response.json())
  .then(quotes => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`${randomQuote.quote} - ${randomQuote.animal}`);
  })
  .catch(error => console.error('Error:', error));
```

### Python
```python
import requests
import random

response = requests.get('https://almalki90.github.io/animal-wisdom-quotes/quotes.json')
quotes = response.json()
random_quote = random.choice(quotes)
print(f"{random_quote['quote']} - {random_quote['animal']}")
```

### cURL
```bash
curl https://almalki90.github.io/animal-wisdom-quotes/quotes.json | jq '.[] | select(.id == 1)'
```

---

## هيكل البيانات

كل حكمة تحتوي على الحقول التالية:

| الحقل | النوع | الوصف |
|-------|-------|-------|
| `id` | عدد صحيح | معرّف فريد للحكمة |
| `quote` | نص | نص الحكمة باللغة العربية |
| `animal` | نص | اسم الحيوان المستلهم منه |
| `source` | نص | مصدر الحكمة (مثل "حكمة أسدية") |

---

## التحديثات اليومية
يتم إضافة حكمة جديدة تلقائياً كل يوم في منتصف الليل (UTC) عبر GitHub Actions. تُولّد الحكم الجديدة باستخدام نموذج ذكاء اصطناعي متقدم بأسلوب فلسفي عميق.

---

## الحدود والقيود
- لا توجد حدود على عدد الطلبات (unlimited requests)
- البيانات مخزنة محلياً على GitHub Pages
- لا يوجد مفتاح API مطلوب

---

## الدعم والمساهمة
للإبلاغ عن مشاكل أو المساهمة بحكم جديدة، يرجى فتح issue على المستودع:
[https://github.com/almalki90/animal-wisdom-quotes/issues](https://github.com/almalki90/animal-wisdom-quotes/issues)

---

*آخر تحديث: مارس 2026*
