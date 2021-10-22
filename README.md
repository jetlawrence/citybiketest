# City Bike Test


### How to run
1. Go to `citibike-server`
2. Run `npm -i`
3. Run `node server.js`
4. Go to `citibike-client`
5. Run `npm -i`
6. Run `npm start`

### How to use
1. After you run the app, the map will be initially displayed in its loading state. Wait for the city bike Miami network data to be fetched.
2. Once fetched, the header will update to display the number of free bikes and empty slots as of last update time by City Bike.
3. Markers will be displayed across the map where each marker represents a bike station.
4. Each marker displays the count of free bikes for that station and color depending on this count (>=5: green, <5 but >0: orange, 0: red).
5. Click on the marker to display a popup showing the name of the station and free bikes and empty slots count for that station.
6. The app will fetch data in real time. It will get from the response the timestamp of the station with the latest timestamp update.
7. On the next fetch, if the latest timestamp from the new response is not the same with the last timestamp retrieved, that means there's an update. A snapshot of stations data will be saved on a history array.
8. Also, when there's an update on a station, the marker will animate indicating the update on that station.
9. Given an array of these snapshots, you can click play/pause, backward & forward buttons in the control panel at the top right. 
10. If you click backward/forward or pause, the view displayed will stop updating but will still fetch data in the background. 
11. On backward click, it will display the view from a previous snapshot and on forward click it will display the view from the next snapshot. 
12. To make the view continue to update display based on fetched data in real time, click play.

### Notes
- In `CityBikeContext.tsx`, you can use this instead of the currently declared stations const to display random mock counts instead of the actual counts retrieved from the API:
```
      // Use this for showing demo of changing bike count
      // const stations = (data?.stations ?? []).map((station, i) => ({
      //   ...station,
      //   free_bikes:
      //     i % 2 === 0 ? Math.floor(Math.random() * 11) : station.free_bikes,
      //   timestamp: new Date(),
      // }));
```

![ezgif com-gif-maker](https://user-images.githubusercontent.com/18611852/138398952-c7b4c8de-00b1-4042-aaea-93409d93cfdb.gif)





