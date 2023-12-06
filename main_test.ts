import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { challenge } from "./main.ts";

Deno.test(async function challengeTest() {
  assertEquals(await challenge(0, true), "Part 1: 6\nPart 2: 6");
})
