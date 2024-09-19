# Ilearn ~~Cheater~~ Helper

## Overview

The **Ilearn ~~Cheater~~ Helper** is a custom userscript designed to enhance the Ilearn educational platform. This script automates the process of logging and auto-filling answers to streamline user interactions with quizzes and learning modules.

**Honestly, fuck Ilearn, I used up my admin time to make this shit for y’all**

## Features

- **Answer Logging:** Automatically logs user responses, including multiple-choice selections, text inputs, and drag-and-drop interactions. The script captures answers when confirmation buttons on the platform are clicked.
  
- **Auto-Fill Functionality:** Restores previously saved answers when revisiting questions, reducing the need for manual re-entry and making the learning process more efficient.

- **Comprehensive Input Handling:** Supports a variety of input types such as checkboxes, radio buttons, text areas, dropdowns, and drag-and-drop elements.

- **Error Handling and Debugging:** Includes robust error logging to the console for troubleshooting and ensuring smooth operation.

## Installation

To use this userscript, you need to install a userscript manager. We recommend using [Tampermonkey](https://www.tampermonkey.net/), which is compatible with most modern browsers.

1. **Install Tampermonkey:**
   - Visit the [Tampermonkey website](https://www.tampermonkey.net/) and follow the instructions to install the extension for your browser.

2. **Add the Userscript:**
   - Open Tampermonkey in your browser.
   - Create a new script by selecting **Create a new script** from the Tampermonkey dashboard.
   - Paste the following URL into the “Add a new script” dialog:
     ```
     https://<username>.github.io/<repository>/ilearn-cheater.user.js
     ```
   - Save the script.

## Usage

- **Activate the Script:** Ensure that the script is enabled in Tampermonkey when accessing the Ilearn platform.
- **Automatic Functionality:** The script will automatically log and manage your answers based on previously saved data. It will attempt to auto-fill answers when you revisit the page.

## Troubleshooting

- **Check Console Logs:** If you encounter issues, open the browser’s developer console to view error messages and debug logs. The script includes error handling to assist with troubleshooting.
- **Verify Script URL:** Ensure that the script URL is correctly entered into Tampermonkey.

## Contributing

If you have suggestions or improvements, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For further details or support, please contact me on Platoon chat
