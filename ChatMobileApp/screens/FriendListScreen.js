import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const FriendListScreen = ({ navigation }) => {
    const usersOnline = useSelector(state => state.usersOnline);
    console.log("usersOnline", usersOnline);

    const { itemContainerStyle, avatarImgStyle, userNameViewStyle } = styles;

    return (
        <View style={{ flex: 1 }}>
            <FlatList 
                data={usersOnline}
                renderItem={({item}) =>{
                    console.log("item", item);
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("Chat", { name: item.userName })}>
                    <View style={itemContainerStyle}>
                        <Image 
                        style={avatarImgStyle}
                        source={{ uri: item.avatar }}
                        />
                        <View style={userNameViewStyle}>
                        <Text style={{ fontSize: 20 }}>{item.userName}</Text>
                        </View>
                    </View> 
                    </TouchableOpacity>
                )
                }}
                keyExtractor={item => item.userId}
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    itemContainerStyle: { flex: 1, flexDirection: 'row' },
    avatarImgStyle: { height: 100, width: 100, borderRadius: 50 },
    userNameViewStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default FriendListScreen;