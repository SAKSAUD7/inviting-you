# 13 — AI & Automation Audit
**Inviting You** · Automation Potential Assessment
**Audited**: 2026-08-29

---

## Current State of Automation
**Score: 0 / 10**

Currently, the Inviting You platform relies entirely on manual labor for content creation and data entry.
- A client sends an Excel sheet or a PDF of a physical wedding card.
- The Admin manually types the Bride's name, Groom's name, venues, and timings into the `/admin/weddings/new` form.
- The Admin manually curates gallery images, uploads them to Vercel Blob, and pastes the URLs.

## Opportunities for AI Integration

### 1. The "Magic Import" (OCR + LLM Data Extraction)
**Priority: High**

Clients often provide data in unstructured formats (WhatsApp messages, photos of traditional physical cards, rough Word documents).
- **Implementation**: Implement an API route that accepts an image or text block, passes it to a Vision LLM (e.g., Gemini Pro Vision or Claude 3.5 Sonnet), and asks it to output a structured JSON object conforming to the `WeddingData` schema.
- **Result**: The Admin uploads a photo of a physical card, and the massive creation form instantly auto-fills.

### 2. Automated Image Processing & Optimization
**Priority: High**

Clients provide photos of varying sizes, aspect ratios, and file sizes.
- **Implementation**: When an admin uploads photos, an Edge function should automatically compress, resize (generate webp/avif), and center-crop faces (using a lightweight face-detection API) to ensure gallery grids look perfect regardless of the input image.

### 3. Generative Invitation Copy (The "Message")
**Priority: Medium**

Clients often don't know what to write for the "Welcome Message" or "Closing Notes".
- **Implementation**: Add an AI button next to text areas in the Admin UI: "✨ Generate Welcome Message". The prompt would use the couple's names, event types, and selected template theme (e.g., "Write a poetic, luxurious welcome message for a Velvet-themed Nikkah for Iqra and Mufassir").

## Conclusion
The architecture is perfectly positioned to integrate AI via Vercel AI SDK. Implementing "Magic Import" alone will reduce the Admin data-entry time per invitation from 30 minutes to 30 seconds.