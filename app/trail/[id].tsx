import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Clock, ArrowUpRight, Calendar, Download, Share2, Star, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock data for trails
const TRAILS = [
  {
    id: '1',
    name: 'Mont Blanc Circuit',
    location: 'Chamonix, France',
    distance: '170 km',
    duration: '11 days',
    difficulty: 'Difficult',
    rating: 4.8,
    elevation: '10,000 m',
    description: 'The Tour du Mont Blanc is one of the most popular long-distance walks in Europe. It circles the Mont Blanc massif, covering a distance of roughly 170 km with 10,000 meters of ascent/descent and passes through parts of Switzerland, Italy and France.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    bestSeason: 'June to September',
    pointsOfInterest: [
      { name: 'Lac Blanc', type: 'viewpoint', description: 'Beautiful alpine lake with Mont Blanc views' },
      { name: 'Grand Col Ferret', type: 'mountain pass', description: 'Border crossing between Italy and Switzerland' },
      { name: 'Courmayeur', type: 'town', description: 'Italian mountain resort town' },
    ],
  },
  {
    id: '2',
    name: 'GR20',
    location: 'Corsica, France',
    distance: '180 km',
    duration: '15 days',
    difficulty: 'Very Difficult',
    rating: 4.9,
    elevation: '12,000 m',
    description: 'The GR20 is a challenging mountain trek in Corsica, known as one of the toughest long-distance trails in Europe. The route runs roughly north-south along the jagged spine of Corsica\'s mountainous center, following a ridge of mountains that divide the island into east and west.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    bestSeason: 'June to September',
    pointsOfInterest: [
      { name: 'Cirque de la Solitude', type: 'geological', description: 'Dramatic mountain cirque with steep passages' },
      { name: 'Lac de Nino', type: 'lake', description: 'Beautiful mountain lake surrounded by pozzines (peat bogs)' },
      { name: 'Monte Cinto', type: 'peak', description: 'Highest mountain in Corsica (2,706m)' },
    ],
  },
  {
    id: '3',
    name: 'Tour du Mont Blanc',
    location: 'Alps (France, Italy, Switzerland)',
    distance: '170 km',
    duration: '11 days',
    difficulty: 'Moderate',
    rating: 4.7,
    elevation: '10,000 m',
    description: 'The Tour du Mont Blanc is one of the most popular long-distance walks in Europe. It circles the Mont Blanc massif, covering a distance of roughly 170 km with 10,000 meters of ascent/descent and passes through parts of Switzerland, Italy and France.',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
    bestSeason: 'June to September',
    pointsOfInterest: [
      { name: 'Lac Blanc', type: 'viewpoint', description: 'Beautiful alpine lake with Mont Blanc views' },
      { name: 'Grand Col Ferret', type: 'mountain pass', description: 'Border crossing between Italy and Switzerland' },
      { name: 'Courmayeur', type: 'town', description: 'Italian mountain resort town' },
    ],
  },
  {
    id: '4',
    name: 'Sentier des Douaniers',
    location: 'Brittany, France',
    distance: '1800 km',
    duration: '90 days',
    difficulty: 'Easy to Moderate',
    rating: 4.6,
    elevation: '5,000 m',
    description: 'The Sentier des Douaniers, also known as the GR34 or Customs Officers\' Path, follows the entire coastline of Brittany. Originally created for customs officers to patrol the coast, it now offers hikers spectacular views of the rugged coastline, sandy beaches, and picturesque fishing villages.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    bestSeason: 'April to October',
    pointsOfInterest: [
      { name: 'Cap Fréhel', type: 'viewpoint', description: 'Dramatic headland with lighthouse and bird colonies' },
      { name: 'Pointe du Raz', type: 'viewpoint', description: 'Westernmost point of mainland France' },
      { name: 'Saint-Malo', type: 'town', description: 'Historic walled port city' },
    ],
  },
];

export default function TrailDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Find the trail by id
  const trail = TRAILS.find(t => t.id === id) || TRAILS[0];
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: trail.image }} style={styles.image} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{trail.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#666" />
            <Text style={styles.locationText}>{trail.location}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={18} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{trail.rating}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ArrowUpRight size={20} color="#3E8E7E" />
            <Text style={styles.statValue}>{trail.elevation}</Text>
            <Text style={styles.statLabel}>Elevation</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <MapPin size={20} color="#3E8E7E" />
            <Text style={styles.statValue}>{trail.distance}</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Clock size={20} color="#3E8E7E" />
            <Text style={styles.statValue}>{trail.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
        </View>
        
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyLabel}>Difficulty:</Text>
          <View style={[
            styles.difficultyBadge,
            trail.difficulty === 'Easy' ? styles.easyBadge :
            trail.difficulty === 'Moderate' ? styles.moderateBadge :
            trail.difficulty === 'Difficult' ? styles.difficultBadge :
            styles.veryDifficultBadge
          ]}>
            <Text style={styles.difficultyText}>{trail.difficulty}</Text>
          </View>
          
          <View style={styles.seasonContainer}>
            <Calendar size={16} color="#666" />
            <Text style={styles.seasonText}>Best season: {trail.bestSeason}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{trail.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points of Interest</Text>
          {trail.pointsOfInterest.map((poi, index) => (
            <View key={index} style={styles.poiItem}>
              <View style={[
                styles.poiDot,
                poi.type === 'viewpoint' ? { backgroundColor: '#4CAF50' } :
                poi.type === 'lake' ? { backgroundColor: '#2196F3' } :
                poi.type === 'peak' ? { backgroundColor: '#F44336' } :
                poi.type === 'town' ? { backgroundColor: '#9C27B0' } :
                poi.type === 'mountain pass' ? { backgroundColor: '#FF9800' } :
                { backgroundColor: '#607D8B' }
              ]} />
              <View style={styles.poiContent}>
                <Text style={styles.poiName}>{poi.name}</Text>
                <Text style={styles.poiType}>{poi.type}</Text>
                <Text style={styles.poiDescription}>{poi.description}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
            <Share2 size={20} color="#3E8E7E" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontFamily: 'Montserrat-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 6,
    fontFamily: 'Montserrat-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
    marginBottom: 2,
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ddd',
    height: '80%',
    alignSelf: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  difficultyLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
    fontFamily: 'Montserrat-Medium',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 12,
  },
  easyBadge: {
    backgroundColor: '#e6f7ed',
  },
  moderateBadge: {
    backgroundColor: '#fff4e6',
  },
  difficultBadge: {
    backgroundColor: '#ffe6e6',
  },
  veryDifficultBadge: {
    backgroundColor: '#f8e6ff',
  },
  difficultyText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  seasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  seasonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontFamily: 'Montserrat-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Montserrat-Bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    fontFamily: 'Montserrat-Regular',
  },
  poiItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  poiDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    marginRight: 12,
  },
  poiContent: {
    flex: 1,
  },
  poiName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'Montserrat-Bold',
  },
  poiType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontStyle: 'italic',
    fontFamily: 'Montserrat-Regular',
  },
  poiDescription: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'Montserrat-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3E8E7E',
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Montserrat-Bold',
  },
  shareButton: {
    backgroundColor: '#e6f7f2',
    marginRight: 0,
    marginLeft: 10,
  },
  shareButtonText: {
    color: '#3E8E7E',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Montserrat-Bold',
  },
});