import * as t from "https://deno.land/std/testing/asserts.ts";
import { BitWriter } from "./BitWriter.js";
import { Base2 } from "https://code4fukui.github.io/Base2/Base2.js";

Deno.test("write(1)", () => {
  const w = new BitWriter();
  w.write(1, 0);
  w.write(1, 1);
  w.write(1, 0);
  w.write(1, 1);
  w.write(1, 0);
  w.write(1, 1);
  w.write(1, 0);
  w.write(1, 1);
  t.assertEquals(w.getBytes(), Base2.decode("01010101"));
});
Deno.test("write(2)", () => {
  const w = new BitWriter();
  w.write(2, 3);
  w.write(2, 1);
  w.write(2, 2);
  w.write(2, 1);
  t.assertEquals(w.getBytes(), Base2.decode("11011001"));
});
Deno.test("write(3)", () => {
  const w = new BitWriter();
  w.write(3, 2);
  w.write(3, 5);
  w.write(3, 3);
  w.write(3, 2);
  w.write(3, 5);
  t.assertEquals(w.getBytes(), Base2.decode("0101010110101010"));
});
Deno.test("write(4)", () => {
  const w = new BitWriter();
  w.write(4, 5);
  w.write(4, 5);
  t.assertEquals(w.getBytes(), Base2.decode("01010101"));
});
Deno.test("write(5)", () => {
  const w = new BitWriter();
  w.write(5, 1);
  w.write(5, 2);
  w.write(5, 3);
  t.assertEquals(w.getBytes(), Base2.decode("0000100010000110"));
});
Deno.test("write(3) with cut", () => {
  const w = new BitWriter();
  w.write(5, 12);
  w.write(5, 5);
  w.write(5, 17);
  w.write(5, 6);
  w.write(5, 6);
  t.assertEquals(w.getBytes(true), new TextEncoder().encode("abc"));
});
