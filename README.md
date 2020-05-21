# Verizon-FSD-to-Google-Calendar
Verizon FSD to Google Calendar is a Chrome extension that is designed to convert new service orders entered in Verizon's Field Service Dispatch platform to events in Google Calendar and format them accordingly, removing the need for double entry.
## Prerequisites
[Tampermonkey 4.10+](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

[FSD Variable Storage](https://gist.github.com/lukepyburn/f038a1910b5552292472023db09151a8), [FSD ID Generator](https://gist.github.com/lukepyburn/9dcb01ce6f07b00988b56846935f0248), and [FSD Button](https://gist.github.com/lukepyburn/929a9c991afc3277697585ec764c0ec4) userscripts

## Installation

1. Clone this repo using:

```
git clone https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or download it as a .zip file and extract

2. Navigate to ```chrome://extensions``` and turn Developer Mode "on" in the top right corner.

3. Select the "Load unpacked" option in the top left corner, and navigate to the ```Verizon-FSD-to-Google-Calendar``` directory when prompted. Once there, click "Select Folder". This will add the extension to your browser.

4. Download the [FSD Variable Storage](https://gist.github.com/lukepyburn/f038a1910b5552292472023db09151a8), [FSD ID Generator](https://gist.github.com/lukepyburn/9dcb01ce6f07b00988b56846935f0248), and [FSD Button](https://gist.github.com/lukepyburn/929a9c991afc3277697585ec764c0ec4) userscripts, and install all three in [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). For information on how to install Tampermonkey userscripts, click [here](https://www.tampermonkey.net/faq.php#Q102).

## Usage

**Intro:** 

Verizon's Field Service Dispatch platform is great for tracking time on a minute-to-minute basis, but the details it gives the end user the ability to see are limited. Many FSD users need to see broad, big-data details about a weeks’ worth of jobs at once, which is why the ability to transfer orders to Google Calendar is so beneficial. This extension will allow users to transfer any work orders saved in FSD to Google Calendar so they can leverage both systems without having to do any double entry.

**Step 1:**

As soon as you have saved a new work order in FSD, it’s time to transfer it over to Google Calendar. The first thing you always need to do is refresh the webpage. You can do this by clicking the “Refresh” button in your browser as shown below, or by using the keyboard shortcut ```CTRL+R```.

**Step 2:**

Once you have refreshed the webpage, verify that the “Select Job Details” button can be seen on the top right-hand side of your screen. It looks like this:

![Documentation1](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%201.png)

If you can see this button, that means the extension is functioning correctly. If you don’t see it, keep refreshing the page until it appears.

**Step 3:**

Now you need to select the service order you want to transfer from the “Pending” panel on the left-hand side of the screen. If you just saved a new service order, it will be the one at the very bottom.
For example: Let’s assume this entry was just saved to FSD, and we need to transfer it to Google Calendar.

![Documentation2](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%202.png)

Click on the service order in the “Pending” panel, and it will open back up in a side panel to the right-hand side of the page that looks like this:

![Documentation3](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%203.png)


Once this panel is open, we’re ready to transfer.

**Step 4:**

Click the large red button at the top right-hand side of the screen that says “Select Job Details”. When you do, all of the text in the job’s panel on the right-hand side of the screen will be selected, highlighting it in blue, as shown below:

![Documentation5](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%205.png)

Once the text is highlighted, you can move to the next step.

**Step 5:**

Right click anywhere inside the side panel with the selected text. **If you right click outside of the side panel with the selected text, the transfer will fail.**

When you right click, a context menu will appear. Inside of that context menu, you will see an icon labeled **“FSD to Google Calendar”**. It will look like this:

![Documentation6](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%206.png)

Click on it, and when you do, Google Calendar will open in a new tab.

This new tab will open with the entire Google Calendar entry already filled out, with the exception of the event description, as shown below:

![Documentation7](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%207.png)

**Step 6:**

Now, all we need is the description. The extension has automatically set your cursor’s position to the description text box, and copied the description from FSD to your clipboard. All you need to do at this point is give the page about 1 second to load, and then use the keyboard shortcut ```CTRL+V``` to Paste. This will paste the description from the job in FSD to this text box.

**Final Step:** 

Verify that the information is correct, and hit Save at the top of the page.

![Documentation8](https://github.com/lukepyburn/Verizon-FSD-to-Google-Calendar/blob/master/Images/Documentation%208.png)

If you make a mistake at any point in this process, all you need to do is refresh the page and start over.



## Important Addtional Information

**Disabling Chrome's Developer Mode will cause this extension to be unloaded. If Chrome detects that it is in Developer Mode upon a broswer restart, the user will be given the option to turn Developer Mode off. When this notification appears, close it. If Developer Mode is disabled by mistake and the Verizon FSD to Google Calendar extension is unloaded, repeat steps 2 and 3 of the installation process to reload the extension.**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
