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
import { SelectConfig, SelectItem } from "..";
import { DefaultNoDataComponent, DefaultItem } from "./Default";

interface Props {
    data: SelectItem[]
    yPosition: number
    isVisible: boolean
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

const WindowHeight = Dimensions.get("window").height;
const WindowWidth = Dimensions.get("window").width;
const defaultMaxHeight = WindowHeight * 0.6;
const defaultSelectedBg = '#005085';
const defaultSelectedTextColor = 'white';
const defaultPlaceholderColor = '#a0a0a0';

const getConfigContainerStyle = (config?: SelectConfig): StyleProp<ViewStyle> => {
    if (config == null) return undefined;
    const { backgroundColor, borderRadius } = config;
    let configBgStyle: StyleProp<ViewStyle> = {
        backgroundColor: config?.backgroundColor,
        borderRadius: config?.borderRadius,
    }
    if (backgroundColor == null) delete configBgStyle.backgroundColor;
    if (borderRadius == null) delete configBgStyle.borderRadius;
    return configBgStyle;
}

const DropDown = ({
    data,
    selectedValue,
    isVisible,
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
    const configSelectedBgStyle: StyleProp<ViewStyle> = { backgroundColor: config?.selectedBackgroundColor ?? defaultSelectedBg };
    const configTextStyle: StyleProp<TextStyle> = {
        fontSize: config?.fontSize,
        fontFamily: config?.fontFamily,
        fontWeight: config?.fontWeight,
        color: config?.textColor,
    };
    const configSelectedTextStyle: StyleProp<TextStyle> = {
        fontSize: config?.fontSize,
        fontFamily: config?.selectedFontFamily ?? config?.fontFamily,
        color: config?.selectedTextColor ?? defaultSelectedTextColor,
        fontWeight: config?.selectedFontWeight,
    };

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
                <DefaultItem text={item.text} style={itemTextStyle} />
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
        styles.searchDefault,
        configTextStyle,
        searchStyle
    ];

    if (!isVisible) return null;
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
    selectedTextDefault: {
        color: 'white',
    },
});

export default DropDown;
