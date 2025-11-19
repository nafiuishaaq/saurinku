import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';




export default function LoginScreen() {
    const navigation = useNavigation();
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Pressable onPress={() => {
            navigation.navigate("Home");
        }}><Text>Login Screen</Text></Pressable>
    </View>
  )
}
