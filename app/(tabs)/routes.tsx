import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { Plus, FileUp, Download, CreditCard as Edit2, Trash2, X } from 'lucide-react-native';

// Mock data for routes
const ROUTES = [
  {
    id: '1',
    name: 'Mont Blanc Circuit',
    distance: '170 km',
    duration: '11 days',
    lastModified: '2023-08-15',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    isDownloaded: true,
  },
  {
    id: '2',
    name: 'Weekend Hike - Fontainebleau',
    distance: '15 km',
    duration: '1 day',
    lastModified: '2023-09-02',
    thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    isDownloaded: false,
  },
  {
    id: '3',
    name: 'Pyrenees Traverse',
    distance: '120 km',
    duration: '8 days',
    lastModified: '2023-07-20',
    thumbnail: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
    isDownloaded: true,
  },
];

export default function RoutesScreen() {
  const [routes, setRoutes] = useState(ROUTES);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRouteName, setNewRouteName] = useState('');
  
  const handleCreateRoute = () => {
    if (newRouteName.trim()) {
      const newRoute = {
        id: Date.now().toString(),
        name: newRouteName,
        distance: '0 km',
        duration: 'Not set',
        lastModified: new Date().toISOString().split('T')[0],
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        isDownloaded: false,
      };
      
      setRoutes([newRoute, ...routes]);
      setNewRouteName('');
      setModalVisible(false);
    }
  };
  
  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter(route => route.id !== id));
  };
  
  const renderRouteItem = ({ item }) => (
    <TouchableOpacity style={styles.routeCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.routeImage} />
      <View style={styles.routeInfo}>
        <Text style={styles.routeName}>{item.name}</Text>
        <View style={styles.routeDetails}>
          <Text style={styles.detailText}>{item.distance}</Text>
          <Text style={styles.detailText}>•</Text>
          <Text style={styles.detailText}>{item.duration}</Text>
        </View>
        <Text style={styles.modifiedText}>Modified: {item.lastModified}</Text>
      </View>
      
      <View style={styles.routeActions}>
        {item.isDownloaded ? (
          <View style={styles.downloadedBadge}>
            <Download size={14} color="#3E8E7E" />
            <Text style={styles.downloadedText}>Offline</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.actionButton}>
            <Download size={18} color="#3E8E7E" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.actionButton}>
          <Edit2 size={18} color="#3E8E7E" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDeleteRoute(item.id)}
        >
          <Trash2 size={18} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Routes</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <FileUp size={20} color="#3E8E7E" />
            <Text style={styles.headerButtonText}>Import GPX</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.headerButton, styles.createButton]}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={routes}
        renderItem={renderRouteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.routesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No routes yet</Text>
            <Text style={styles.emptySubtext}>Create a new route or import a GPX file</Text>
          </View>
        }
      />
      
      {/* Create Route Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Route</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Route Name</Text>
            <TextInput
              style={styles.input}
              value={newRouteName}
              onChangeText={setNewRouteName}
              placeholder="Enter route name"
              placeholderTextColor="#999"
            />
            
            <TouchableOpacity 
              style={styles.createRouteButton}
              onPress={handleCreateRoute}
            >
              <Text style={styles.createRouteButtonText}>Create Route</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerButtonText: {
    marginLeft: 8,
    color: '#3E8E7E',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  createButton: {
    backgroundColor: '#3E8E7E',
    marginRight: 0,
  },
  createButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  routesList: {
    paddingBottom: 20,
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routeImage: {
    width: '100%',
    height: 120,
  },
  routeInfo: {
    padding: 12,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  routeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
    fontFamily: 'Montserrat-Regular',
  },
  modifiedText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Montserrat-Regular',
  },
  routeActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 12,
  },
  actionButton: {
    marginRight: 16,
  },
  downloadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7f2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  downloadedText: {
    fontSize: 12,
    color: '#3E8E7E',
    marginLeft: 4,
    fontFamily: 'Montserrat-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  closeButton: {
    padding: 4,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Medium',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  createRouteButton: {
    backgroundColor: '#3E8E7E',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createRouteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});