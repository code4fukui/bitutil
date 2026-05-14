# bitutil

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A bit-level data writer and reader for JavaScript.

## Features

- Write and read bits of data in JavaScript
- Support bit lengths up to 16 bits
- Automatically extend the internal buffer as needed

## Usage

To use the `BitWriter` and `BitReader` classes, import them from the `bitutil` module:

```javascript
import { BitWriter, BitReader } from 'bitutil';
```

## Example

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

## License

MIT License — see [LICENSE](LICENSE).