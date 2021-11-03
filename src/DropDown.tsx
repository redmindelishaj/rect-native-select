import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import { SelectConfig, SelectItem } from "..";
import { getConfigContainerStyle, getConfigTextStyle, WindowHeight, WindowWidth } from "./common";
import { DefaultNoDataComponent, DefaultItem } from "./DefaultComponents";

interface Props {
    data: SelectItem[]
    yPosition: number
    selectedValue?: any
    search?: boolean
    onItemSelect?: (item: SelectItem) => void
    searchPlaceholder?: string
    noDataText?: string
    maxHeight?: number | string
    config?: SelectConfig
    backgroundStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    selectedBgStyle?: StyleProp<ViewStyle>
    selectedTextStyle?: StyleProp<TextStyle>
    searchStyle?: StyleProp<TextStyle>
    noDataComponent?: () => JSX.Element
}
interface ItemProps {
    item: SelectItem
}

const defaultMaxHeight = WindowHeight * 0.6;
const defaultSelectedBg = '#005085';
const defaultSelectedTextColor = 'white';
const defaultPlaceholderColor = '#a0a0a0';

const getSelectedBgStyle = (config?: SelectConfig): StyleProp<ViewStyle> => ({
    backgroundColor: config?.selectedBackgroundColor ?? defaultSelectedBg
});
const getSelectedTextStyle = (config?: SelectConfig): StyleProp<TextStyle> => ({
    fontSize: config?.fontSize,
    fontFamily: config?.selectedFontFamily ?? config?.fontFamily,
    color: config?.selectedTextColor ?? defaultSelectedTextColor,
    fontWeight: config?.selectedFontWeight,
});
const getDefaultSearchStyle = (config?: SelectConfig) => ({
    borderBottomWidth: 1,
    borderBottomColor: config?.placeholderTextColor ?? defaultPlaceholderColor,
});

const DropDown = ({
    data,
    selectedValue,
    search,
    searchPlaceholder,
    noDataText,
    onItemSelect,
    yPosition,
    maxHeight,
    config,
    backgroundStyle,
    textStyle,
    selectedBgStyle,
    selectedTextStyle,
    searchStyle,
    noDataComponent,
}: Props) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => setFilteredData(data), [data]);

    const filterData = (text: string) => {
        setSearchText(text);
        const filtered = data.filter(item => item.text.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    }

    const configBgStyle: StyleProp<ViewStyle> = getConfigContainerStyle(config);
    const configTextStyle: StyleProp<TextStyle> = getConfigTextStyle(config);
    const configSelectedBgStyle: StyleProp<ViewStyle> = getSelectedBgStyle(config);
    const configSelectedTextStyle: StyleProp<TextStyle> = getSelectedTextStyle(config);

    const Option = ({ item }: ItemProps) => {
        let itemBackgroundStyle = undefined;
        let itemTextStyle = textStyle ?? configTextStyle;
        if (item.value === selectedValue) {
            itemBackgroundStyle = selectedBgStyle ?? configSelectedBgStyle;
            itemTextStyle = selectedTextStyle ?? configSelectedTextStyle;
        }
        const onPress = onItemSelect ? () => onItemSelect(item) : undefined;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.dropdownItemContainer, itemBackgroundStyle]}>
                <DefaultItem text={item.text} textStyle={itemTextStyle} />
            </TouchableOpacity>
        );
    }
    const NoDataComponent = noDataComponent ? noDataComponent : () => <DefaultNoDataComponent text={noDataText} textStyle={configTextStyle} />;

    const containerStyle: StyleProp<ViewStyle> = [
        styles.dropdownDefault,
        configBgStyle,
        backgroundStyle,
        { top: yPosition, maxHeight: maxHeight ?? defaultMaxHeight },
        styles.mainContainer,
    ];
    const searchInputStyle: StyleProp<TextStyle> = [
        getDefaultSearchStyle(config),
        configTextStyle,
        searchStyle,
    ];

    return (
        <View style={containerStyle}>
            { search &&
                <View style={styles.searchContainer}>
                    <TextInput
                        style={searchInputStyle}
                        placeholder={searchPlaceholder ?? 'Search...'}
                        onChangeText={filterData}
                        value={searchText}
                        placeholderTextColor={config?.placeholderTextColor ?? defaultPlaceholderColor}
                    />
                </View>
            }
            { filteredData.length === 0 ?
                <NoDataComponent />
            :
                <FlatList
                    keyboardShouldPersistTaps={"always"}
                    nestedScrollEnabled
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    data={filteredData}
                    renderItem={({ item }) => <Option item={item} />}
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
    searchContainer: {
        paddingHorizontal: WindowWidth * 0.04,
        paddingBottom: WindowHeight * 0.01,
    },
    dropdownItemContainer: {
        paddingVertical: WindowHeight * 0.02,
        paddingHorizontal: WindowWidth * 0.04,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownDefault: {
        paddingVertical: WindowWidth * 0.02,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    searchDefault: {
        borderBottomWidth: 1,
        borderBottomColor: '#a0a0a0',
    },
});

export default DropDown;
