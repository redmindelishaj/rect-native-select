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
import DropDownView from "./src/DropDownView";
import TextView from "./src/TextView";

export interface SelectItem {
    text: string
    value: any
}

interface Props {
    data?: SelectItem[]
    value?: SelectItem
    onSelect?: (value?: any) => void
    placeholder?: string
    searchPlaceholder?: string
    search?: boolean
    isVisible?: boolean
    isDisabled?: boolean
    width?: number | string
    dropdownHeight?: number | string
    textBoxStyle?: StyleProp<ViewStyle>
    textBoxTextStyle?: StyleProp<TextStyle>
    dropdownStyle?: StyleProp<ViewStyle>
    optionTextStyle?: StyleProp<TextStyle>
    selectedBgStyle?: StyleProp<ViewStyle>
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

    const onTextBoxClick = () => {
        if (props.isDisabled) return;
        setVisible(!visible);
    }
    const onItemSelect = (item?: SelectItem) => {
        setSelectedItemText(item?.text);
        if (props.onSelect) props.onSelect(item?.value);
        setVisible(false);
    }
    const clearSelection = () => onItemSelect(undefined);
    const getDropdownPos = (event: LayoutChangeEvent) => setYPosition(event.nativeEvent.layout.y);

    return (
        <View style={{ width: props.width ?? '90%' }}>
            <TextView
                text={selectedItemText}
                placeholder={props.placeholder}
                onclick={onTextBoxClick}
                onXClick={clearSelection}
                containerStyle={props.textBoxStyle}
                textStyle={props.textBoxTextStyle}
                isDropdownVisible={isVisible}
                isDisabled={props.isDisabled}
                caretIcon={props.caretIcon}
                clearIcon={props.clearIcon}
            />
            <View style={styles.spacer} />
            <View onLayout={getDropdownPos} />
            <DropDownView
                data={props.data ?? []}
                isVisible={isVisible}
                search={props.search}
                yPosition={yPosition}
                selectedValue={props.value}
                onItemSelect={onItemSelect}
                searchPlaceholder={props.searchPlaceholder}
                maxHeight={props.dropdownHeight}
                backgroundStyle={props.dropdownStyle}
                textStyle={props.optionTextStyle}
                selectedBgStyle={props.selectedBgStyle}
                selectedTextStyle={props.selectedTextStyle}
                searchStyle={props.searchStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    spacer: {
        height: Dimensions.get("window").height * 0.005
    }
})

export default Select;
