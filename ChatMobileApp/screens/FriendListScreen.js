import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const FriendListScreen = ({ navigation }) => {
    // extracts data from redux store state
    const usersOnline = useSelector(state => state.usersOnline);
    // declaring from stylesheet
    const { itemContainerStyle, avatarImgStyle, userNameViewStyle } = styles;

    return (
        <View style={{ flex: 1 }}>
            {/* list maker tool from react native */}
            <FlatList 
                data={usersOnline}
                // item being each item on the list
                renderItem={({item}) => {
                return (
                    <TouchableOpacity onPress={() => 
                        navigation.navigate("Chat", 
                        { name: item.userName, userId: item.userId })}>
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