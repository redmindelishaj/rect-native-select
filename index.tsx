import React, { useState } from "react";
import {
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    Dimensions,
    LayoutChangeEvent,
    StyleSheet
} from "react-native";
import DropDown from "./src/DropDown";
import TextBox from "./src/TextBox";

export interface SelectItem {
    text: string
    value: any
}
export interface SelectConfig {
    backgroundColor?: string
    textColor?: string
    fontSize?: number
    fontFamily?: string
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    selectedBackgroundColor?: string
    selectedTextColor?: string
    selectedFontFamily?: string
    selectedFontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    placeholderTextColor?: string
    disabledTextColor?: string
    borderWidth?: number
    borderColor?: string
    borderRadius?: number
}
interface Props {
    data?: SelectItem[]
    value?: SelectItem
    onSelect?: (value?: any) => void
    onClick?: () => void
    isVisible?: boolean
    isDisabled?: boolean
    search?: boolean
    placeholder?: string
    searchPlaceholder?: string
    noDataText?: string
    spacing?: boolean
    width?: number | string
    dropdownHeight?: number | string
    zIndex?: number
    config?: SelectConfig
    textBoxStyle?: StyleProp<ViewStyle>
    textBoxTextStyle?: StyleProp<TextStyle>
    dropdownStyle?: StyleProp<ViewStyle>
    optionTextStyle?: StyleProp<TextStyle>
    selectedBackgroundStyle?: StyleProp<ViewStyle>
    selectedTextStyle?: StyleProp<TextStyle>
    searchStyle?: StyleProp<TextStyle>
    caretIcon?: () => JSX.Element
    clearIcon?: () => JSX.Element
    noDataComponent?: () => JSX.Element
}

const Select = (props: Props) => {
    const [yPosition, setYPosition] = useState(0);
    const [visible, setVisible] = useState(false);
    const isVisible = props.isVisible ?? visible;
    const [selectedItemText, setSelectedItemText] = useState<string | undefined>();
    const spacing = props.spacing ?? true;

    const onTextBoxClick = () => {
        if (props.isDisabled) return;
        setVisible(!visible);
        if (props.onClick) props.onClick();
    }
    const onItemSelect = (item?: SelectItem) => {
        setSelectedItemText(item?.text);
        if (props.onSelect) props.onSelect(item?.value);
        setVisible(false);
    }
    const clearSelection = () => onItemSelect(undefined);
    const getDropdownPos = (event: LayoutChangeEvent) => setYPosition(event.nativeEvent.layout.y);

    return (
        <View style={{ width: props.width ?? '90%', zIndex: props.zIndex }}>
            <TextBox
                text={selectedItemText}
                placeholder={props.placeholder}
                onclick={onTextBoxClick}
                onXClick={clearSelection}
                config={props.config}
                containerStyle={props.textBoxStyle}
                textStyle={props.textBoxTextStyle}
                isDropdownVisible={isVisible}
                isDisabled={props.isDisabled}
                caretIcon={props.caretIcon}
                clearIcon={props.clearIcon}
            />
            { spacing && <View style={styles.spacer} /> }
            <View onLayout={getDropdownPos} />
            { isVisible &&
                <DropDown
                    data={props.data ?? []}
                    search={props.search}
                    yPosition={yPosition}
                    selectedValue={props.value}
                    onItemSelect={onItemSelect}
                    searchPlaceholder={props.searchPlaceholder}
                    noDataText={props.noDataText}
                    maxHeight={props.dropdownHeight}
                    config={props.config}
                    backgroundStyle={props.dropdownStyle}
                    textStyle={props.optionTextStyle}
                    selectedBgStyle={props.selectedBackgroundStyle}
                    selectedTextStyle={props.selectedTextStyle}
                    searchStyle={props.searchStyle}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    spacer: {
        height: Dimensions.get("window").height * 0.005
    }
})

export default Select;
