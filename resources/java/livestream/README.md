# Adobe Analytics Livestream Reference Consumer
Reference client to consume Adobe Analytics Livestream data



Building
Requirements:
* Java 11
* Maven

Update Code:
* Add in your stream id in the designated spot in the code.
* Put in your generated access token in the designated spot in the code.

Build a Runnable Jar

```$ mvn package```

Running the Application

```$ java target/adobe-livestream-consumer-1.0-SNAPSHOT.jar```

Information
* Highly recommended to have separate threads a) reading from Livestream and b) performing work on the data.
* Schema is found here: https://livestream.adobe.net/api/1/schema

