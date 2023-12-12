package com.adobe.analytics;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.zip.GZIPInputStream;

public class LivestreamConsumer implements Runnable
{
    private final BlockingQueue<String> dataQueue = new ArrayBlockingQueue<>(1000);

    public static void main( String[] args ) throws IOException, InterruptedException {
        LivestreamConsumer consumer = new LivestreamConsumer();
        consumer.readFromLivestream();
    }

    public void readFromLivestream() throws IOException, InterruptedException {

        String accessToken = "PUT ACCESS TOKEN HERE";
        String streamId = "PUT STREAM ID HERE";

        String streamUrl = "https://livestream.adobe.net/api/1/stream/" + streamId;

        HttpURLConnection connection = getConnection(streamUrl, accessToken);
        int responseCode = connection.getResponseCode();

        while(responseCode != HttpURLConnection.HTTP_OK) {

            if(responseCode == HttpURLConnection.HTTP_MOVED_TEMP || responseCode == HttpURLConnection.HTTP_MOVED_PERM)  {
                // Follow the redirect
                // Pass Authorization Header along
                String redirectLocation = connection.getHeaderField("location");
                System.out.println("Redirecting to: " + redirectLocation);
                connection.disconnect();

                connection = getConnection(redirectLocation, accessToken);
                responseCode = connection.getResponseCode();

            } else if (responseCode == HttpURLConnection.HTTP_CONFLICT) {
                connection.disconnect();
                throw new RuntimeException("Connection refused due to conflict. Check that the maxConnections query string value is identical across connections.");

            } else {
                connection.disconnect();
                throw new RuntimeException("Unexpected response code: " + responseCode);
            }
        }

        // Spin up a new thread to handle data processing
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.submit(this);

        // The stream is always compressed using GZIP
        InputStream inputStream = new GZIPInputStream(connection.getInputStream());
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

        String line = reader.readLine();
        while (line != null) {
            // In order to ensure we keep up with incoming Livestream data, delegate work to another thread
            // This could be replaced with writing to a data queue like Apache Kafka
            dataQueue.put(line);
            line = reader.readLine();
        }

        reader.close();
        connection.disconnect();
        executorService.shutdownNow();
    }

    private HttpURLConnection getConnection(final String streamUrl, final String accessToken) throws IOException {
        URL url = new URL(streamUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setReadTimeout((int) Duration.ofSeconds(60).toMillis());
        connection.setConnectTimeout((int) Duration.ofSeconds(10).toMillis());

        connection.setRequestProperty("Accept-Encoding", "gzip");
        connection.setRequestProperty("Authorization", "Bearer " + accessToken);

        // Many client libraries remove the Authorization header on a redirect
        // This application handles redirects manually to avoid that
        connection.setInstanceFollowRedirects(false);

        return connection;
    }

    @Override
    public void run() {
        try {
            while(true) {
                String data = dataQueue.take();
                // Do data processing here, in a separate thread
                System.out.println(data);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
