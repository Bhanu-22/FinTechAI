import requests
import json
import datetime

# 1. Login to get token
login_url = "http://127.0.0.1:8000/auth/jwt/create/"
login_payload = {
    "email": "bhanu@gmail.com",
    "password": "password",
    "username": "bhanu@gmail.com"
}
headers = {'Content-Type': 'application/json'}

try:
    auth_response = requests.post(login_url, json=login_payload, headers=headers)
    if auth_response.status_code != 200:
        print("Login Failed")
        print(auth_response.text)
        exit()
    
    token = auth_response.json()['access']
    print("Login Successful. Token obtained.")
    
    # 2. Try to create shift
    shift_url = "http://127.0.0.1:8000/api/gig/shifts/"
    shift_payload = {
        "id": "123e4567-e89b-12d3-a456-426614174000", # Dummy UUID
        "date": str(datetime.date.today()),
        "earnings_amount": 2000
    }
    
    auth_headers = {
        'Content-Type': 'application/json',
        'Authorization': f'JWT {token}'
    }
    
    print(f"Attempting to create shift for {shift_payload['date']}...")
    response = requests.post(shift_url, json=shift_payload, headers=auth_headers)
    
    print(f"Status Code: {response.status_code}")
    print("Response Body:")
    print(response.text)

except Exception as e:
    print(f"Error: {e}")
