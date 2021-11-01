import React from "react";
import {
    Dimensions,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { DefaultCaret, DefaultClear } from "./Default";

interface Props {
    text?: string
    placeholder?: string
    onclick?: () => void
    onXClick?: () => void
    isDropdownVisible?: boolean
    isDisabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    caretIcon?: () => JSX.Element
    clearIcon?: () => JSX.Element
}

const WindowHeight: number = Dimensions.get("window").height;
const WindowWidth: number = Dimensions.get("window").width;
const defaultPlaceholder: string = 'Select...';
const defaultDisabledColor: string = '#a0a0a0';

const getDimmedStyle = (isPlaceholder: boolean, isDisabled?: boolean) => {
    if (isDisabled || isPlaceholder) return { color: defaultDisabledColor };
    return undefined;
}

const TextView = (props: Props) => {
    const placeholder = props.placeholder ?? defaultPlaceholder;
    const text = props.text ?? placeholder;
    const CaretIcon = props.caretIcon ? props.caretIcon : () => <DefaultCaret />;
    const ClearIcon = props.clearIcon ? props.clearIcon : () => <DefaultClear />;

    return (
        <TouchableOpacity
            style={[props.containerStyle ?? styles.defaultContainer, styles.mainContainer]}
            onPress={props.onclick}
            activeOpacity={0.8}
        >
            <Text style={[ props.textStyle, getDimmedStyle(text === placeholder, props.isDisabled) ]}>
                {text}
            </Text>
            { props.isDropdownVisible ?
                <TouchableOpacity onPress={props.onXClick}>
                    <ClearIcon />
                </TouchableOpacity>
            :
                <CaretIcon />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    defaultContainer: {
        height: WindowHeight * 0.075,
        paddingHorizontal: WindowWidth * 0.04,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});

export default TextView;
