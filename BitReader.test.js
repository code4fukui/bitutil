import * as t from "https://deno.land/std/testing/asserts.ts";
import { BitReader } from "./BitReader.js";
import { Base2 } from "https://code4fukui.github.io/Base2/Base2.js";

Deno.test("read(1)", () => {
  const r = new BitReader(Base2.decode("01010101"));
  t.assertEquals(r.read(1), 0);
  t.assertEquals(r.read(1), 1);
  t.assertEquals(r.read(1), 0);
  t.assertEquals(r.read(1), 1);
  t.assertEquals(r.read(1), 0);
  t.assertEquals(r.read(1), 1);
  t.assertEquals(r.read(1), 0);
  t.assertEquals(r.read(1), 1);
  t.assertEquals(r.read(1), -1);
});
Deno.test("read(2)", () => {
  const r = new BitReader(Base2.decode("11011001"));
  t.assertEquals(r.read(2), 3);
  t.assertEquals(r.read(2), 1);
  t.assertEquals(r.read(2), 2);
  t.assertEquals(r.read(2), 1);
  t.assertEquals(r.read(2), -1);
});
Deno.test("read(3)", () => {
  const r = new BitReader(Base2.decode("0101010110101010"));
  t.assertEquals(r.read(3), 2);
  t.assertEquals(r.read(3), 5);
  t.assertEquals(r.read(3), 3);
  t.assertEquals(r.read(3), 2);
  t.assertEquals(r.read(3), 5);
  t.assertEquals(r.read(3), 0);
  t.assertEquals(r.read(3), -1);
});
Deno.test("read(4)", () => {
  const r = new BitReader(Base2.decode("01010101"));
  t.assertEquals(r.read(4), 5);
  t.assertEquals(r.read(4), 5);
  t.assertEquals(r.read(4), -1);
});
Deno.test("read(5)", () => {
  const r = new BitReader(Base2.decode("0000100010000110"));
  t.assertEquals(r.read(5), 1);
  t.assertEquals(r.read(5), 2);
  t.assertEquals(r.read(5), 3);
  t.assertEquals(r.read(5), 0);
  t.assertEquals(r.read(5), -1);
});
Deno.test("read(5) abc", () => {
  const r = new BitReader(new TextEncoder().encode("abc"));
  t.assertEquals(r.read(5), 12);
  t.assertEquals(r.read(5), 5);
  t.assertEquals(r.read(5), 17);
  t.assertEquals(r.read(5), 6);
  t.assertEquals(r.read(5), 6);
  t.assertEquals(r.read(5), -1);
});
Deno.test("read(14)", () => {
  const r = new BitReader(Base2.decode("1111111100000001"));
  t.assertEquals(r.read(14), 0b11111111000000);
  t.assertEquals(r.read(14), 4096);
  t.assertEquals(r.read(14), -1);
});
