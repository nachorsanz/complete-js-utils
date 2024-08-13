import { base64ToBlob, blobToBase64 } from "../src/imageUtils";
import { expect, test } from "@jest/globals";

test("converts base64 to Blob and back", async () => {
  const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
  const blob = base64ToBlob(base64, "image/png");
  const base64Back = await blobToBase64(blob);
  expect(base64Back).toBe(base64);
});
