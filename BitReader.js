export class BitReader {
  constructor(bin) {
    this.bin = bin;
    this.idx = 0;
    this.len = bin.length;
    this.remain = 8;
  }
  read(bitlen) { // -1:eof
    if (bitlen > 16) {
      throw new Error("not supported yet bitlen > 16");
    } else if (bitlen > 8) {
      const n = this.read(bitlen - 8);
      if (n < 0) {
        return -1;
      }
      const m = this.read(8);
      if (m < 0) {
        return (n << 8);
        //return -1;
      }
      return (n << 8) | m;
    }
    if (this.len == this.idx) {
      return -1;
    }
    if (bitlen <= this.remain) {
      const res = (this.bin[this.idx] >> (this.remain - bitlen)) & ((1 << bitlen) - 1);
      this.remain -= bitlen;
      if (this.remain == 0) {
        this.remain = 8;
        this.idx++;
      }
      return res;
    }
    const r1 = (this.bin[this.idx] & ((1 << this.remain) - 1)) << (bitlen - this.remain);
    const bitlen2 = bitlen - this.remain;
    this.idx++;
    if (this.len == this.idx) {
      return r1;
      //return -1;
    }
    const r2 = this.bin[this.idx] >> (8 - bitlen2);
    this.remain = 8 - bitlen2;
    return r1 | r2;
  }
};
