# start: 2026/2/1 15:36
# end: 2026/2/1 15:36
# title:


import requests
import execjs

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'app-guestid': '01B343B1955FA1E2B8DB80F7BC8025CC',
    'app-version': '0',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'data-version': '1',
    'origin': 'https://www.17qcc.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'qcc-pc-referer': 'https://www.17qcc.com/',
    'referer': 'https://www.17qcc.com/',
    'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
}

with open('02-qcc.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
ctx = execjs.compile(js_code)
payload = json_data = ctx.call('encryptPayload', 1)
print(payload)
json_data = {
    'KM': 'A7DD7B89A5D13036C80946173A441E75',
    'Ver': '1',
    'Content': '2937cbcfb6b360e0c44800d350186f5703fb1640e0ec699b4849ce17a3130499d1c475d089f4aa2075d49cba67487610d0f897609bcf7f0747776e81449a692b5321c724347c8470a3807df262843270',
    'Sign': 'HK7}P^mb,sj^{be_f!J}FE6APEuG:cs5Lr|U#B7XMQWSUv]\'KXPqu[$c58VMrtvo^[+q^de^\\L{IN}_"l8oM"u!0LX6kP?vkt1{}vX|j<Z+;6Uj|L\\|Ik9aUThZs#\'cz[}HU?Rc"~z3P8f~3o%keYNngmN#Xn7KROyZkTc]~:z]A',
    'RsaPubAes': 'l05edmyGg2clbdzaFz23SZ9zvpnWNK8DfT3tBlgMXYr+59BHy1mH2QSFTh4IUHBzPPr//+0O1oLJtlW2tJ4ezb0tj1n3dDdgNs8bs5GPX5klEVXvTxodTcL/imA0RhQSzUiMJzBvQSQPK0mRDEuZlMrzjulTEKOJY4PxFkvE/3w=',
    'IV': 'I7rWUe9Wul2RP7wg',
    'TimesTamp': '3A962CF5C21CA90D44A40AADF8B79F42',
}

response = requests.post(
    'https://newopenapiweb.17qcc.com/api/services/app/SearchFactory/GetPageList',
    headers=headers,
    json=json_data,
)
print(response.json())
