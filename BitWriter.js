export class BitWriter {
  constructor(n = 1024) {
    if (typeof n == "number") {
      this.bin = new Uint8Array(n);
    } else if (n instanceof Uint8Array) {
      this.bin = n;
    }
    this.idx = 0;
    this.len = this.bin.length;
    this.remain = 8;
  }
  write(bitlen, n) {
    if (bitlen > 8) {
      throw new Error("not supported yet bitlen > 8");
    }
    if (this.remain == 0) {
      this.remain = 8;
      this.idx++;
    }
    n &= (1 << bitlen) - 1;
    if (this.len == this.idx) {
      this.extend();
    }
    if (bitlen <= this.remain) {
      this.bin[this.idx] |= n << (this.remain - bitlen);
      this.remain -= bitlen;
      return;
    }
    this.bin[this.idx] |= n >> (bitlen - this.remain);
    const bitlen2 = bitlen - this.remain;
    this.idx++;
    if (this.len == this.idx) {
      this.extend();
    }
    this.bin[this.idx] = (n & ((1 << bitlen2) - 1)) << (8 - bitlen2);
    this.remain = 8 - bitlen2;
  }
  extend() {
    const bin2 = new Uint8Array(this.len * 2);
    for (let i = 0; i < this.len; i++) {
      bin2[i] = this.bin[i];
    }
    this.bin = bin2;
    this.len = bin2.length;
  }
  getBytes(cut = false) {
    const res = new Uint8Array(this.idx + (!cut || this.remain == 0 ? 1 : 0));
    for (let i = 0; i < res.length; i++) {
      res[i] = this.bin[i];
    }
    return res;
  }
};
