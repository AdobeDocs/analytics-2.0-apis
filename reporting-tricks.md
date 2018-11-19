# Analytics API Reporting Tips

The new Analytics V2 API powers the Analysis Workspace project. Analysis Workspace includes a debugger that will let you view the different API requests it makes. This debugger is very helpful in learning how to craft report requests and exploring the full power of the new Analytics API.

## Running a report from Analysis Workspace

1. Log into Analysis Workspace 

![tips_landing_page](/images/tips_landing_page.png?raw=true)

2. Click on the **Create New Project** button to create a new project

![tips_create_new_project](/images/tips_create_new_project.png?raw=true)

3. Scroll down and select the **Products** template

![tips_retail_template](/images/tips_retail_template.png?raw=true)

4. Open the browser's developer tools 

On a Mac:

![tips_open_dev_tools](/images/tips_open_dev_tools.png?raw=true)

On a PC:

![tips](/images/tips_open_dev_tools_pc.png?raw=true)

5. Select the **Console** tab and enter `adobe.tools.debug.includeOberonXml = true` into the console and press Enter.

![tips_debug_text](/images/tips_debug_text.png?raw=true)

6. Refresh the page

7. Notice that you now have a debugger icon on every panel!

8. Locate the **Product Performance Grid** panel in the Analysis Workspace project and click on the debugger icon, then click on **Freeform Table**

9. Notice that there are possibly multiple requests per panel
![tips_debug_link](/images/tips_debug_link.png?raw=true)

10. Click on one of the requests

11. Copy the text from the **JSON REQUEST** box by either manually selecting the text or using the handy **Copy to Clipboard** button
![tips_copy_json](/images/tips_copy_json.png?raw=true)

12. Paste the JSON into the **`/reports/ranked`** endpoint in the Swagger interface

13. Click the **Try it out!**

14. Do your results match Analysis Workspace?

15. Open the browser's developer tools again

On a Mac:

![s5_open_dev_tools](/images/tips_open_dev_tools.png?raw=true)

On a PC:

![s5_open_dev_tools_pc](/images/tips_open_dev_tools_pc.png?raw=true)

16. Select the **Console** tab and enter `adobe.tools.debug.includeOberonXml = false` into the console and press Enter.

17. Refresh the page. The debug icon should be gone.
