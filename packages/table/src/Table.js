import { ThemeContext } from "@hig/themes";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import React from "react";
import BaseTable from "react-base-table";
import 'react-base-table/styles.css'

import Column from "./Column";
import DefaultExpandIcon from "./DefaultExpandIcon";
import DefaultSortIndicator from "./DefaultSortIndicator";
import SortOrder from "./SortOrder";
import "./table.scss";



/**
 * Table component based on react-virtualized
 */
class Table extends React.Component {
  render() {
    const { width, maxHeight, ...restProps } = this.props;
    let { height } = this.props;
    if (!height && maxHeight) {
      height = this.state.tableHeight;
    }
    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => (
          <BaseTable
            width={width}
            {...restProps}
            />)}
      </ThemeContext.Consumer>
    );
  }
}

Table.Column = Column;

Table.defaultProps = {
  rowKey: "id",
  fixed: false,
  hideHeader: false,
  headerHeight: 50,
  rowHeight: 50,
  rowExpandedHeight: 0,
  footerHeight: 0,
  defaultExpandedRowKeys: [],
  sort: {},
  overscanRowCount: 10,
  frozenRowCount: 0,
  onEndReachedThreshold: 500,

  onScroll: noop,
  onRowsRendered: noop,
  onResize: noop,
  onScrollbarPresenceChange: noop,
  onRowExpand: noop,
  onExpandedRowsChange: noop,
  onColumnSort: noop,
  onColumnResize: noop,
  renderEmpty: noop,
  renderFooter: noop,
  renderRowExpanded: noop,
  components: {
    ExpandIcon: DefaultExpandIcon,
    SortIndicator: DefaultSortIndicator
  }
};

Table.propTypes = {
  /**
   * Class name for the container
   */
  className: PropTypes.string,
  /**
   * Custom style for the container
   */
  style: PropTypes.object,
  /**
   * A collection of Column
   */
  children: PropTypes.node,
  /**
   * Columns for the table
   */
  columns: PropTypes.arrayOf(PropTypes.shape({ ...Column.propTypes })),
  /**
   * The data for the table
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The count of rows be frozen to top
   */
  frozenRowCount: PropTypes.number,
  /**
   * The key field of each data item
   */
  rowKey: PropTypes.string.isRequired,
  /**
   * The width of the table
   */
  width: PropTypes.number.isRequired,
  /**
   * The height of the table
   */
  height: PropTypes.number,
  /**
   * The max height of the table, the table's height will auto change when data changes,
   * will turns to vertical scroll if reaches the max height
   *
   * Available only if `height` is unset or equals 0
   */
  maxHeight: PropTypes.number,
  /**
   * The height of each table row
   */
  rowHeight: PropTypes.number.isRequired,
  /**
   * The height of extra part of the expanded row, if set tree data will be ignored
   */
  rowExpandedHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * The height of the table header
   */
  headerHeight: PropTypes.number.isRequired,
  /**
   * The height of the table footer
   */
  footerHeight: PropTypes.number,
  /**
   * Whether the width of the columns are fixed or flexible
   */
  fixed: PropTypes.bool,
  /**
   * Whether the table is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Whether to show the table header
   */
  hideHeader: PropTypes.bool,
  /**
   * Optional renderer when the length of data is 0
   */
  renderEmpty: PropTypes.func,
  /**
   * Custom footer renderer, available only if `footerHeight` is larger then 0
   */
  renderFooter: PropTypes.func,
  /**
   * Custom header renderer
   * The callback is of the shape of `({ isScrolling, columns }) => *`
   */
  renderHeader: PropTypes.func,
  /**
   * Custom row renderer
   * The callback is of the shape of `({ isScrolling, columns, rowData, rowIndex, depth }) => *`
   */
  renderRow: PropTypes.func,
  /**
   * Custom extra part of the expanded row renderer
   * The callback is of the shape of `({ isScrolling, columns, rowData, rowIndex }) => *`
   */
  renderRowExpanded: PropTypes.func,
  /**
   * Class name for the table header
   */
  headerClassName: PropTypes.string,
  /**
   * Custom style for the table header
   */
  headerStyle: PropTypes.object,
  /**
   * Class name for the table row, could be a callback to return the class name
   * The callback is of the shape of `({ rowData, rowIndex }) => string`
   */
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Custom style for the table row, could be a callback to return the style
   * The callback is of the shape of `({ rowData, rowIndex }) => object`
   */
  rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * The key for the expand column which render the expand icon if the data is a tree
   */
  expandColumnKey: PropTypes.string,
  /**
   * Default expanded row keys when initalize the table
   */
  defaultExpandedRowKeys: PropTypes.arrayOf(PropTypes.string),
  /**
   * Controlled expanded row keys
   */
  expandedRowKeys: PropTypes.arrayOf(PropTypes.string),
  /**
   * A callback function when expand or collapse a tree node
   * The handler is of the shape of `({ expanded, rowData, rowIndex }) => *`
   */
  onRowExpand: PropTypes.func,
  /**
   * A callback function when the expanded row keys changed
   * The handler is of the shape of `(expandedRowKeys) => *`
   */
  onExpandedRowsChange: PropTypes.func,
  /**
   * The sort state for the table
   */
  sort: PropTypes.shape({
    /**
     * Sort key
     */
    key: PropTypes.string,
    /**
     * Sort order
     */
    order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
  }),
  /**
   * A callback function for the header cell click event
   * The handler is of the shape of `({ key, order }) => *`
   */
  onColumnSort: PropTypes.func,
  /**
   * A callback function when resizing the column width
   * The handler is of the shape of `({ column, width }) => *`
   */
  onColumnResize: PropTypes.func,
  /**
   * Number of rows to render above/below the visible bounds of the list
   */
  overscanRowCount: PropTypes.number,
  /**
   * A callback function when scrolling the table
   * The handler is of the shape of `({ scrollLeft, scrollTop }) => *`
   */
  onScroll: PropTypes.func,
  /**
   * A callback function when scrolling the table within `onEndReachedThreshold` of the bottom
   * The handler is of the shape of `({ distanceFromEnd }) => *`
   */
  onEndReached: PropTypes.func,
  /**
   * Threshold in pixels for calling `onEndReached`.
   */
  onEndReachedThreshold: PropTypes.number,
  /**
   * A callback function with information about the slice of rows that were just rendered
   * The handler is of the shape of `({ overscanStartIndex, overscanStopIndex, startIndex， stopIndex }) => *`
   */
  onRowsRendered: PropTypes.func,
  /**
   * A callback function when the scrollbar presence state changed
   * The handler is of the shape of `({ size, vertical, horizontal }) => *`
   */
  onScrollbarPresenceChange: PropTypes.func,
  /**
   * A object for the row event handlers
   * Each of the keys is row event name, like `onClick`, `onDoubleClick` and etc.
   * Each of the handlers is of the shape of `({ rowData, rowIndex, rowKey, event }) => *`
   */
  rowEventHandlers: PropTypes.object,
  /**
   * A object for the custom components, like `ExpandIcon` and `SortIndicator`
   */
  components: PropTypes.shape({
    ExpandIcon: PropTypes.any,
    SortIndicator: PropTypes.any
  })
};

export default Table;
