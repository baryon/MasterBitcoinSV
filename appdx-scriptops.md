# 附录B、交易脚本语言操作符，常量和符号

> 原内容来源于[Opcodes used in Bitcoin Script - Bitcoin Wiki](https://wiki.bitcoinsv.io/index.php/Opcodes_used_in_Bitcoin_Script) 和[Script - Bitcoin Wiki](https://en.bitcoin.it/wiki/Script) 基于CC 3.0 做了修订和更新。中文翻译来自[MasterBitcoin2CN-appdx-scriptops](https://github.com/tianmingyun/MasterBitcoin2CN/blob/master/appdx-scriptops.md) 基于 CC BY-SA 4.0 做了修订和更新

这里是所有 比特币脚本操作符，也称为关键词、命令或函数。False 是零或负零(使用了任意数量的字节)或空数组，而 True 是其他任何东西。

## 常量

| 符号               | 值 (十六进制)     | 输入        | 输出            | 描述                             |
| ---------------- | ------------ | --------- | ------------- | ------------------------------ |
| OP_0 or OP_FALSE | 0x00         | Nothing   | (empty value) | 把一个空的字节压入堆栈                    |
| 1-75             | 0x01-0x4b    | (special) | data          | 把接下来的N 个字节压入堆栈中，N 的取值在1 到75 之间 |
| OP_PUSHDATA1     | 0x4c         | (special) | data          | 下一个字节包括数字N，会将接下来的N 个字节压入堆栈     |
| OP_PUSHDATA2     | 0x4d         | (special) | data          | 下面两个字节包括数字N，会将接下来的N 个字节压入堆栈    |
| OP_PUSHDATA4     | 0x4e         | (special) | data          | 下面四个字节包括数字N，会将接下来的N 个字节压入堆栈    |
| OP_1NEGATE       | 0x4f         | Nothing   | -1            | 将数字-1 压入堆栈                     |
| OP_1 or OP_TRUE  | 0x51         | Nothing   | 1             | 将数字1 压入堆栈                      |
| OP_2 to OP_16    | 0x52 to 0x60 | Nothing   | 2-16          | 将数字N 压入堆栈，例如OP_2 压入数字2         |

## 程序流控制操作符

| 符号          | 值 (十六进制) | 输入           | 输出               | 描述                                                                                                                                                                                                                                     |
| ----------- | -------- | ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OP_NOP      | 0x61     | Nothing      | Nothing          | 无操作                                                                                                                                                                                                                                    |
| OP_VER      | 0x62     | Nothing      | Protocol version | 将此事务所依据的协议版本放到堆栈上。(此操作码计划在Chronicle版本中重新启用)                                                                                                                                                                                            |
| OP_IF       | 0x63     |              |                  | 如果栈项元素值不为FALSE，在IF和ELSE之间的语句将被执行。如果如果栈项元素值为FALSE，在ELSE和ENDIF之间的语句将被执行。栈顶元素被删除。<expression> IF [statements>ELSE [statements]ENDIF                                                                                                       |
| OP_NOTIF    | 0x64     |              |                  | 如果栈项元素值为FALSE，在IF和ELSE之间的语句将被执行。如果如果栈项元素值不为FALSE，在ELSE和ENDIF之间的语句将被执行。栈顶元素被删除。<expression> IF [statements>ELSE [statements]ENDIF                                                                                                       |
| OP_VERIF    | 0x65     |              |                  | 如果栈项元素值等于交易执行时的协议版本，在IF和ELSE之间的语句将被执行。如果如果栈项元素值不等于交易执行时的协议版本，在ELSE和ENDIF之间的语句将被执行。栈顶元素被删除。(此操作码计划在Chronicle版本中重新启用) <expression> IF [statements>ELSE [statements]ENDIF                                                                 |
| OP_VERNOTIF | 0x66     |              |                  | 如果栈项元素值不等于交易执行时的协议版本，在IF和ELSE之间的语句将被执行。如果如果栈项元素值等于交易执行时的协议版本，在ELSE和ENDIF之间的语句将被执行。栈顶元素被删除。(此操作码计划在Chronicle版本中重新启用) <expression> IF [statements>ELSE [statements]ENDIF                                                                 |
| OP_ELSE     | 0x67     |              |                  | 如果前述的OP_IF 或OP_NOTIF 或OP_ELSE 未被执行，这些语句就会被执行                                                                                                                                                                                           |
| OP_ENDIF    | 0x68     |              |                  | 终止OP_IF, OP_NOTIF, OP_ELSE 区块                                                                                                                                                                                                          |
| OP_VERIFY   | 0x69     | True / False | Nothing / Fail   | 如果栈项元素值非真，则标记交易无效。栈顶元素被删除。                                                                                                                                                                                                             |
| OP_RETURN   | 0x6a     | Nothing      | 结束脚本。栈顶元素是脚本最终结果 | OP_ Return 还可用于创建“ False Return”输出，其中 scriptPubKey 由 OP_FALE OP _RETURN 和数据组成。这样的输出是不可花费的，并且应该给出一个零Satoshi值。可以从 UTXO数据集存储中删除这些输出，从而减小大小。目前BitcoinSV 网络支持在给定交易中包含多个 FALSE RETURN 输出，最初每个输出可以容纳100KB 的数据。在2020年创世升级之后，根据矿工的设置可包含任何大小的数据。 |

## 堆栈操作符

| 符号              | 值 (十六进制) | 输入                  | 输出                 | 描述                   |
| --------------- | -------- | ------------------- | ------------------ | -------------------- |
| OP_TOALTSTACK   | 0x6b     | x1                  | (alt)x1            | 从主堆栈中取出元素，推入辅堆栈。     |
| OP_FROMALTSTACK | 0x6c     | (alt)x1             | x1                 | 从辅堆栈中取出元素，推入主堆栈      |
| OP_2DROP        | 0x6d     | x1 x2               | Nothing            | 移除栈顶两个元素             |
| OP_2DUP         | 0x6e     | x1 x2               | x1 x2 x1 x2        | 复制栈顶两个元素             |
| OP_3DUP         | 0x6f     | x1 x2 x3            | x1 x2 x3 x1 x2 x3  | 复制栈顶三个元素             |
| OP_2OVER        | 0x70     | x1 x2 x3 x4         | x1 x2 x3 x4 x1 x2  | 把栈底的第三、第四个元素拷贝到栈顶    |
| OP_2ROT         | 0x71     | x1 x2 x3 x4 x5 x6   | x3 x4 x5 x6 x1 x2  | 移动第五、第六元素到栈顶         |
| OP_2SWAP        | 0x72     | x1 x2 x3 x4         | x3 x4 x1 x2        | 将栈顶的两个元素进行交换         |
| OP_IFDUP        | 0x73     | x                   | x / x x            | 如果栈项元素值不为0，复制该元素值    |
| OP_DEPTH        | 0x74     | Nothing             | <Stack size>       | 计算堆栈元素的数量，并将值放置在堆栈顶部 |
| OP_DROP         | 0x75     | x                   | Nothing            | 删除栈顶元素               |
| OP_DUP          | 0x76     | x                   | x x                | 复制栈顶元素               |
| OP_NIP          | 0x77     | x1 x2               | x2                 | 删除栈顶的下一个元素           |
| OP_OVER         | 0x78     | x1 x2               | x1 x2 x1           | 复制栈顶的下一个元素到栈顶        |
| OP_PICK         | 0x79     | xn ... x2 x1 x0 <n> | xn ... x2 x1 x0 xn | 把堆栈的第n 个元素拷贝到栈顶      |
| OP_ROLL         | 0x7a     | xn ... x2 x1 x0 <n> | ... x2 x1 x0 xn    | 把堆栈的第n 个元素移动到栈顶      |
| OP_ROT          | 0x7b     | x1 x2 x3            | x2 x3 x1           | 翻转栈顶的三个元素            |
| OP_SWAP         | 0x7c     | x1 x2               | x2 x1              | 栈顶的三个元素交换            |
| OP_TUCK         | 0x7d     | x1 x2               | x2 x1 x2           | 拷贝栈顶元素并插入到栈顶第二个元素之后  |

## 字符串操作

| 符号           | 值 (十六进制) | 输入    | 输出      | 描述                       |
| ------------ | -------- | ----- | ------- | ------------------------ |
| *OP_CAT*     | 0x7e     | x1 x2 | out     | 连接两个字符串                  |
| *OP_SPLIT*   | 0x7f     | x n   | x1 x2   | 在位置 n 处拆分字节序列 x          |
| *OP_NUM2BIN* | 0x80     | a b   | out     | 将数值 a 转换为长度为 b 的字节序列     |
| *OP_BIN2NUM* | 0x81     | x     | out     | 将字节序列 x 转换为数值            |
| OP_SIZE      | 0x82     | in    | in size | 把栈顶元素的字符串长度压入堆栈（原字符串不出栈） |

## 二进制算术和条件

| 符号             | 值 (十六进制) | 输入    | 输出             | 描述                               |
| -------------- | -------- | ----- | -------------- | -------------------------------- |
| *OP_INVERT*    | 0x83     | in    | out            | 所有输入的位取反，已禁用                     |
| *OP_AND*       | 0x84     | x1 x2 | out            | 对输入的所有位进行布尔与运算，已禁用               |
| *OP_OR*        | 0x85     | x1 x2 | out            | 对输入的每一位进行布尔或运算，已禁用               |
| *OP_XOR*       | 0x86     | x1 x2 | out            | 对输入的每一位进行布尔异或运算，已禁用              |
| OP_EQUAL       | 0x87     | x1 x2 | True / false   | 如果输入的两个数相等，返回1，否则返回0             |
| OP_EQUALVERIFY | 0x88     | x1 x2 | Nothing / fail | 与OP_EQUAL 一样，如结果为0，之后运行OP_VERIFY |

## 数值操作

注意: 算术输入仅限于有符号的32位整数，但可能会溢出。如果这些命令的任何输入值超过4字节，脚本必须中止并失败。

| 符号                    | 值 (十六进制) | 输入  | 输出             | 描述                               |
| --------------------- | -------- | --- | -------------- | -------------------------------- |
| OP_1ADD               | 0x8b     | in  | out            | 栈顶值加1                            |
| OP_1SUB               | 0x8c     | in  | out            | 栈顶值减1                            |
| *OP_2MUL*             | 0x8d     | in  | out            | 栈顶值乘2(此操作码计划在Chronicle版本中重新启用)   |
| *OP_2DIV*             | 0x8e     | in  | out            | 栈顶值除2(此操作码计划在Chronicle版本中重新启用)   |
| OP_NEGATE             | 0x8f     | in  | out            | 栈顶值符号取反                          |
| OP_ABS                | 0x90     | in  | out            | 栈顶值符号取正                          |
| OP_NOT                | 0x91     | in  | out            | 如果栈顶值为0 或1，则输出1或0；否则输出0          |
| OP_0NOTEQUAL          | 0x92     | in  | out            | 输入值为0 输出0；否则输出1                  |
| OP_ADD                | 0x93     | a b | out            | 弹出栈顶的两个元素，压入二者相加结果 b+a           |
| OP_SUB                | 0x94     | a b | out            | 弹出栈顶的两个元素，压入二者相减（第二项减去第一项）结果 b-a |
| OP_MUL                | 0x95     | a b | out            | 栈顶两项的积                           |
| OP_DIV                | 0x96     | a b | out            | 输出用第二项除以第一项的倍数                   |
| OP_MOD                | 0x97     | a b | out            | 输出用第二项除以第一项得到的余数                 |
| OP_LSHIFT             | 0x98     | a b | out            | 左移第二项，移动位数为第一项的二进制位数, 无视符号       |
| OP_RSHIFT             | 0x99     | a b | out            | 右移第二项，移动位数为第一项的二进制位数,无视符号        |
| OP_BOOLAND            | 0x9a     | a b | out            | 布尔与运算，两项都不为0，输出1，否则输出0           |
| OP_BOOLOR             | 0x9b     | a b | out            | 布尔或运算，两项有一个不为0，输出1，否则输出0         |
| OP_NUMEQUAL           | 0x9c     | a b | out            | 两项相等则输出1，否则输出为0                  |
| OP_NUMEQUALVERIFY     | 0x9d     | a b | Nothing / fail | 与NUMEQUAL 相同，如结果为0， 运行OP_VERIFY  |
| OP_NUMNOTEQUAL        | 0x9e     | a b | out            | 如果栈顶两项不是相等数的话，则输出1，否则输出为0        |
| OP_LESSTHAN           | 0x9f     | a b | out            | 如果第二项小于栈顶项，则输出1，否则输出为0  a<b      |
| OP_GREATERTHAN        | 0xa0     | a b | out            | 如果第二项大于栈顶项，则输出1 a>b              |
| OP_LESSTHANOREQUAL    | 0xa1     | a b | out            | 如果第二项小于或等于第一项，则输出1 a<=b          |
| OP_GREATERTHANOREQUAL | 0xa2     | a b | out            | 如果第二项大于或等于第一项，则输出1 a>=b          |
| OP_MIN                | 0xa3     | a b | out            | 输出栈顶两项中较小的一项                     |
| OP_MAX                | 0xa4     | a b | out            | 输出栈顶两项中较大的一项                     |
| OP_WITHIN             | 0xa5     | a b | out            | 如果第三项的数值介于前两项之间，则输出1，否则输出为0      |

## 加密和哈希操作

| 符号                     | 值 (十六进制) | 输入                                                                           | 输出             | 描述                                                                                                                                                                               |
| ---------------------- | -------- | ---------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OP_RIPEMD160           | 0xa6     | in                                                                           | hash           | 返回栈顶元素的RIPEMD160 哈希值                                                                                                                                                             |
| OP_SHA1                | 0xa7     | in                                                                           | hash           | 返回栈顶元素SHA1 哈希值                                                                                                                                                                   |
| OP_SHA256              | 0xa8     | in                                                                           | hash           | 返回栈顶元素SHA256 哈希值                                                                                                                                                                 |
| OP_HASH160             | 0xa9     | in                                                                           | hash           | 栈顶元素进行两次HASH，先用SHA-256，再用RIPEMD-160                                                                                                                                              |
| OP_HASH256             | 0xaa     | in                                                                           | hash           | 栈顶元素用SHA-256 算法HASH 两次                                                                                                                                                           |
| OP_CODESEPARATOR       | 0xab     | Nothing                                                                      | Nothing        | 标记已进行签名验证的数据。All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.                                       |
| OP_CHECKSIG            | 0xac     | sig pubkey                                                                   | True / false   | 交易用的签名必须是哈希值和公钥的有效签名，如果为真，则返回1，否则为0。整个事务的输出、输入和脚本(从最近执行的 op_codeseparator 到最后)都取哈希值。Op_checksig 使用的签名必须是此哈希值。                                                                    |
| OP_CHECKSIGVERIFY      | 0xad     | sig pubkey                                                                   | Nothing / fail | 与CHECKSIG 一样，但之后运行OP_VERIFY, 栈顶元素移除。                                                                                                                                             |
| OP_CHECKMULTISIG       | 0xae     | x sig1 sig2 ... <number of signatures> pub1 pub2 <number of public keys>     | True / False   | 对于每对签名和公钥运行CHECKSIG。所有的签名要与公钥匹配。实现中存在一个BUG，会从堆栈中弹出一个前缀为OP_0的值。如果公钥无法进行任何签名比较，就不会再次检查它们，所以必须使用与它们相应的公钥在 scriptPubKey 或 redeemScript 中相同的顺序将签名放在 scriptSig 中。如果所有签名都有效，则返回1，否则返回0。 |
| OP_CHECKMULTISIGVERIFY | 0xaf     | x sig1 sig2 ... <number of signatures> pub1 pub2 ... <number of public keys> | Nothing / fail | 与CHECKMULTISIG 一样，但之后运行OP_VERIFY                                                                                                                                                 |

## 用过的NOP操作符

在比特币的历史上，有操作码使用过保留的 NO_NOP 操作码标识符。现在这些操作码已经恢复到最初的无操作功能。

| 符号                                  | 值 (十六进制) | 输入             | 输出                  | 描述                            |
| ----------------------------------- | -------- | -------------- | ------------------- | ----------------------------- |
| OP_NOP2(之前是OP_CHECKLOCKTIMEVERIFY)  | 0xb1     | Nothing(之前是 x) | Nothing(之前是 x或fail) | 无操作忽略 （ 之前的语义在 bip0065中进行了描述） |
| OP_NOP3(之前是 OP_CHECKSEQUENCEVERIFY) | 0xb2     | Nothing(之前是 x) | Nothing(之前是 x或fail) | 无操作忽略（ 之前的语义在 bip0112中进行了描述）  |

## 伪关键词

这些关键词在内部用于协助交易匹配。如果在实际脚本中使用它们则无效。

| 符号               | 值 (十六进制) | 描述                  |
| ---------------- | -------- | ------------------- |
| OP_PUBKEYHASH    | 0xfd     | 表示OP_HASH160哈希的公钥   |
| OP_PUBKEY        | 0xfe     | 表示与OP_CHECKSIG兼容的公钥 |
| OP_INVALIDOPCODE | 0xff     | 代表当前未指定的操作码         |

## 保留操作符

未分配的任何操作码也被保留。使用未分配的操作码会导致交易无效。

| 符号                        | 值 (十六进制)        | 描述                        |
| ------------------------- | --------------- | ------------------------- |
| OP_RESERVED               | 0x50            | 除非放在未执行的 OP_IF 分支中，否则交易无效 |
| OP_RESERVED1              | 0x89            | 除非放在未执行的 OP_IF 分支中，否则交易无效 |
| OP_RESERVED2              | 0x8a            | 除非放在未执行的 OP_IF 分支中，否则交易无效 |
| OP_NOP1, OP_NOP4-OP_NOP10 | 0xb0, 0xb3-0xb9 | 忽略该操作符。不将交易标记为无效。         |

###### 
