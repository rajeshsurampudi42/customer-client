import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './CustomersList.css'

function CustomersList({ rowData, columnDefs }) {
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    }
    return (
         <div style={{ width: "100%", height: "500px" }}>
           <div
             id="customersGrid"
             style={{
               boxSizing: "border-box",
               height: "100%",
               width: "100%"
             }}
             className="ag-theme-balham"
           >
             <AgGridReact
               columnDefs={columnDefs}
               rowData={rowData}
               onGridReady={onGridReady.bind(this)}
               pagination={true}
               paginationPageSize={20}
             />
           </div>
       </div>
    )
}

CustomersList.propTypes = {
    rowData: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            company: PropTypes.string.isRequired
        })
    ).isRequired,
    columnDefs: PropTypes.arrayOf(
        PropTypes.shape({
            headerName: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
        })
    ).isRequired
}

export default CustomersList