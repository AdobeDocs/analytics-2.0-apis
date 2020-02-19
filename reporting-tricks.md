# Analytics API Reporting Tips

This article provides an example of how to create API requests compatible with Analysis Workspace. Following this example, you can use Analysis Workspace to make additional requests after seeing how it works.

This example includes the **Try it out** feature in the Swagger interface. It also includes using the Analysis Workspace debugger tool, which allows you to view the different API requests it makes. This debugger is helpful in understanding report requests and in exploring Analytics 2.0 APIs.

## Example API request creation

To create an example API request compatible with Analysis Workspace:

1. Log into Analysis Workspace and create a [new project](https://docs.adobe.com/content/help/en/analytics/analyze/analysis-workspace/build-workspace-project/t-freeform-project.html) from the [**Products**](https://docs.adobe.com/content/help/en/analytics/analyze/analysis-workspace/build-workspace-project/starter-projects.html) template. 

1. Click **Enable Debugger** from the project **Help** menu. 

![tips_enable](https://user-images.githubusercontent.com/29133525/74784023-3b1a2d80-5264-11ea-9914-852631ef03c1.png)

3. Click **OK** on the **Enable Debugger** message that appears.

![tips_message](https://user-images.githubusercontent.com/29133525/74783796-ac0d1580-5263-11ea-9204-bdcb62d8e98c.png)

4. On the **Product Performance Grid** panel in Analysis Workspace, click the bug icon and then click **Freeform Table**. 

![freeform](https://user-images.githubusercontent.com/29133525/74784414-13779500-5265-11ea-882f-12e6a34be8ab.png)

*Note: When the **Debugger** is enabled, a bug icon appears in the visualization header. To disable the **Debugger**, click **Disable Debugger** from the **Help** menu.*

5. Click one of the numbered requests from the list that appears below the **Freeform Table** option.

![tips_listcalls](https://user-images.githubusercontent.com/29133525/74784090-66048180-5264-11ea-8cf0-889c13dad8d5.png)

6. In the Analysis Workspace debugger, scroll down to the **JSON REQUEST** box and copy the text, either manually, or by clicking the **Copy to Clipboard** button.

  ![tips_copy_json](/images/tips_copy_json.png?raw=true)

7. Log into the Analytics 2.0 Swagger interface, expand the **`/reports/ranked`** endpoint, and then click the **Try it out** button.

8. Paste the json into the request **body** box and click **Execute**.

9. Scroll down to the **Response body** and verify that the response results match those in the Analysis Workspace debugger. If so, you have successfully used the Analytics 2.0 `/reports` API and the Swagger interface.

  ![tips_response_body](/images/tips_response_body.png?raw=true)

*Note: Before closing Analysis Workspace, you can turn off the debugger by clicking Disable Debugger from the Help menu.*
