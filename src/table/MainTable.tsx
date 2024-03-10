import Avatar from "components/@extended/Avatar";
import { useMemo } from "react";
import {
  roundedMedian,
  filterGreaterThan,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter
} from 'utils/react-table';

import {
  DragPreview,
  IndeterminateCheckbox,
} from 'components/third-party/ReactTable';

import {
  Column,
  Row,
  FooterProps,
  HeaderProps
} from 'react-table';

import makeData from 'data/react-table';
import { Typography } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import MainCard from "components/MainCard";
import ScrollX from "components/ScrollX";
import { DndProvider } from "react-dnd";

// Declara require como una variable global para evitar errores en TypeScript
declare const require: {
  context(path: string, recursive: boolean, regExp: RegExp): any;
};

// Uso de require.context
const avatarImage = require.context('assets/images/users', true, /\.(png|jpe?g|svg)$/);

import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { ReactTable } from "./ReactTable";

const MainTable = () => {
    const data = useMemo(() => makeData(200), []);
    const columns = useMemo(
      () =>
        [
          {
            title: 'Row Selection',
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }: HeaderProps<{}>) => (
              <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
            ),
            Footer: '#',
            accessor: 'selection',
            groupByBoundary: true,
            Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
            disableSortBy: true,
            disableFilters: true,
            disableGroupBy: true,
            Aggregated: () => null
          },
          {
            Header: '#',
            Footer: '#',
            accessor: 'id',
            className: 'cell-center',
            disableFilters: true,
            disableGroupBy: true
          },
          {
            Header: 'Avatar',
            Footer: 'Avatar',
            accessor: 'avatar',
            className: 'cell-center',
            disableSortBy: true,
            disableFilters: true,
            disableGroupBy: true,
            Cell: ({ value }: { value: number }) => (
              <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${!value ? 1 : value}.png`)} />
            )
          },
          {
            Header: 'First Name',
            Footer: 'First Name',
            accessor: 'firstName',
            dataType: 'text',
            disableGroupBy: true,
            aggregate: 'count',
            Aggregated: ({ value }: { value: number }) => `${value} Person`
          },
          {
            Header: 'Last Name',
            Footer: 'Last Name',
            accessor: 'lastName',
            dataType: 'text',
            filter: 'fuzzyText',
            disableGroupBy: true
          },
          {
            Header: 'Father Name',
            Footer: 'Father Name',
            accessor: 'fatherName',
            dataType: 'text',
            disableGroupBy: true
          },
          {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'email',
            dataType: 'text',
            disableGroupBy: true
          },
          {
            Header: 'Age',
            Footer: 'Age',
            accessor: 'age',
            dataType: 'text',
  
            className: 'cell-right',
            Filter: SliderColumnFilter,
            filter: 'equals',
            aggregate: 'average',
            Aggregated: ({ value }: { value: number }) => `${Math.round(value * 100) / 100} (avg)`
          },
          {
            Header: 'Role',
            Footer: 'Role',
            dataType: 'text',
            accessor: 'role',
            disableGroupBy: true
          },
          {
            Header: 'Contact',
            dataType: 'text',
            Footer: 'Contact',
            accessor: 'contact',
            disableGroupBy: true
          },
          {
            Header: 'Country',
            Footer: 'Country',
            accessor: 'country',
            dataType: 'text',
            disableGroupBy: true
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            dataType: 'text',
            className: 'cell-right',
            Filter: NumberRangeColumnFilter,
            filter: 'between',
            disableGroupBy: true,
            aggregate: 'sum',
            Aggregated: ({ value }: { value: number }) => `${value} (total)`,
            Footer: (info: FooterProps<{}>) => {
              const { rows } = info;
              // only calculate total visits if rows change
              const total = useMemo(() => rows.reduce((sum: number, row: Row) => row.values.visits + sum, 0), [rows]);
  
              return (
                <Typography variant="subtitle1">
                  <NumericFormat value={total} displayType="text" thousandSeparator />
                </Typography>
              );
            }
          },
          {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'status',
            dataType: 'select',
            Filter: SelectColumnFilter,
            filter: 'includes'
          },
          {
            Header: 'Profile Progress',
            Footer: 'Profile Progress',
            accessor: 'progress',
            Filter: SliderColumnFilter,
            dataType: 'progress',
            filter: filterGreaterThan,
            disableGroupBy: true,
            aggregate: roundedMedian,
            Aggregated: ({ value }: { value: number }) => `${value} (med)`
          }
        ] as unknown as Column[],
      []
    );
  
    return (
      <MainCard
        title="Umbrella Table"
        subheader="This page consist combination of most possible features of react-table in to one table. Sorting, grouping, row selection, hidden row, filter, search, pagination, footer row available in below table."
        content={false}
      >
        <ScrollX>
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <ReactTable columns={columns} data={data} />
            <DragPreview />
          </DndProvider>
        </ScrollX>
      </MainCard>
    );
  };
  
  export default MainTable;
  