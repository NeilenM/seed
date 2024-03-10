import { useMemo, useState } from "react";
import { Cell, HeaderGroup, Row, useFilters } from "react-table";
import { alpha, useTheme } from '@mui/material/styles';

// assets
import { ArrowDown2, ArrowRight2, Edit, LayoutMaximize, Maximize1, Send } from 'iconsax-react';

import { 
    Column, 
    useGlobalFilter, 
    useTable, 
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect, } from "react-table";
    import {
        Box,
        Stack,
        Table,
        TableBody,
        TableCell,
        TableFooter,
        TableHead,
        TableRow,
        Tooltip,
        IconButton
      } from '@mui/material';

import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from "utils/react-table";
 
import { 
    CSVExport, 
    DraggableHeader, 
    EmptyTable, 
    HeaderSort, 
    HidingSelect, 
    Item, 
    TableRowSelection,  
    TablePagination, 
} from "components/third-party/ReactTable";
import update from 'immutability-helper';
import SyntaxHighlight from 'utils/SyntaxHighlight';

import { LabelKeyObject } from "react-csv/lib/core";

export function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
    const theme = useTheme();
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const [editableRowIndex, setEditableRowIndex] = useState(null);
  
    const defaultColumn = useMemo(
      () => ({
        Filter: DefaultColumnFilter,
        // Cell: EditableRow
      }),
      []
    );
  
    const initialState = useMemo(
      () => ({
        filters: [{ id: 'status', value: '' }],
        hiddenColumns: ['id', 'role', 'contact', 'country', 'fatherName'],
        columnOrder: ['selection', 'avatar', 'lastName', 'firstName', 'email', 'age', 'visits', 'status', 'progress'],
        pageIndex: 0,
        pageSize: 10
      }),
      []
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      rows,
      page,
      prepareRow,
      setColumnOrder,
      gotoPage,
      setPageSize,
      setHiddenColumns,
      allColumns,
      state: { globalFilter, hiddenColumns, pageIndex, pageSize, columnOrder, selectedRowIds },
      preGlobalFilteredRows,
      setGlobalFilter,
      selectedFlatRows
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState,
        filterTypes,
        editableRowIndex,
        setEditableRowIndex
      },
      useGlobalFilter,
      useFilters,
      useColumnOrder,
      useGroupBy,
      useSortBy,
      useExpanded,
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.allColumns.push((columns) => [
          ...columns,
          {
            accessor: 'edit',
            id: 'edit',
            Footer: 'Edit',
            Header: 'Edit',
            disableFilters: true,
            disableSortBy: true,
            disableGroupBy: true,
            groupByBoundary: true,
            Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
              <>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                  <Tooltip title={editableRowIndex !== row.index ? 'Edit' : 'Save'}>
                    <IconButton
                      color={editableRowIndex !== row.index ? 'primary' : 'success'}
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = row.index;
                        if (editableRowIndex !== currentIndex) {
                          // row requested for edit access
                          setEditableRowIndex(currentIndex);
                        } else {
                          // request for saving the updated row
                          setEditableRowIndex(null);
                        }
                      }}
                    >
                      {editableRowIndex !== row.index ? <Edit /> : <Send />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </>
            )
          }
        ]);
      }
    );
  
    const reorder = (item: Item, newIndex: number) => {
      const { index: currentIndex } = item;
  
      let dragRecord = columnOrder[currentIndex];
      if (!columnOrder.includes(item.id)) {
        dragRecord = item.id;
      }
  
      setColumnOrder(
        update(columnOrder, {
          $splice: [
            [currentIndex, 1],
            [newIndex, 0, dragRecord]
          ]
        })
      );
    };
  
    let headers: LabelKeyObject[] = [];
    allColumns.map((item) => {
      if (!hiddenColumns?.includes(item.id) && item.id !== 'selection' && item.id !== 'edit') {
        headers.push({ label: typeof item.Header === 'string' ? item.Header : '#', key: item.id });
      }
      return item;
    });
  
    return (
      <>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              size="small"
            />
            <Stack direction="row" spacing={2}>
              <HidingSelect hiddenColumns={hiddenColumns!} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
              <CSVExport
                data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d: Row) => d.original) : data}
                filename={'umbrella-table.csv'}
                headers={headers}
              />
            </Stack>
          </Stack>
  
          <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
            <Table {...getTableProps()}>
              <TableHead sx={{ borderTopWidth: 2 }}>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: HeaderGroup<{}>, index: number) => {
                      const groupIcon = column.isGrouped ? <Maximize1 size={18} /> : <LayoutMaximize size={18} />;
                      return (
                        <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                          <DraggableHeader reorder={reorder} key={column.id} column={column} index={index}>
                            <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                              {column.canGroupBy ? (
                                <Box
                                  sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                                  {...column.getGroupByToggleProps()}
                                >
                                  {groupIcon}
                                </Box>
                              ) : null}
                              <HeaderSort column={column} sort />
                            </Stack>
                          </DraggableHeader>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
  
              {/* striped table -> add class 'striped' */}
              <TableBody {...getTableBodyProps()} className="striped">
                {headerGroups.map((group: HeaderGroup<{}>) => (
                  <TableRow {...group.getHeaderGroupProps()}>
                    {group.headers.map((column: HeaderGroup) => (
                      <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                        {column.canFilter ? column.render('Filter') : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {page.length > 0 ? (
                  page.map((row: Row, i: number) => {
                    prepareRow(row);
                    return (
                      <TableRow
                        {...row.getRowProps()}
                        {...(editableRowIndex !== row.index && {
                          onClick: () => {
                            row.toggleRowSelected();
                          }
                        })}
                        sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                      >
                        {row.cells.map((cell: Cell) => {
                          let bgcolor = 'inherit';
                          if (cell.isGrouped) bgcolor = 'success.lighter';
                          if (cell.isAggregated) bgcolor = 'warning.lighter';
                          if (cell.isPlaceholder) bgcolor = 'error.lighter';
                          if (cell.isPlaceholder) bgcolor = 'error.lighter';
                          if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);
                          const collapseIcon = row.isExpanded ? <ArrowDown2 /> : <ArrowRight2 />;
  
                          return (
                            <TableCell {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                              {cell.isGrouped ? (
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                                  <Box
                                    sx={{ pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }}
                                    onClick={(e: any) => {
                                      row.toggleRowExpanded();
                                      e.stopPropagation();
                                    }}
                                  >
                                    {collapseIcon}
                                  </Box>
                                  {cell.render('Cell')} ({row.subRows.length})
                                </Stack>
                              ) : cell.isAggregated ? (
                                cell.render('Aggregated')
                              ) : cell.isPlaceholder ? null : (
                                cell.render('Cell')
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <EmptyTable msg="No Data" colSpan={9} />
                )}
              </TableBody>
  
              {/* footer table */}
              <TableFooter sx={{ borderBottomWidth: 2 }}>
                {footerGroups.map((group) => (
                  <TableRow {...group.getFooterGroupProps()}>
                    {group.headers.map((column: HeaderGroup) => (
                      <TableCell {...column.getFooterProps([{ className: column.className }])}>{column.render('Footer')}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableFooter>
            </Table>
          </Box>
          <Box sx={{ p: 2, py: 0 }}>
            <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
          </Box>
  
          <SyntaxHighlight>
            {JSON.stringify(
              {
                selectedRowIndices: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map((d: Row) => d.original)
              },
              null,
              2
            )}
          </SyntaxHighlight>
        </Stack>
      </>
    );
  }
  