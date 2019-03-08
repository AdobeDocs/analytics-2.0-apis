# Steps

1. create the certificate and private key using openssl

```$ openssl req -nodes -text -x509 -newkey rsa:2048 -keyout secret.pem -out certificate.pem -days 356```

2. Upload the certificate.pem in Adobe IO Console-> Your Integration-> Public keys

3. convert private key to DER format

```$ openssl pkcs8 -topk8 -inform PEM -outform DER -in secret.pem  -nocrypt > secret.key```

4. Edit the config.properties in src/main/resources/ and add the values from your Adobe I/O Console integration.
5. Build
``` $ mvn clean package```
6. Run
``` $ java -jar target/IMS-Client-1.0-SNAPSHOT-jar-with-dependencies.jar```


