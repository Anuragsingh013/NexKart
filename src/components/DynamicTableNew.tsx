import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { FontFamily } from '../assets/fonts'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { Colors } from '../constants/color'

/**
 * A dynamic table component with support for fixed column scrolling
 * 
 * @param {Array} headerData - Array of header titles
 * @param {Array} rowData - Array of data objects
 * @param {Array} footerData - Array of footer texts
 * @param {Boolean} horizontalFixedScroll - Whether horizontal scrolling is enabled in fixed mode
 * @param {Boolean} verticalScroll - Whether vertical scrolling is enabled
 * @param {Boolean} fixedScroll - Whether first column should be fixed during horizontal scrolling
 * @param {Number} fixedColumnWidth - Width of the fixed column (default: 120)
 * @param {Boolean} showHeader - Whether to show header (default: true)
 * @param {Object} customStyles - Custom styles to override default styles
 */
const DynamicTableNew = ({
  headerData = [],
  rowData = [],
  footerData = [],
  horizontalFixedScroll = false,
  verticalScroll = true,
  fixedScroll = false,
  fixedColumnWidth = 120,
  showHeader = true,
  customStyles = {}
}) => {
  // Get remaining columns data excluding the first column when in fixed scroll mode
  const getRemainingColumnsData = (item) => {
    const values = Object.values(item);
    return values.slice(1);
  };

  // Memoize the styles merged with custom styles
  const mergedStyles = useMemo(() => {
    return {
      ...styles,
      container: {
        ...styles.container,
        ...(customStyles.container || {})
      },
      headerRow: {
        ...styles.headerRow,
        ...(customStyles.headerRow || {})
      },
      // Add other style overrides as needed
    };
  }, [customStyles]);

  // Header component that displays column headers
  const RenderHeaderComponent = () => (
    <View style={mergedStyles.headerRow}>
      {headerData.map((header, index) => (
        <View
          key={`header-${index}`}
          style={[
            mergedStyles.headerCell,
            // Apply minimum width to ensure headers have consistent sizing
            { minWidth: dynamicSize(100) }
          ]}
        >
          <Text style={mergedStyles.headerText} numberOfLines={2}>{header}</Text>
        </View>
      ))}
    </View>
  );

  // Fixed header component for the fixed scroll mode
  const RenderFixedHeaderComponent = () => (
    <View style={mergedStyles.headerRow}>
      <View style={[mergedStyles.headerCell, { width: dynamicSize(fixedColumnWidth) }]}>
        <Text style={[mergedStyles.headerText, { textAlign: "left" }]} numberOfLines={2}>{headerData[0]}</Text>
      </View>
    </View>
  );

  // Scrollable header component for the remaining columns in fixed mode
  const RenderScrollableHeaderComponent = () => (
    <View style={mergedStyles.headerRow}>
      {headerData.slice(1).map((header, index) => (
        <View
          key={`header-${index + 1}`}
          style={[
            mergedStyles.headerCell,
            { minWidth: dynamicSize(100) }
          ]}
        >
          <Text style={mergedStyles.headerText} numberOfLines={2}>{header}</Text>
        </View>
      ))}
    </View>
  );

  // Row component for standard mode (all columns)
  const RenderDataComponent = ({ item }) => (
    <View style={mergedStyles.dataRow}>
      {Object.values(item).map((value, index) => (
        <View
          key={`cell-${index}`}
          style={[
            mergedStyles.dataCell,
            { minWidth: dynamicSize(100) }
          ]}
        >
          <Text style={mergedStyles.dataText} numberOfLines={2} ellipsizeMode='tail'>{value}</Text>
        </View>
      ))}
    </View>
  );

  // Fixed column component that displays only the first column
  const RenderFixedDataComponent = ({ item, index }) => {
    const firstValue = Object.values(item)[0];
    return (
      <View style={mergedStyles.dataRow}>
        <View
          style={[
            mergedStyles.dataCell,

            { width: dynamicSize(fixedColumnWidth), backgroundColor: index % 2 === 0 ? '#F9FAFE' : '#FFFFFF' }
          ]}
        >
          <Text style={[mergedStyles.dataText, { textAlign: "left" }]} numberOfLines={2}>{firstValue}</Text>
        </View>
      </View>
    );
  };

  // Scrollable data component for the remaining columns in fixed mode
  const RenderScrollableDataComponent = ({ item, index }) => (
    <View style={[mergedStyles.dataRow, { backgroundColor: index % 2 === 0 ? '#F9FAFE' : '#FFFFFF' }]}>
      {getRemainingColumnsData(item).map((value, index) => (
        <View
          key={`cell-scrollable-${index}`}
          style={[
            mergedStyles.dataCell,
            {
              minWidth: dynamicSize(100),
            }
          ]}
        >
          <Text style={mergedStyles.dataText} numberOfLines={2}>{value}</Text>
        </View>
      ))}
    </View>
  );

  // Footer component
  const RenderFooterComponent = () => (
    <View style={mergedStyles.footerRow}>
      {footerData.map((footer, index) => (
        <View key={`footer-${index}`} style={mergedStyles.footerCell}>
          <Text style={mergedStyles.footerText}>{footer}</Text>
        </View>
      ))}
    </View>
  );

  // Fixed footer component for the first column
  const RenderFixedFooterComponent = () => (
    <View style={mergedStyles.footerRow}>
      <View
        style={[
          mergedStyles.footerCell,
          { width: dynamicSize(fixedColumnWidth) }
        ]}
      >
        <Text style={mergedStyles.footerText}>{footerData[0]}</Text>
      </View>
    </View>
  );

  // Scrollable footer component for the remaining columns
  const RenderScrollableFooterComponent = () => (
    <View style={mergedStyles.footerRow}>
      {footerData.slice(1).map((footer, index) => (
        <View
          key={`footer-scrollable-${index}`}
          style={mergedStyles.footerCell}
        >
          <Text style={mergedStyles.footerText}>{footer}</Text>
        </View>
      ))}
    </View>
  );

  // Empty component when no data is available
  const RenderEmptyComponent = () => (
    <View style={mergedStyles.emptyContainer}>
      <Text style={mergedStyles.emptyText}>No Data Available</Text>
    </View>
  );

  // Render fixed scroll table layout
  const renderFixedScrollTable = () => (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexDirection: 'row' }} style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
        {/* Fixed column */}
        <View style={{ width: dynamicSize(fixedColumnWidth) }}>
          <FlatList
            data={rowData}
            scrollEnabled={false}
            ListHeaderComponent={<RenderFixedHeaderComponent />}
            renderItem={RenderFixedDataComponent}
            ListFooterComponent={rowData.length > 0 && footerData.length > 0 ? <RenderFixedFooterComponent /> : null}
            ListEmptyComponent={<RenderEmptyComponent />}
            keyExtractor={(item, index) => `fixed-row-${index}`}
            style={mergedStyles.flatList}
          />
        </View>

        {/* Scrollable columns */}
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        >
          <FlatList
            scrollEnabled={false}
            data={rowData}
            ListHeaderComponent={<RenderScrollableHeaderComponent />}
            renderItem={RenderScrollableDataComponent}
            ListFooterComponent={rowData.length > 0 && footerData.length > 1 ? <RenderScrollableFooterComponent /> : null}
            ListEmptyComponent={null}
            keyExtractor={(item, index) => `scrollable-row-${index}`}
            style={mergedStyles.flatList}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );

  // Render standard table layout
  const renderStandardTable = () => (
    <ScrollView
      style={{ flex: 1 }}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{ flexDirection: "column" }}
    >
      {showHeader && <RenderHeaderComponent />}
      <FlatList
        nestedScrollEnabled={true}
        data={rowData}
        horizontal={horizontalFixedScroll}
        scrollEnabled={verticalScroll}
        renderItem={RenderDataComponent}
        ListFooterComponent={rowData.length > 0 && footerData.length > 0 ? <RenderFooterComponent /> : null}
        ListEmptyComponent={<RenderEmptyComponent />}
        keyExtractor={(item, index) => `standard-row-${index}`}
        style={mergedStyles.flatList}
      />
    </ScrollView>
  );

  return (
    <View style={styles.mainContainer}>
      {fixedScroll ? renderFixedScrollTable() : renderStandardTable()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: dynamicSize(5),
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomColor: Colors.borderColor,

  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: dynamicSize(10),
    borderRadius: dynamicSize(5),
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: dynamicSize(10),
    // minWidth: dynamicSize(100),
    width: dynamicSize(140),
    height: dynamicSize(48),
    borderRightWidth: dynamicSize(.5),
    borderColor: Colors.borderColor,
    backgroundColor: Colors.coral
  },
  headerText: {
    fontSize: getFontSize(16),
    fontFamily: FontFamily.nunitoExtraBold,
    // color: '#2c2c2c',
    color: "#fff",
    textAlign: "right"
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: dynamicSize(.5),
    borderBottomColor: Colors.borderColor,
    // padding: dynamicSize(10),
  },
  dataCell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: dynamicSize(16),
    // minWidth: dynamicSize(100),
    width: dynamicSize(140),
    height: dynamicSize(48),
    borderRightWidth: dynamicSize(.5),
    zIndex: 100,
    overflow: "hidden",
    borderColor: Colors.borderColor,
  },
  dataText: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.sofiaProRegular,
    color: '#444444',
    textAlign: "right"
  },
  footerRow: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: dynamicSize(10),
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
  footerCell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: dynamicSize(10),
    width: dynamicSize(140)
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: getFontSize(14),
    fontFamily: FontFamily.sofiaProMedium,
    color: '#2c2c2c',
  },
  emptyContainer: {
    padding: dynamicSize(20),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: getFontSize(16),
    color: '#999',
    fontFamily: FontFamily.sofiaProRegular,
  },
  flatList: {
    flexGrow: 0,
  },
  alternateRow: {
    backgroundColor: '#f5f5f5',
  }
});

export default DynamicTableNew;