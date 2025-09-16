
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from '../Tabs/Settings';
import Profile from '../Tabs/Profile';
import { AuthProvider } from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

export default function TabsScreen({ route }: any) {
    const { email } = route.params;
    return (
            <Tab.Navigator>
                <Tab.Screen name="Settings" component={Settings} />
                <Tab.Screen name="Profile" component={() => <Profile email={email} name={''} />} />
            </Tab.Navigator>

    );
}