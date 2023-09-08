import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Button, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation(); // Get navigation instance
  return (
    <Tabs
      screenOptions={{
       tabBarActiveTintColor: 'rgba(57, 118, 132)',
       tabBarInactiveTintColor: 'rgba(57, 118, 132, 0.5)', 
       tabBarStyle: { backgroundColor: 'white' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false, // Hide the header for this screen
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Transactions',
          headerStyle: {
            backgroundColor: 'white', // Change the top bar background color
            height: 80,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 20, // Change the font size
            color: 'black', // Change the text color
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}  style={{ marginLeft: 10, marginTop: 7}} >
              <FontAwesome name="chevron-left" size={20} color="rgb(57, 118, 132)" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ width:50,flexDirection: 'row', marginRight: 15, marginTop: 7, justifyContent:"space-between" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="search" size={20} color="rgb(102, 102, 102)" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="sliders" size={20} color="rgb(102, 102, 102)" />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
