import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './FilterAndSearch.css'
import { DebounceInput } from 'react-debounce-input';

function FilterAndSearch({ search, filterData, onSearchChange, onFilterChange, filterValue, sortValue, sortData, onSortChange }) {
    const handleSearchChange = (value) => {
        onSearchChange(value)
    }
    const handleFilterChange = (value) => {
        onFilterChange(value)
    }
    const handleSortChange = (value) => {
        onSortChange(value)
    }
    return (
        <Fragment>
            <div className="filterContainer">
                <div>
                    <label>
                        Search By First Name or Last Name:
                        <DebounceInput
                            minLength={3}
                            debounceTimeout={300}
                            value={search}
                            onChange={event => handleSearchChange(event.target.value)} placeholder="Minimum three characters" />
                    </label>
                </div>
                <div>
                    <label>
                        Filter By Company:
                    </label>
                    <select
                        onChange={event => handleFilterChange(event.target.value)}
                        value={filterValue}
                    >
                        <option value="">All Companies</option>
                        {filterData.map((value, index) => <option value={value} key={index} >{value}</option>)}
                    </select>
                </div>
                <div>
                    <label>
                        Sort By First Name, last Name , Company:
                    </label>
                    <select
                        onChange={event => handleSortChange(event.target.value)}
                        value={sortValue}
                    >
                        {sortData.map((data, index) => <option value={data.value} key={index} >{data.label}</option>)}
                    </select>
                </div>
            </div>
        </Fragment>
    )
}

FilterAndSearch.defaultProps = {
    search: '',
    filterData: [],
    onSearchChange: () => { },
    onFilterChange: () => { },
    filterValue: '',
    sortData: [],
    sortValue: '',
    onSortChange: () => { }
}

FilterAndSearch.propTypes = {
    search: PropTypes.string,
    filterData: PropTypes.arrayOf(PropTypes.string),
    onSearchChange: PropTypes.func,
    onFilterChange: PropTypes.func,
    filterValue: PropTypes.string,
    sortValue: PropTypes.string,
    sortData: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    onSortChange: PropTypes.func
}

export default FilterAndSearch