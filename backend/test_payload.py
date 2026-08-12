import urllib.request
import json

data = {
    'name': 'Rahul Patil',
    'email': 'admin@secureattend.ai',
    'phone': '+91 XXXXX XXXXX',
    'company': '',
    'serviceInterest': 'Select...',
    'budgetRange': 'Select...',
    'message': 'dvsbr fbrbrb ffbfdb'
}

req = urllib.request.Request(
    'http://localhost:8000/api/leads',
    data=json.dumps(data).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
    method='POST'
)

try:
    res = urllib.request.urlopen(req)
    print("SUCCESS:")
    print(res.read().decode())
except urllib.error.HTTPError as e:
    print(f"HTTP ERROR {e.code}:")
    print(e.read().decode())
except Exception as e:
    print(f"ERROR: {e}")
