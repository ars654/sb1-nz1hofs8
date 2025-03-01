import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Layers, Download, MapPin } from 'lucide-react-native';

export default function MapScreen() {
  const [mapType, setMapType] = useState('osm'); // 'osm', 'ign', 'satellite'
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  
  // Generate WebView HTML with the appropriate map
  const getMapHTML = () => {
    // This is a simplified example using Leaflet with different map providers
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { position: absolute; top: 0; bottom: 0; width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([46.227638, 2.213749], 6); // Center on France
          
          // Base layers
          const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          });
          
          const ignLayer = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
            attribution: '© IGN',
            apikey: 'decouverte'
          });
          
          const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri'
          });
          
          // Set the active layer based on the selected map type
          if ('${mapType}' === 'osm') {
            osmLayer.addTo(map);
          } else if ('${mapType}' === 'ign') {
            ignLayer.addTo(map);
          } else if ('${mapType}' === 'satellite') {
            satelliteLayer.addTo(map);
          }
          
          // Add some sample hiking trails (simplified)
          const trails = [
            { name: "Mont Blanc Circuit", coords: [[45.9, 6.9], [45.92, 6.95], [45.95, 7.0]] },
            { name: "GR20", coords: [[42.3, 9.1], [42.35, 9.15], [42.4, 9.2]] }
          ];
          
          trails.forEach(trail => {
            const polyline = L.polyline(trail.coords, {color: 'red', weight: 3}).addTo(map);
            polyline.bindPopup(trail.name);
          });
          
          // Add some POIs
          const pois = [
            { name: "Alpine Flower Spot", lat: 45.93, lng: 6.92, type: "flora" },
            { name: "Mountain Ibex Sighting", lat: 42.37, lng: 9.17, type: "fauna" },
            { name: "Historic Chapel", lat: 46.1, lng: 7.1, type: "heritage" }
          ];
          
          pois.forEach(poi => {
            let iconColor = 'blue';
            if (poi.type === 'flora') iconColor = 'green';
            if (poi.type === 'fauna') iconColor = 'orange';
            if (poi.type === 'heritage') iconColor = 'purple';
            
            const marker = L.circleMarker([poi.lat, poi.lng], {
              radius: 8,
              fillColor: iconColor,
              color: '#fff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            }).addTo(map);
            
            marker.bindPopup(poi.name);
          });
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: getMapHTML() }}
        style={styles.map}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
      
      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setShowDownloadOptions(!showDownloadOptions)}
        >
          <Download size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <MapPin size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => {
            const types = ['osm', 'ign', 'satellite'];
            const currentIndex = types.indexOf(mapType);
            const nextIndex = (currentIndex + 1) % types.length;
            setMapType(types[nextIndex]);
          }}
        >
          <Layers size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Map Type Indicator */}
      <View style={styles.mapTypeIndicator}>
        <Text style={styles.mapTypeText}>
          {mapType === 'osm' ? 'OpenStreetMap' : 
           mapType === 'ign' ? 'IGN' : 'Satellite'}
        </Text>
      </View>
      
      {/* Download Options Panel */}
      {showDownloadOptions && (
        <View style={styles.downloadPanel}>
          <Text style={styles.downloadTitle}>Download Map Area</Text>
          <Text style={styles.downloadDescription}>
            Download this area for offline use (approximately 45 MB)
          </Text>
          
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={16} color="#fff" />
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>
          
          <Text style={styles.downloadNote}>
            Downloaded maps will be available offline for 30 days
          </Text>
        </View>
      )}
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Map Legend</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>Hiking Trails</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'green' }]} />
          <Text style={styles.legendText}>Flora</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'orange' }]} />
          <Text style={styles.legendText}>Fauna</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'purple' }]} />
          <Text style={styles.legendText}>Heritage</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 100,
    backgroundColor: 'transparent',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3E8E7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  mapTypeIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mapTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  downloadPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  downloadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  downloadDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'Montserrat-Regular',
  },
  downloadButton: {
    backgroundColor: '#3E8E7E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  downloadNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  legend: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
});