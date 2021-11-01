import React from "react";
import {
    Dimensions,
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View
} from "react-native";

interface ItemProps {
    text: string
    style?: StyleProp<TextStyle>
}

const WindowHeight = Dimensions.get("window").height;

export const DefaultItem = ({ text, style }: ItemProps) => (
    <Text style={[ styles.itemText, style ]}>
        {text}
    </Text>
);

export const DefaultNoDataComponent = () => (
    <View style={styles.noDataContainer}>
        <Text style={styles.itemText}>
            No data
        </Text>
    </View>
);

export const DefaultClear = () => (
    <Image
        style={styles.iconStyle}
        source={require('../assets/clear.png')}
        resizeMode='contain'
    />
);

export const DefaultCaret = () => (
    <Image
        style={styles.iconStyle}
        source={require('../assets/caret-down.png')}
        resizeMode='contain'
    />
);

const styles = StyleSheet.create({
    itemText: {
        paddingLeft: WindowHeight * 0.01,
    },
    noDataContainer: {
        height: WindowHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        height: WindowHeight * 0.0175,
        width: WindowHeight * 0.0175,
    },
});
