import React, { useEffect, useState } from "react";
import {
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    Dimensions,
    LayoutChangeEvent,
    StyleSheet
} from "react-native";
import DropDownView from "./DropDownView";
import TextView from "./TextView";

export interface SelectItem {
    text: string
    value: any
}

interface Props {
    data?: SelectItem[]
    onSelect?: (value: any) => void
    placeholder?: string
    searchPlaceholder?: string
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
}

const Select = (props: Props) => {
    const [yPosition, setYPosition] = useState(0);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SelectItem>();
    const isVisible = props.isVisible ?? visible;

    useEffect(() => {
        const selected: SelectItem | undefined = props.data?.find(item => item.value === selectedItem?.value);
        setSelectedItem(selected);
    }, [props.data]);

    const onTextBoxClick = () => {
        if (props.isDisabled) return;
        setVisible(!visible);
    }
    const onItemSelect = (item: SelectItem) => {
        setSelectedItem(item);
        if (props.onSelect) {
            props.onSelect(item.value);
        }
        setVisible(false);
    }
    const getDropdownPos = (event: LayoutChangeEvent) => setYPosition(event.nativeEvent.layout.y);

    return (
        <View style={{ width: props.width ?? '90%' }}>
            <TextView
                text={selectedItem?.text}
                placeholder={props.placeholder}
                onclick={onTextBoxClick}
                style={props.textBoxStyle}
                textStyle={props.textBoxTextStyle}
                isDropdownVisible={isVisible}
                isDisabled={props.isDisabled}
            />
            <View style={styles.spacer} />
            <View onLayout={getDropdownPos} />
            <DropDownView
                data={props.data ?? []}
                isVisible={isVisible}
                yPosition={yPosition}
                selectedItemValue={selectedItem?.value}
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
