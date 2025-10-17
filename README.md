# Linways Faculty Evaluation Autofill Extension

## Description
This browser extension automatically fills faculty evaluation forms for all teachers on the Linways platform. It saves time by automating the repetitive task of filling evaluation questionnaires.

## Features
- **Auto All → Excellent**: Fills all teachers with "Excellent" ratings (5/5)
- **Auto All → Very Good**: Fills all teachers with "Very Good" ratings (4/5)
- **Auto All → Random**: Fills all teachers with random ratings (4-5)

---

## Installation Instructions

### 🟦 **Google Chrome / Microsoft Edge / Brave / Opera**

These Chromium-based browsers all use the same installation process:

1. **Download the Extension**
   - Download or clone this repository to your computer
   - Remember the folder location (e.g., `C:\Users\YourName\linways-autofill-extension`)

2. **Open Extensions Page**
   - **Chrome**: Navigate to `chrome://extensions/`
   - **Edge**: Navigate to `edge://extensions/`
   - **Brave**: Navigate to `brave://extensions/`
   - **Opera**: Navigate to `opera://extensions/`

3. **Enable Developer Mode**
   - Find the "Developer mode" toggle in the top right corner
   - Turn it **ON**

4. **Load the Extension**
   - Click the **"Load unpacked"** button
   - Browse to the `linways-autofill-extension` folder
   - Select the folder and click **"Select Folder"**

5. **Verify Installation**
   - You should see "Linways Faculty Evaluation Autofill" in your extensions list
   - The extension icon should appear in your browser toolbar
   - If you don't see the icon, click the extensions puzzle piece icon and pin it

---

### 🦊 **Mozilla Firefox**

Firefox requires extensions to be temporarily loaded or signed for permanent installation.

#### **Option 1: Temporary Installation (for testing)**

1. **Open Firefox Debugging Page**
   - Navigate to `about:debugging#/runtime/this-firefox`
   - Or go to Menu → More Tools → Debugging → This Firefox

2. **Load Temporary Add-on**
   - Click **"Load Temporary Add-on..."**
   - Browse to the `linways-autofill-extension` folder
   - Select the `manifest.json` file
   - Click **"Open"**

3. **Note**: Temporary extensions are removed when Firefox is closed

#### **Option 2: Permanent Installation (requires conversion)**

Firefox uses a different manifest format. To convert:

1. **Update manifest.json** for Firefox compatibility:
   - Change `"manifest_version": 3` to `"manifest_version": 2`
   - Update permissions and scripts format
   - (Advanced users only - requires code modifications)

2. **Sign the Extension** (for permanent use):
   - Create a Firefox Developer account
   - Submit to Firefox Add-ons for signing
   - Or use web-ext tool for self-signing

**Recommendation**: Use Chrome/Edge for this extension as it's built for Manifest V3.

---

### 🧭 **Safari (macOS)**

Safari requires extensions to be converted to Safari Web Extension format:

1. **Use Xcode Converter**
   - Install Xcode from Mac App Store
   - Use the built-in Safari Web Extension Converter
   - Run: `xcrun safari-web-extension-converter /path/to/extension`

2. **Build in Xcode**
   - Open the generated Xcode project
   - Build and run the extension
   - Enable in Safari preferences

**Note**: Safari conversion is complex and requires macOS with Xcode.

---

## Usage Instructions

### How to Use the Extension

1. **Navigate to Linways**
   - Go to your Linways faculty evaluation page
   - Make sure you're on the **teacher list page** (not an individual form)

2. **Open the Extension**
   - Click the extension icon in your browser toolbar
   - You'll see a popup with three green buttons

3. **Choose Your Option**
   - **Auto All → Excellent**: All teachers get 5/5 ratings
   - **Auto All → Very Good**: All teachers get 4/5 ratings
   - **Auto All → Random**: All teachers get random 4-5 ratings

4. **Confirm and Wait**
   - Click your chosen button
   - Confirm the action when prompted
   - **Don't close the tab or navigate away!**
   - The extension will automatically:
     - Find all pending teachers
     - Open each teacher's form
     - Click "Attend"
     - Fill all 20 questions
     - Click "Finish"
     - Confirm with "YES"
     - Move to the next teacher

5. **Completion**
   - Wait for the completion alert
   - You'll see how many teachers were processed
   - All done! 🎉

---

## Troubleshooting

### Extension doesn't appear in toolbar
- Click the extensions/puzzle piece icon
- Find "Linways Faculty Evaluation Autofill"
- Click the pin icon to keep it visible

### "No pending teachers found" error
- Make sure you're on the teacher list page
- Check that there are teachers marked as "Click to proceed"
- Refresh the page and try again

### Forms not filling correctly
- Reload the extension: Go to extensions page → Click reload icon
- Refresh the Linways page
- Try again

### Extension works but stops mid-way
- Check your internet connection
- Make sure the browser tab stays active
- Don't navigate away during automation

### Buttons don't respond
- Right-click the extension icon → "Reload extension"
- Close and reopen the popup
- Refresh the Linways page

---

## Supported Browsers

| Browser | Support | Notes |
|---------|---------|-------|
| Google Chrome | ✅ Full | Recommended |
| Microsoft Edge | ✅ Full | Recommended |
| Brave | ✅ Full | Works perfectly |
| Opera | ✅ Full | Works perfectly |
| Vivaldi | ✅ Full | Chromium-based |
| Firefox | ⚠️ Limited | Requires temporary installation |
| Safari | ⚠️ Limited | Requires conversion |

---

## Technical Details

- **Manifest Version**: 3 (Chrome standard)
- **Permissions**: activeTab, scripting
- **Works on**: `*.linways.com` domains only
- **Languages**: JavaScript, HTML, CSS
- **No external dependencies**
- **No data collection**

---

## Privacy & Security

- ✅ **No data is collected or sent anywhere**
- ✅ **Only works on Linways websites**
- ✅ **No tracking or analytics**
- ✅ **All processing happens locally in your browser**
- ✅ **Open source - inspect the code yourself**

---

## Version
1.0.0

## License
Free to use for personal and educational purposes.

## Support
For issues or questions, check the code or modify as needed. This is an automation tool - use responsibly!

---

## Quick Start Summary

**Chrome/Edge/Brave/Opera Users:**
1. Go to `chrome://extensions/` (or equivalent)
2. Enable Developer Mode
3. Click "Load unpacked"
4. Select the extension folder
5. Done! Use the extension on Linways

**Firefox Users:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json`
4. Use immediately (will be removed on browser restart)

---

**🎉 Enjoy automated faculty evaluations!**
