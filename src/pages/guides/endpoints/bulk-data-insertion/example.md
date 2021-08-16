---
title: Batch file examples
description: View a typical example of what a small batch file looks like.
---

# Batch file examples

The following examples show what an uncompressed file looks like.


## Batch file with query string

```text
timestamp,visitorid,reportsuiteid,querystring,useragent
1492191617,44444445,rsidfake,AQB=1&pageName=PIGINI&v2=Var21&v3=Var31&c1=val11
&c2=val21&c3=val31&bh=1000&bw=999&c=1024&j=3.41&k=1&p=1&s=1111&v=1&channel=TonyChannel
&pev1=https%3A%2F%2Fwww.adobe.com%2Fwho%3Fq%3Dwhoisit&state=UT&zip=84005&cc=USD
&events=prodView%2Cevent2&AQE=1,"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) 
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
1492191627,44444445,rsidfake,AQB=1&pageName=PIGINI&v2=Var22&v3=Var32&c1=val12
&c2=val22&c3=val32&bh=1000&bw=999&c=1024&j=3.41&k=1&p=1&s=1111&v=1&channel=TonyChannel
&pev1=https%3A%2F%2Fwww.adobe.com%2Fwho%3Fq%3Dwhoisit&state=UT&zip=84005&cc=USD
&events=prodView%2Cevent2&AQE=1,"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) 
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
```

## Column-based batch file with quotes in user agent

```text
pageName,timestamp,reportSuiteID,visitorID,userAgent,campaign,contextData.color,contextData.frame,pageURL,prop1,channel
中文网站,1495483797,bogus.smaple.rsid,238915514,"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1 ""Special
 Build""",Summer,Red,Titanium,http://example.com/path?param=val&param2=val2,p2,Mobile
中文网站,1495483797,bogus.smaple.rsid,142805255,"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1 ""Special
 Build""",Summer,Gray,Carbon,http://example.com/path?param=val&param2=val2,p2,Mobile
```
