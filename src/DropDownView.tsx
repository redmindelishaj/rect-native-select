import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import { SelectItem } from "./";
import { EmptyItem, Item } from "./Default";

interface Props {
    data: SelectItem[]
    yPosition: number
    isVisible: boolean
    selectedItemValue?: any
    onItemSelect?: (item: SelectItem) => void
    searchPlaceholder?: string
    maxHeight?: number | string
    backgroundStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    selectedBgStyle?: StyleProp<ViewStyle>
    selectedTextStyle?: StyleProp<TextStyle>
    searchStyle?: StyleProp<TextStyle>
}

interface ItemProps {
    item: SelectItem
}

const WindowHeight = Dimensions.get("window").height;
const WindowWidth = Dimensions.get("window").width;
const defaultMaxHeight = WindowHeight * 0.6;

const DropDownView = ({
    data,
    isVisible,
    selectedItemValue,
    searchPlaceholder,
    onItemSelect,
    yPosition,
    maxHeight,
    backgroundStyle,
    textStyle,
    selectedBgStyle,
    selectedTextStyle,
    searchStyle
}: Props) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const selectedItemBgStyle = selectedBgStyle ?? styles.selectedBackground;
    const selectedItemTextStyle = selectedTextStyle ?? styles.selectedText

    useEffect(() => setFilteredData(data), [data]);

    const filterData = (text: string) => {
        setSearchText(text);
        const filtered = data.filter(item => item.text.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    }

    const RenderItem = ({ item }: ItemProps) => {
        let itemBackgroundStyle = undefined;
        let itemTextStyle = textStyle;
        if (item.value === selectedItemValue) {
            itemBackgroundStyle = selectedItemBgStyle;
            itemTextStyle = selectedItemTextStyle;
        }
        const onPress = onItemSelect ? () => onItemSelect(item) : undefined;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.dropdownItem, itemBackgroundStyle]}>
                <Item text={item.text} style={itemTextStyle} />
            </TouchableOpacity>
        );
    }

    if (!isVisible) return null;
    return (
        <View style={[
                backgroundStyle ?? styles.dropdownDefault,
                { top: yPosition, maxHeight: maxHeight ?? defaultMaxHeight },
                styles.mainContainer
            ]}
        >
            <View style={styles.searchContainer}>
                <TextInput
                    style={searchStyle ?? styles.searchDefault}
                    placeholder={searchPlaceholder ?? 'Search...'}
                    onChangeText={filterData}
                    value={searchText}
                />
            </View>
            <View style={styles.spacer} />
            { filteredData.length === 0 ? <EmptyItem /> :
                <FlatList
                    keyboardShouldPersistTaps={"always"}
                    nestedScrollEnabled
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    data={filteredData}
                    renderItem={({ item }) => <RenderItem item={item} />}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        zIndex: 999,
        position: 'absolute',
        width: '100%',
    },
    dropdownDefault: {
        paddingVertical: WindowWidth * 0.02,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    searchContainer: {
        paddingHorizontal: WindowWidth * 0.04,
    },
    searchDefault: {
        borderBottomWidth: 1,
        borderBottomColor: '#a0a0a0',
    },
    spacer: {
        height: WindowHeight * 0.01,
    },
    dropdownItem: {
        paddingVertical: WindowHeight * 0.02,
        paddingHorizontal: WindowWidth * 0.04,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedBackground: {
        backgroundColor: '#005085',
    },
    selectedText: {
        color: 'white',
    },
});

export default DropDownView;
