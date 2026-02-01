# start: 2026/1/30 13:38
# end: 2026/1/31 13:38
# title: 测试参数

# 2026-01-30 20:00
# 2026-01-30 23:17
# 'Message': '签名验证错误',
# 排查到错误：sign 错误

import re
import requests
import execjs
import json

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'app-guestid': 'DB69FF258C63B6D2077F5D3F351B08D3',
    'app-version': '0',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'data-version': '1',
    'origin': 'https://hangzhou.qccqcc.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'qcc-pc-referer': 'https://hangzhou.qccqcc.com/',
    'referer': 'https://hangzhou.qccqcc.com/',
    'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
}

session = requests.session()
response = session.get('https://hangzhou.qccqcc.com/', headers=headers)
re_results = re.search(r'.*?var qccppm = "(.*?)";.*?var qccrkeys = (\[.*?\]);', response.text, re.S)
# print(re_results.groups())
qccppm_str = re_results.group(1)
qccrkeys_string = re_results.group(2)

with open('03-qcc-debug.js', 'r', encoding='utf-8') as file:
    temp_code = file.read()
    # 替换 qccppm_str
    temp_code = temp_code.replace('python_qccppm', qccppm_str)
    # 替换 qccrkeys_string
    temp_code = temp_code.replace('python_qcckeys', qccrkeys_string)

    # 去掉 qccrkeys 两侧的双引号
    temp_code = re.sub(r'"\["0"', '["0"', temp_code)
    js_code = re.sub(r'"1"\]";', '"1"];', temp_code)

#
ctx = execjs.compile(js_code)
#
payload = ctx.call('encryptPayload', 1)
print('payload', payload)


# json_data = {
#     'KM': 'A7DD7B89A5D13036C80946173A441E75',
#     'Ver': '1',
#     'Content': '896e81f77e0199418a6602598aed5b1835ab15d4a4298848d2595eb354a2b5b8a3a88690d7d0eac30e77e6ed963cf2b8bade3696f35b0c5dbb2dc8876b3591e732e6bb24ef6f453b7f6160d42685103262be56812e23cc8c53ca50300e2bb78ae7569fb672f9f260c90d372e02133ffe5ab4b8997ba8db216ebec259cfa073fa',
#     'Sign': 'fU_~P~hdzP=H[{Efh] VZJ5ze\'sW {nwm\\xdf&< LXz<Rbe\\Tsn3ll"fm.)bh{?>#ley:@erlM!bM~?BzjO;$ Sm)#UlTLPEuy+W}:it\\s0>w!{k{Qd#fn_We=M]$^Q=*"3m~}n__$9mL/l!WvtAyxZ5Zt7ZQE+A[S53&kUbNcQA',
#     'RsaPubAes': 'NI1WBEPRUtvfXQJ+GF76k3tY8AueTi+uODN+x9N9/ZO9qaAiELh1O6ZWxVkF7z43CiZSxFfvkWe3LqrNEwk7hJfrFOLpTwObd2gR+EP8CqIG/KblsQasCD5VeUdBMCojzzwJV+kSy89eEjzdj9hNu/Uwc8U0704w2a+hmjolf5s=',
#     'IV': '6BwpQ9MN2lX7JNLF',
#     'TimesTamp': '1803D5C0372017832D01BFDF383113C9',
# }
#
response = session.post(
    'https://newopenapiweb.17qcc.com/api/services/app/SearchFactory/GetPageList',
    headers=headers,
    json=payload,
)

print(response.json())