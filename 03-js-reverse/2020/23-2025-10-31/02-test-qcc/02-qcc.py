# start: 2026/1/31 17:31
# end: 2026/1/31 17:31
# title:


import requests
import json
import execjs


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "app-guestid": "038B470E9E24E717B9FC2BD4F7E78690",
    "app-version": "0",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "data-version": "1",
    "origin": "https://hangzhou.qccqcc.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "qcc-pc-referer": "https://hangzhou.qccqcc.com/spotgoods.html",
    "referer": "https://hangzhou.qccqcc.com/",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Microsoft Edge\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0"
}
url = "https://newopenapiweb.17qcc.com/api/services/app/SearchFactory/GetPageList"

with open('01-qcc.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
ctx = execjs.compile(js_code)
encrypt_payload = ctx.call('encryptPayload', 5)
print(encrypt_payload)
data = {
    "KM": "A7DD7B89A5D13036C80946173A441E75",
    "Ver": "1",
    "Content": "3a3c4cf83244e05e56348a860b74af1116bf4a66db729dad5bac50cd0b97ebced5f9223b8181b3ed0509db3ea3db3a5588ed9f610b5f2beea5f56d131ab14fdf226938e08a9de3b8a18e1f9c312fcabf39d2032978edb37a71dbc0665a6e232d3245a92bc2407ab374b2163796299d15",
    "Sign": "Ue`ZrD``J\\RkUZohe`(&T7nv;fG;]7FS=<b$vqwZoogsf}4p[uN<Hm~FNsa&7:n@r,P_`\"OWIWmz*v_CLQ`:^bbEHon:mWU^ pa7Hx\\b=H5wMCiO6pnG\"rZ;TS]IsI,pAchftuQ~bc]uKoSKyiNu1RV[8itt)q[?YX_qAI,t`roA",
    "RsaPubAes": "TJc9uZ5ry/7gkR0qV9ss1KrX1M2K8cH8djN+/8uz4bgcbRBKazEGZUO5DPliKGXQmlpUn0LOnflZBk529JwY2T2HMh3HHieCAoLRapN6tvretWmE0NN2P3EG+TZDWR1LIiagP3UU/SIZsJZPJUdC7H1XKYSrb5PKTPdc9d4B+h4=",
    "IV": "s0wAsGU1HtEmVf2Y",
    "TimesTamp": "500B661907F35F6D262AE9EBE592CD4E"
}
data = json.dumps(encrypt_payload, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)