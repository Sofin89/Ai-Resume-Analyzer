import fs from "fs";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
//import * as pdfjsLib from "pdfjs-dist/build/pdf.node.js";

// Set worker to null to disable the need for worker in Node.js
pdfjsLib.GlobalWorkerOptions.workerSrc = null;  

export const extractTextFromPDF = async (filePath) => {
  try {
    const fileData = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const items = content.items;

      if (items.length === 0) continue;

      let pageText = "";
      let lastY = null;
      let lastItemEndX = 0;

      for (const item of items) {
        const str = item.str;
        // transform[4] = x position, transform[5] = y position
        const currentY = item.transform ? item.transform[5] : null;
        const currentX = item.transform ? item.transform[4] : 0;

        if (lastY !== null && currentY !== null) {
          const yDiff = Math.abs(lastY - currentY);

          if (yDiff > 12) {
            // Large Y gap = new paragraph / section break
            pageText += "\n\n";
          } else if (yDiff > 2) {
            // Small Y gap = new line (same section)
            pageText += "\n";
          } else if (str.length > 0 && currentX > lastItemEndX + 5) {
            // Same line but gap between items = add space
            pageText += " ";
          }
        }

        pageText += str;

        // Track the end X position of this item for spacing on the same line
        if (item.transform && item.width !== undefined) {
          lastItemEndX = currentX + item.width;
        } else {
          lastItemEndX = currentX + (str.length * 5); // rough estimate
        }

        lastY = currentY;

        // Respect explicit end-of-line markers
        if (item.hasEOL) {
          pageText += "\n";
          lastY = null; // Reset so next item doesn't double-break
        }
      }

      fullText += pageText + "\n\n";
    }

    // Clean up excessive whitespace while preserving structure
    fullText = fullText
      .replace(/[ \t]+/g, " ")         // collapse horizontal spaces
      .replace(/\n{4,}/g, "\n\n\n")    // cap consecutive newlines at 3
      .replace(/^ +| +$/gm, "")        // trim leading/trailing spaces per line
      .trim();

    return fullText;
  } catch (err) {
    console.error("❌ PDF extraction failed:", err);
    throw err;
  }
};
