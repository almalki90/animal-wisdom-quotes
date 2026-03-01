import json
import os
from openai import OpenAI

def get_new_quote():
    client = OpenAI()
    prompt = "أعطني حكمة واحدة باللغة العربية بأسلوب فلسفي عميق وراقي، مستلهمة من حياة الحيوان وبقائه في الطبيعة. يجب أن تكون الحكمة بليغة ومؤثرة، تشبه في نمطها حكم العظماء. الرد يجب أن يكون بتنسيق JSON فقط كالتالي: {\"quote\": \"الحكمة العميقة هنا\", \"animal\": \"اسم الحيوان المستلهم منه\", \"source\": \"حكمة [اسم الحيوان]ية\"}"
    
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)

def update_json_file(new_quote):
    file_path = 'quotes.json'
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            quotes = json.load(f)
    else:
        quotes = []
    
    # تحديد ID جديد
    new_id = max([q['id'] for q in quotes], default=0) + 1
    new_quote['id'] = new_id
    
    quotes.append(new_quote)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(quotes, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    try:
        new_quote = get_new_quote()
        update_json_file(new_quote)
        print(f"Successfully added new quote: {new_quote['quote']}")
    except Exception as e:
        print(f"Error updating quotes: {e}")
