<!DOCTYPE html>
<html>
  <head>
    <title>Project 1</title>
    <meta name="viewport" content="initial-scale=1.0" />
    <meta charset="utf-8" />
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 50%;
        width: 50%;
      }
      /* Optional: Makes the sample page fill the window. */
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 35.787743, lng:-78.644257  },
          zoom: 8
        });
      }
      
    
    
    </script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOglqBgJ3GCG7RLFvPz2Nz9T5xekXIoOk
      &callback=initMap"
      async
      defer></script>

      

      
    </script>
  
</body>
</html>

