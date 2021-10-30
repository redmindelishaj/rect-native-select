import React from "react";
import {
    Dimensions,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View
} from "react-native";

const WindowHeight = Dimensions.get("window").height;
interface ItemProps {
    text: string
    style?: StyleProp<TextStyle>
}

export const Item = ({ text, style }: ItemProps) => (
    <Text style={[ styles.itemText, style ]}>
        {text}
    </Text>
);

export const EmptyItem = () => (
    <View style={styles.noDataContainer}>
        <Text style={styles.itemText}>
            No data
        </Text>
    </View>
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
});
