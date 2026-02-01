02-test-qcc 请求还是失败。

考虑到 02-test-qcc 中使用了 jsrsasign 库中的 KEYUTIL、KJUR、hex2b64，这一次选择从 网站扣这些加密功能的代码。


遇到了一个问题，逐行调试对比网站代码，发现生成 sign 参数里面的 alg: _0x3a2ce3[_0x1f32c7(737, "[MZ6")] 得到的结果是乱码。
其原因是移位数组的自执行函数位置问题，如果其在 大数组 的下面，就会报错；反之则没有。


固定 qccppm、qcckeys，页数 这些变量
content 参数正确，但 sign 参数依旧有问题。

