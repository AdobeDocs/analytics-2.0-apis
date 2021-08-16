---
title: Use the Analytics 2.0 APIs with Java
description: Send API calls to Adobe using Java.
---

# Use the Analytics 2.0 APIs with Java

1. Create the certificate and private key using openssl

   ```
   $ openssl req -nodes -text -x509 -newkey rsa:2048 -keyout secret.pem -out certificate.pem -days 356
   ```

1. Upload the certificate.pem in Adobe IO Console > Your Integration > Public keys

1. convert private key to DER format

   ```
   $ openssl pkcs8 -topk8 -inform PEM -outform DER -in secret.pem  -nocrypt > secret.key
   ```

1. Edit the config.properties in src/main/resources/ and add the values from your Adobe I/O Console integration.

1. Build

   ```
   $ mvn clean package
   ```

1. Run

   ```
   $ java -jar target/IMS-Client-1.0-SNAPSHOT-jar-with-dependencies.jar
   ```

See [Java client resources](https://github.com/AdobeDocs/analytics-apis/tree/main/src/resources/java/) on GitHub for example code and additional resources.
