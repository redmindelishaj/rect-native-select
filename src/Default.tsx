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
interface NoDataProps {
    text?: string
    textStyle?: StyleProp<TextStyle>
}
interface IconProps {
    color?: string
}

const WindowHeight = Dimensions.get("window").height;

export const DefaultItem = ({ text, style }: ItemProps) => (
    <Text style={style}>
        {text}
    </Text>
);

export const DefaultNoDataComponent = ({ text, textStyle }: NoDataProps) => (
    <View style={styles.noDataContainer}>
        <Text style={textStyle}>
            { text ?? 'No data' }
        </Text>
    </View>
);

export const DefaultClear = ({ color }: IconProps) => (
    <Image
        style={[ styles.iconStyle, { tintColor: color } ]}
        source={require('../assets/clear.png')}
        resizeMode='contain'
    />
);

export const DefaultCaret = ({ color }: IconProps) => (
    <Image
        style={[ styles.iconStyle, { tintColor: color } ]}
        source={require('../assets/caret-down.png')}
        resizeMode='contain'
    />
);

const styles = StyleSheet.create({
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
