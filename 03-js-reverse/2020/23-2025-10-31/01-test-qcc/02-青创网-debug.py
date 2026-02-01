# start: 2026/1/31 11:01
# end: 2026/1/31 13:17
# title: # 'Message': '签名验证错误',
# 排查到错误：sign 错误


import requests
import execjs

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'app-guestid': '038B470E9E24E717B9FC2BD4F7E78690',
    'app-version': '0',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'data-version': '1',
    'origin': 'https://hangzhou.qccqcc.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'qcc-pc-referer': 'https://hangzhou.qccqcc.com/spotgoods.html',
    'referer': 'https://hangzhou.qccqcc.com/',
    'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
}
with open('03-qcc.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
ctx = execjs.compile(js_code)
encrypt_payload = ctx.call('encryptPayload', 5)

json_data = {
    'KM': 'A7DD7B89A5D13036C80946173A441E75',
    'Ver': '1',
    'Content': '49020442129e096968bbb866e639f46f636704c568117d7de70c605ee63779bd45f68945f004b8dadc5d185ad69f79d7a2a9e545f1da2789f79a38c0e698e4588b23428f8481358add42ad7d2ff0cba3cf1b54a535278997a98ec473062efed521d3f587f00ae0a22185a68335708aa4',
    'Sign': "qFXV A%_w'Qs9bp}gmy@tZ|KD_d%+@e4K=Yu316qX{?IP]lD3$gJWKUco{PdE=L\"U}#.]Et6p^_G~;V^YTgs\\HvG]\"H3!3c)(}U%;R}<`(Q|`E<|?r\"\\.o:BGqZ>dxsW}${tzY=~fyWRI:8=^}vqy\"u<PTS}RE9?IqRzdl$`(PIA",
    'RsaPubAes': 'fvo+TwJpt4Bn72dDXIcH8TPjO4isQLkzc/Q7bfMXO7lmSr9OnyXrWgDGoc7YnAAoyA4wF182re0uyA87gyEj6nxdhHfEfcBge+KJIgKVMrLm9jwMR+WfPzpQJCXZJR+2ahf7N7KaTfyQEw54/dHaZ/8y2Ip3D4MCOPdLVssxpbM=',
    'IV': 'wmKuHSu2l3niBM8J',
    'TimesTamp': '383A842A504D94F235F51347AC2C995F',
}
json_data.update(encrypt_payload)

response = requests.post(
    'https://newopenapiweb.17qcc.com/api/services/app/SearchFactory/GetPageList',
    headers=headers,
    json=json_data,
)

print(response.json())