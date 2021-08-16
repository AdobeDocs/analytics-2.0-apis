/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    home: {
      title: 'Adobe Analytics',
      path: '/analytics-apis/'
    },
    versions: [
      {
        title: 'v2.0',
        selected: true
      },
      {
        title: 'v1.4',
        path: '/analytics-apis/docs/1.4/'
      }
    ],
    pages: [
      {
        title: 'Overview',
        path: '/'
      },
      {
        title: 'Guides',
        path: 'guides'
      },
      {
        title: 'API Reference',
        path: 'api'
      },
      {
        title: 'Support',
        path: 'support.md'
      }
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: 'guides/getting-started',
        pages: [
          {
            title: 'Creating an OAuth Client',
            path: 'guides/getting-started/index.md'
          },
          {
            title: 'OAuth using cURL',
            path: 'guides/getting-started/oauth-curl.md'
          },
          {
            title: 'OAuth using POSTMAN',
            path: 'guides/getting-started/oauth-postman.md'
          },
          {
            title: 'JWT Authentication',
            path: 'guides/getting-started/jwt.md'
          }
        ]
      },
      {
        title: 'Reporting API Guide',
        path: 'guides/reporting-api/index.md',
        pages: [
          {
            title: 'Reporting with Multiple Breakdowns',
            path: 'guides/reporting-api/reporting-multiple-breakdowns.md'
          },
          {
            title: 'Reporting Tips and Tricks',
            path: 'guides/reporting-api/reporting-tricks.md'
          }
        ]
      },
      {
        title: 'Migrating Guide',
        path: 'guides/migration-guide.md'
      },
      {
        title: 'Calculated Metrics API',
        path: 'guides/calculatedmetrics.md'
      },
      {
        title: 'Component Meta Data APIs',
        path: 'guides/component-meta-data-apis',
        pages: [
          {
            title: 'Tags',
            path: 'guides/component-meta-data-apis/index.md'
          }
        ]
      },
      {
        title: 'Segments APIs',
        path: 'guides/segments-apis',
        pages: [
          {
            title: 'Segment Definition Data Structure',
            path: 'guides/segments-apis/segments.md'
          }
        ]
      },
      {
        title: 'Usage Logs API',
        path: 'guides/usage-logs-api',
        pages: [
          {
            title: 'Usage & Access Logs',
            path: 'guides/usage-logs-api/index.md'
          }
        ]
      },
      {
        title: 'Discovery',
        path: 'guides/discovery.md'
      },
      {
        title: 'Report Suite API',
        path: 'guides/report-suite-api/index.md',
        pages: [
          {
            title: 'Virtual Report Suites API',
            path: 'guides/report-suite-api/vrs.md'
          }
        ]
      },
      {
        title: 'Bulk Data Insertion API',
        path: 'guides/bdia.md'
      },
      {
        title: 'Data Repair API',
        path: 'guides/data-repair.md'
      },
      {
        title: 'FAQ',
        path: 'guides/faq.md'
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/analytics-apis/docs/2.0/'
};
