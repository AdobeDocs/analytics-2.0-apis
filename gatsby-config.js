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
      }
      /*
      {
        title: 'v1.4',
        path: '/analytics-apis/docs/1.4/'
      }*/
    ],
    pages: [
      {
        title: 'Overview',
        path: 'index.md'
      },
      {
        title: 'Guides',
        path: 'guides'
      },
      {
        title: 'API Reference',
        path: 'api.html'
      },
      {
        title: 'Support',
        path: 'support.md'
      }
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: 'guides/index.md',
        pages: [
          {
            title: 'JWT',
            path: 'guides/jwt.md'
          },
          {
            title: 'Migrating from 1.4',
            path: 'guides/migration.md'
          },
          {
            title: 'FAQ',
            path: 'guides/faq.md'
          }
        ]
      },
      {
        title: 'Endpoint guides',
        path: 'guides/endpoints/index.md',
        pages: [
          {
            title: 'Annotations',
            path: 'guides/endpoints/annotations/index.md',
            pages: [
              {
                title: 'Definition data structure',
                path: 'guides/endpoints/annotations/definition.md'
              },
              {
                title: 'Parameters',
                path: 'guides/endpoints/annotations/parameters.md'
              }
            ]
          },
          {
            title: 'Bulk data insertion',
            path: 'guides/endpoints/bulk-data-insertion/index.md',
            pages: [
              {
                title: 'File format',
                path: 'guides/endpoints/bulk-data-insertion/file-format.md'
              },
              {
                title: 'Endpoints',
                path: 'guides/endpoints/bulk-data-insertion/endpoints.md'
              },
              {
                title: 'Visitor groups',
                path: 'guides/endpoints/bulk-data-insertion/visitor-groups.md'
              },
              {
                title: 'Use customer ID to identify visitors',
                path: 'guides/endpoints/bulk-data-insertion/mcseed.md'
              },
              {
                title: 'Troubleshooting',
                path: 'guides/endpoints/bulk-data-insertion/troubleshooting.md'
              },
              {
                title: 'FAQ',
                path: 'guides/endpoints/bulk-data-insertion/faq.md'
              }
            ]
          },
          {
            title: 'Calculated metrics',
            path: 'guides/endpoints/calculatedmetrics/index.md',
            pages: [
              {
                title: 'Functions',
                path: 'guides/endpoints/calculatedmetrics/functions.md'
              },
              {
                title: 'Validate',
                path: 'guides/endpoints/calculatedmetrics/validate.md'
              },
              {
                title: 'FAQ',
                path: 'guides/endpoints/calculatedmetrics/faq.md'
              }
            ]
          },
          {
            title: 'Component Meta Data',
            path:'guides/endpoints/componentmetadata/index.md',
            pages: [
              {
                title: 'Tags',
                path: 'guides/endpoints/componentmetadata/tags.md'
              },
              {
                title: 'Shares',
                path: 'guides/endpoints/componentmetadata/shares.md'
              }
            ]
          },
          {
            title: 'Data repair',
            path: 'guides/endpoints/data-repair/index.md',
            pages: [
              {
                title: 'Server call estimate',
                path: 'guides/endpoints/data-repair/server-call-estimate.md'
              },
              {
                title: 'Job definition reference',
                path: 'guides/endpoints/data-repair/json-body.md'
              },
              {
                title: 'Job endpoints',
                path: 'guides/endpoints/data-repair/job.md'
              },
              {
                title: 'FAQ',
                path: 'guides/endpoints/data-repair/faq.md'
              }
            ]
          },
          {
            title: 'Date ranges',
            path: 'guides/endpoints/date-ranges/index.md',
            pages: [
              {
                title: 'Parameters',
                path: 'guides/endpoints/date-ranges/parameters.md',
              },
              {
                title: 'FAQ',
                path: 'guides/endpoints/date-ranges/faq.md'
              }
            ]
          },
          {
            title: 'Discovery',
            path: 'guides/endpoints/discovery.md'
          },
          {
            title: 'Projects',
            path: 'guides/endpoints/projects/index.md',
            pages: [
              {
                title: 'Definition data structure',
                path: 'guides/endpoints/projects/definition.md',
              },
              {
                title: 'Parameters',
                path: 'guides/endpoints/projects/parameters.md'
              },
              {
                title: 'FAQ',
                path: 'guides/endpoints/projects/faq.md'
              }
            ]
          },
          {
            title: 'Reports',
            path: 'guides/endpoints/reports/index.md',
            pages: [
              {
                title: 'Breakdowns',
                path: 'guides/endpoints/reports/breakdowns.md'
              },
              {
                title: 'Debugger',
                path: 'guides/endpoints/reports/debugger.md'
              },
              {
                title: 'Examples',
                path: 'guides/endpoints/reports/examples.md'
              },
              {
                title: 'Search filters',
                path: 'guides/endpoints/reports/search-filters.md'
              },
              {
                title: 'Segments',
                path: 'guides/endpoints/reports/segments.md'
              }
            ]
          },
          {
            title: 'Report suites',
            path: 'guides/endpoints/report-suites.md'
          },
          {
            title: 'Segments',
            path: 'guides/endpoints/segments/index.md',
            pages: [
              {
                title: 'Definitions',
                path: 'guides/endpoints/segments/definition.md'
              },
              {
                title: 'Validate',
                path: 'guides/endpoints/segments/validate.md'
              },
              {
                title: 'Examples',
                path: 'guides/endpoints/segments/examples.md'
              },
              {
                title: 'FAQ',
                path: 'guides/endpoints/segments/faq.md'
              }
            ]
          },
          {
            title: 'Usage',
            path: 'guides/endpoints/usage.md'
          },
          {
            title: 'Virtual report suites',
            path: 'guides/endpoints/vrs/index.md',
            pages: [
              {
                title: 'JSON body reference',
                path: 'guides/endpoints/vrs/reference.md'
              },
              {
                title: 'Examples',
                path: 'guides/endpoints/vrs/examples.md'
              }
            ]
          }
        ]
      },
      {
        title: 'Use cases',
        path: 'guides/use-cases/index.md',
        pages: [
          {
            title: 'cURL',
            path: 'guides/use-cases/curl.md'
          },
          {
            title: 'Java',
            path: 'guides/use-cases/java.md'
          },
          {
            title: 'Postman',
            path: 'guides/use-cases/postman.md'
          },
          {
            title: 'Python',
            path: 'guides/use-cases/python.md'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/analytics-apis/docs/2.0/'
};
