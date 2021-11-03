import { Dimensions, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { SelectConfig } from "..";

export const WindowHeight: number = Dimensions.get("window").height;
export const WindowWidth: number = Dimensions.get("window").width;
const defaultBorderColor = '#606060';

export const getConfigContainerStyle = (config?: SelectConfig): StyleProp<ViewStyle> => {
    if (config == null) return undefined;
    const { backgroundColor, borderRadius, borderWidth, borderColor } = config;
    let configContainerStyle: StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        borderColor: borderColor ?? defaultBorderColor,
    }
    if (backgroundColor == null) delete configContainerStyle.backgroundColor;
    if (borderRadius == null) delete configContainerStyle.borderRadius;
    if (borderWidth == null) delete configContainerStyle.borderWidth;
    return [configContainerStyle];
}

export const getConfigTextStyle = (config?: SelectConfig): StyleProp<TextStyle> => {
    if (config == null) return undefined;
    return {
        fontSize: config?.fontSize,
        fontFamily: config?.fontFamily,
        fontWeight: config?.fontWeight,
        color: config?.textColor,
    };
}
