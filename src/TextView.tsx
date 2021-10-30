import React from "react";
import {
    Dimensions,
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface Props {
    text?: string
    placeholder?: string
    onclick?: () => void
    isDropdownVisible?: boolean
    isDisabled?: boolean
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

const WindowHeight: number = Dimensions.get("window").height;
const WindowWidth: number = Dimensions.get("window").width;
const defaultPlaceholder: string = 'Select...';
const defaultDisabledColor: string = '#a0a0a0';

const TextView = (props: Props) => {
    let text = props.text ?? '';
    let dimmedTextColorStyle = undefined;
    if (text === '' || text === props.placeholder) {
        text = props.placeholder ?? defaultPlaceholder;
        dimmedTextColorStyle = { color: defaultDisabledColor };
    }
    if (props.isDisabled) {
        dimmedTextColorStyle = { color: defaultDisabledColor };
    }
    const style = props.style ?? styles.default;

    return (
        <TouchableOpacity
            style={[style, styles.main]}
            onPress={props.onclick}
            activeOpacity={0.8}
        >
            <Text style={[ props.textStyle, dimmedTextColorStyle ]}>
                {text}
            </Text>
            <Image
                style={styles.caretStyle}
                source={props.isDropdownVisible ? require('../assets/caret-up.png') : require('../assets/caret-down.png')}
                resizeMode='contain'
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    default: {
        height: WindowHeight * 0.075,
        paddingHorizontal: WindowWidth * 0.04,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    caretStyle: {
        height: WindowHeight * 0.0175,
    },
});

export default TextView;
