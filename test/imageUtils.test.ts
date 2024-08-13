import { expect, test } from "@jest/globals";
import { base64ToBlob, blobToBase64, resizeImage, imageToGrayScale } from "../src/imageUtils";

test.skip("converts base64 to Blob and back", async () => {
  const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
  const blob = base64ToBlob(base64, "image/png");
  const base64Back = await blobToBase64(blob);
  expect(base64Back).toBe(base64);
});

test.skip("resizes an image", async () => {
  const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
  const resizedBase64 = await resizeImage(base64, 100, 100);
  expect(resizedBase64).toMatch(/^data:image\/png;base64,/);
});

test.skip("converts an image to grayscale", async () => {
  const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
  const grayBase64 = await imageToGrayScale(base64);
  expect(grayBase64).toMatch(/^data:image\/png;base64,/);
});
