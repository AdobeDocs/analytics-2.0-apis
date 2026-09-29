---
title: Debugger for Analysis Workspace
description: Use the Analysis Workspace debugger to view API requests in XML or JSON format.
---

# Debugger for Analysis Workspace

Analysis Workspace makes calls to the reporting API endpoint to retrieve data. Adobe offers an in-product debugger that lets you see the API calls while in any Workspace project. You can use this debugger to help structure your request bodies when using the reporting endpoint.

## Enable the debugger

Before using the debugger, you must enable it.

1. Log in to [analytics.adobe.com](https://analytics.adobe.com).
2. Create a new project, or open an existing project.
3. Save the project if any changes were made.
4. Navigate to **Help** > **Enable debugger**.
5. Click **OK** in the popup modal.

## Using the debugger

After the debugger is enabled, navigate to the visualization that you want to replicate in your API request.

1. Click the [Bug] icon on the right side of the visualization.
2. Select the visualization type from the dropdown.
3. Select the timestamp of the request to view. The most recent timestamp is typically the most applicable.
4. Scroll down to the **JSON** section.
5. Hover over the JSON section and click the **Copy to clipboard** button to copy the request body.
