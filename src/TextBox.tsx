import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { SelectConfig } from "..";
import { getConfigContainerStyle, getConfigTextStyle, WindowHeight, WindowWidth } from "./common";
import { DefaultCaret, DefaultClear } from "./DefaultComponents";

interface Props {
    text?: string
    placeholder?: string
    onclick?: () => void
    onXClick?: () => void
    isDropdownVisible?: boolean
    isDisabled?: boolean
    config?: SelectConfig
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    caretIcon?: () => JSX.Element
    clearIcon?: () => JSX.Element
}

const defaultPlaceholder: string = 'Select...';
const defaultDisabledColor: string = '#a0a0a0';

const getDimmedStyle = (isPlaceholder: boolean, isDisabled?: boolean, placeholderColor?: string, disbledColor?: string): StyleProp<TextStyle> => {
    if (isDisabled) return { color: disbledColor ?? defaultDisabledColor };
    if (isPlaceholder) return { color: placeholderColor ?? defaultDisabledColor };
    return undefined;
}

const TextBox = (props: Props) => {
    const { config } = props;
    const placeholder = props.placeholder ?? defaultPlaceholder;
    const text = props.text ?? placeholder;

    const CaretIcon = props.caretIcon ? props.caretIcon : () => <DefaultCaret color={props.config?.textColor} />;
    const ClearIcon = props.clearIcon ? props.clearIcon : () => <DefaultClear color={props.config?.textColor} />;

    const configContainerStyle: StyleProp<ViewStyle> = getConfigContainerStyle(config);
    const configTextStyle: StyleProp<TextStyle> = getConfigTextStyle(config);
    const dimmedTextStyle: StyleProp<TextStyle> = getDimmedStyle(text === placeholder, props.isDisabled, config?.placeholderTextColor, config?.disabledTextColor);

    const containerStyles: StyleProp<ViewStyle> = [
        styles.defaultContainer,
        configContainerStyle,
        props.containerStyle,
        styles.mainContainer,
    ];
    const textStyles: StyleProp<TextStyle> = [
        configTextStyle,
        props.textStyle,
        dimmedTextStyle,
    ];

    return (
        <TouchableOpacity
            style={containerStyles}
            onPress={props.onclick}
            activeOpacity={0.8}
        >
            <Text style={textStyles}>
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

export default TextBox;
