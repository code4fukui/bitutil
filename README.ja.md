# bitutil

JavaScript用のビットレベルのデータライターおよびリーダー。

## 特徴

- JavaScriptでビット単位のデータの読み書きが可能
- 最大16ビットのビット長をサポート
- 必要に応じて内部バッファーを自動的に拡張

## 使用方法

`BitWriter`および`BitReader`クラスを使用するには、`bitutil`モジュールからインポートします。

```javascript
import { BitWriter, BitReader } from 'bitutil';
```

## 使用例

```javascript
import { BitWriter, BitReader } from 'bitutil';

// BitWriter
const writer = new BitWriter();
writer.write(1, 0);
writer.write(1, 1);
writer.write(2, 3);
const bytes = writer.getBytes();

// BitReader
const reader = new BitReader(bytes);
console.log(reader.read(1)); // 0
console.log(reader.read(1)); // 1
console.log(reader.read(2)); // 3
```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
