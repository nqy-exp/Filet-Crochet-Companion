
# 🧶 Filet Crochet Companion (Beta)

**Vibe Coding Project.** I built this because I kept losing track of rows while crocheting filet lace patterns. This companion helps you focus on specific sections, move around, and mark your progress easily.

## 🛠️ What does it do?
A specialized tool designed to:
1. **Digitize:** Convert pattern images into Excel files.
2. **Track:** Import existing Excel patterns to track progress and mark motifs directly in the app.

<img width="1200" height="813" alt="FCC-index" src="https://github.com/user-attachments/assets/829743ee-dca0-47d7-a633-25ea07396edc" />

### ✨ Key Features

**Crochet Tracking Mode:**
* **Direction:** Bottom-up (matches my preference). The first row direction is adjustable.
* **Controls:**
    * `Left Click` $\rightarrow$ Mark as "Done" (with a colored overlay).
    * `Double Left Click` $\rightarrow$ Undo/Rewind.
    * `Right Click / Drag Emoji` $\rightarrow$ Mark special motifs.
* **Extras:** Supports notes, customizable rows/cols/group size, and theme colors (HUD color is fixed).

**📸 Digitizer Tool:**
Manual drawing in Excel is tedious, so I built two modes:
* **Standard Mode:** For clear images. Automatically detects rows and columns to generate an Excel grid.
* **Blurry Mode:** For blurry or irregular patterns. Just crop the pattern area, input the row/col counts, and it uses brightness sampling to detect the grid—much faster than manual drawing!

### 🌐 Language Support
To support more handmade enthusiasts, I've added several languages commonly found in crochet magazines: Simplified Chinese, Traditional Chinese, English, French, German, Spanish, Russian, and Japanese.

**Note:** My language is Simplified Chinese; all other languages are **AI-translated**. If you spot any translation errors, please let me know via an Issue!

---
## 🧵 How it works

1. Prepare your pattern in Excel: fill cells by black color to create your filet crochet grid, or use the built-in digitizer tool to generate one from an image (please double-check the output, as the tool may not be 100% accurate). Adjust it until it looks right to you.
2. Import the Excel file into the app.
3. Track your progress: mark cells as you go.

### 📌 Excel Import Tips

· After importing, the app will automatically detect the boundary based on the last row and column that contain colored cells.
· If your pattern needs empty margins, mark four corners of pattern in your Excel sheet to define rhe area.
· Once imported, use the arrow keys to move around and verify that the grid aligns with your pattern.


❗️Important: The app does not modify your Excel file or let you edit the grid. All adjustments must be made in Excel ***before importing***. Importing a new Excel file will reset all progress (completed rows, current position, and emoji marks). Please make sure you've saved your work before switching patterns.
---

## 🚀 How to run?
This is an experimental version; you need to set up your own environment.

### Prerequisites
* Python 3.13.9
* Node.js

### Commands
```bash
# 1. Clone and enter directory
git clone https://github.com/nqy-exp/Filet-Crochet-Companion.git
cd Filet-Crochet-Companion

# 2. Install dependencies
pip install -r requirements.txt
npm install

# 3. Start the app
npm start
```

---

## ⚠️ Disclaimer
This is a **Beta version**, developed for personal use.

* Expect bugs; pattern recognition accuracy depends on image quality.
* **Use at your own risk.**

**No PRs accepted. Feel free to Fork and play with it!**

**License:** [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)

---
*This README was translated with AI assistance.*

*Last update: 2026.08.20*
