# Analytics API Reporting Tips

This article provides an example of how to create API requests compatible with Analysis Workspace. Following this example, you can use Analysis Workspace to make additional requests after seeing how it works.

This example includes the **Try it out** feature in the Swagger interface. It also includes using the Analysis Workspace debugger tool, which allows you to view the different API requests it makes. This debugger is helpful in understanding report requests and in exploring Analytics 2.0 APIs.

## Running a report from Analysis Workspace

To run a report from Analysis Workspace:

1. Log into Analysis Workspace and click the **Create New Project** button to create a new project.

  ![tips_create_new_project](/images/tips_create_new_project.png?raw=true)

2. Scroll down and select the **Products** template. Click the **Create** button.

  ![tips_retail_template](/images/tips_retail_template.png?raw=true)

3. Open the browser's developer tools. The following examples show steps for opening Chrome's developer tools: 

  * On a Mac: Select **View** > **Developer** > **Developer Tools**.

    ![tips_open_dev_tools](/images/tips_open_dev_tools.png?raw=true)

  * On a PC: Select the menu for more options > **More Tools** > **Developer Tools**. 

    ![tips](/images/tips_open_dev_tools_pc.png?raw=true)

4. In the developer tools, click the **Console** tab and enter `adobe.tools.debug.includeOberonXml = true` into the console. Press Enter and then refresh the page.

  ![tips_debug_text](/images/tips_debug_text.png?raw=true)

5. On the **Product Performance Grid** panel in Analysis Workspace, click the debug icon and then click **Freeform Table**. A list of numbered requests appears below the **Freeform Table** option. Click one of the requests.

  ![tips_debug_link](/images/tips_debug_link.png?raw=true)

6. In the Analysis Workspace debugger, scroll down to the **JSON REQUEST** box and copy the text, either manually, or by clicking the **Copy to Clipboard** button.

  ![tips_copy_json](/images/tips_copy_json.png?raw=true)

7. Log into the Analytics 2.0 Swagger interface, expand the **`/reports/ranked`** endpoint, and then click the **Try it out** button.

8. Paste the json into the request **body** box and click **Execute**.

9. Scroll down to the **Response body** and verify that the response results match those in the Analysis Workspace debugger. If so, you have successfully used the Analytics 2.0 `/reports` API and the Swagger interface.

  ![tips_response_body](/images/tips_response_body.png?raw=true)

*Note: Before closing Analysis Workspace, you can turn off the debugger by opening your browser developer tools and pasting the following text into the console field: `adobe.tools.debug.includeOberonXml = false`. Press Enter and then refresh the page. The debug icons disappear once the debugger is off.*
