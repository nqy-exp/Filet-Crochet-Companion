# 🧶 Filet Crochet Companion (Beta)

**Vibe Coding Project.** I built this because I kept losing track of rows while crocheting filet lace patterns. This companion helps you focus on specific sections, move around, and mark your progress easily.

## 🛠️ What does it do?
A specialized tool designed to:
1. **Digitize:** Convert pattern images into Excel files.
2. **Track:** Import existing Excel patterns to track progress and mark motifs directly in the app.

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