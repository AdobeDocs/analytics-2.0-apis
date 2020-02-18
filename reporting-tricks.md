# Analytics API Reporting Tips

This article provides an example of how to create API requests compatible with Analysis Workspace. Following this example, you can use Analysis Workspace to make additional requests after seeing how it works.

This example includes the **Try it out** feature in the Swagger interface. It also includes using the Analysis Workspace debugger tool, which allows you to view the different API requests it makes. This debugger is helpful in understanding report requests and in exploring Analytics 2.0 APIs.

## Example API request creation

To create an example API request compatible with Analysis Workspace:

1. Log into Analysis Workspace and create a [new project](https://docs.adobe.com/content/help/en/analytics/analyze/analysis-workspace/build-workspace-project/t-freeform-project.html) from the [**Products**](https://docs.adobe.com/content/help/en/analytics/analyze/analysis-workspace/build-workspace-project/starter-projects.html) template. 

1. Click **Enable Debugger** from the project **Help** menu. 

 ![Enable Debugger](/images/tips_enable.png?raw=true)

1. Read the Enable Debugger message that appears and click **OK**.

 ![Debugger message](/images/tips_message.png?raw=true)


1. On the **Product Performance Grid** panel in Analysis Workspace, click the bug icon and then click **Freeform Table**. 

 ![tips_debug_link](/images/tips_bug.png?raw=true)

*Note: When the **Debugger** is enabled, a bug icon appears in the visualization header. To disable the **Debugger**, click **Disable Debugger** from the **Help** menu.*

1. Click one of the numbered requests from the list that appears below the **Freeform Table** option. 
.
  ![tips_call list](/images/tips_listcalls.png?raw=true)

1. In the Analysis Workspace debugger, scroll down to the **JSON REQUEST** box and copy the text, either manually, or by clicking the **Copy to Clipboard** button.

  ![tips_copy_json](/images/tips_copy_json.png?raw=true)

1. Log into the Analytics 2.0 Swagger interface, expand the **`/reports/ranked`** endpoint, and then click the **Try it out** button.

1. Paste the json into the request **body** box and click **Execute**.

1. Scroll down to the **Response body** and verify that the response results match those in the Analysis Workspace debugger. If so, you have successfully used the Analytics 2.0 `/reports` API and the Swagger interface.

  ![tips_response_body](/images/tips_response_body.png?raw=true)

*Note: Before closing Analysis Workspace, you can turn off the debugger by opening your browser developer tools and pasting the following text into the console field: `adobe.tools.debug.includeOberonXml = false`. Press Enter and then refresh the page. The debug icons disappear once the debugger is off.*
