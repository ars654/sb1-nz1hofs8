import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Settings, LogOut, Download, Bell, Moon, CircleHelp as HelpCircle, Shield, Map } from 'lucide-react-native';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  
  // Mock user data
  const user = {
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    stats: {
      totalHikes: 24,
      totalDistance: '342 km',
      totalElevation: '12,450 m',
    },
    achievements: [
      { id: '1', name: 'Mountain Explorer', icon: '🏔️', date: 'Aug 2023' },
      { id: '2', name: 'Trail Master', icon: '🥾', date: 'Jul 2023' },
      { id: '3', name: 'Early Bird', icon: '🌄', date: 'Jun 2023' },
    ],
  };
  
  const settingsOptions = [
    {
      id: 'appearance',
      icon: <Moon size={22} color="#3E8E7E" />,
      title: 'Dark Mode',
      type: 'toggle',
      value: darkMode,
      onToggle: () => setDarkMode(!darkMode),
    },
    {
      id: 'notifications',
      icon: <Bell size={22} color="#3E8E7E" />,
      title: 'Notifications',
      type: 'toggle',
      value: notifications,
      onToggle: () => setNotifications(!notifications),
    },
    {
      id: 'offline',
      icon: <Download size={22} color="#3E8E7E" />,
      title: 'Offline Mode',
      type: 'toggle',
      value: offlineMode,
      onToggle: () => setOfflineMode(!offlineMode),
    },
    {
      id: 'maps',
      icon: <Map size={22} color="#3E8E7E" />,
      title: 'Map Settings',
      type: 'link',
    },
    {
      id: 'privacy',
      icon: <Shield size={22} color="#3E8E7E" />,
      title: 'Privacy & Security',
      type: 'link',
    },
    {
      id: 'help',
      icon: <HelpCircle size={22} color="#3E8E7E" />,
      title: 'Help & Support',
      type: 'link',
    },
  ];
  
  const renderSettingsItem = (item) => (
    <View key={item.id} style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        {item.icon}
        <Text style={styles.settingsItemTitle}>{item.title}</Text>
      </View>
      
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#d1d1d1', true: '#a7d4c9' }}
          thumbColor={item.value ? '#3E8E7E' : '#f4f3f4'}
        />
      ) : (
        <TouchableOpacity>
          <Text style={styles.settingsItemAction}>{'>'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Settings size={20} color="#3E8E7E" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.totalHikes}</Text>
          <Text style={styles.statLabel}>Hikes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.totalDistance}</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.totalElevation}</Text>
          <Text style={styles.statLabel}>Elevation</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          {user.achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          {settingsOptions.map(renderSettingsItem)}
        </View>
      </View>
      
      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color="#ff6b6b" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Montserrat-Bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    marginLeft: 8,
    color: '#3E8E7E',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    height: '80%',
    alignSelf: 'center',
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  achievementDate: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Montserrat-Regular',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemTitle: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  settingsItemAction: {
    fontSize: 18,
    color: '#ccc',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    marginLeft: 8,
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginBottom: 24,
    fontFamily: 'Montserrat-Regular',
  },
});