import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import CustomersList from '../components/CustomersList';
import FilterAndSearch from '../components/FilterAndSearch';
import { fetchCustomers } from '../services/CustomersService';
import './CustomersContainer.css';


function CustomersContainer({ history }) {
    const [customers, setCustomers] = useState([])

    const [search, setSearch] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [filterData, setFilterData] = useState([])
    const [sortValue, setSortValue] = useState('')
    const columnDefs = [
        { headerName: "First Name", field: "firstName", cellClass: "grid-cell-centered" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Company", field: "company" }
    ]

    const sortData = [
        {
            label: 'First Name, Ascending',
            value: 'firstName'
        },
        {
            label: 'First Name, Descending',
            value: 'firstName,DSC'
        },
        {
            label: 'Last Name, Ascending',
            value: 'lastName'
        },
        {
            label: 'Last Name, Descending',
            value: 'lastName,DSC'
        },
        {
            label: 'Company, Ascending',
            value: 'company'
        },
        {
            label: 'Company, Descending',
            value: 'company,DSC'
        }
    ]

    const onSearchChange = (value) => {
        setSearch(value)
        const queryString = value !== '' ? `?q=${value}` : ''
        history.push(`/customers?search=${value}`)
        fetchList(queryString)
    }

    const onFilterChange = (value) => {
        setFilterValue(value)
        const queryString = value !== '' ? `?companyFilter=${value}` : ''
        history.push(value !== '' ? `/customers?filter_by_company_name=${value}` : '/customers')
        fetchList(queryString)
    }

    const onSortChange = (value) => {
        setSortValue(value)
        const queryString = value !== '' ? `?sort=${value}` : ''
        history.push(value !== '' ? `/customers?sort_by=${value}` : '/customers')
        fetchList(queryString)
    }

    const fetchList = (queryString) => {
        fetchCustomers(queryString).then(res => {
            setCustomers(res.data.customersList)
            setSearch('')
            if (queryString !== '') {
                const uniqueCompanies = [...new Set(res.data.customersList.map(customer => customer.company))]
                setFilterData(uniqueCompanies)
            } else {
                setFilterData(res.data.companiesList)

            }
        })
    }
    useEffect(() => {
        fetchList('')
    }, [])
    return (
        <Fragment>
            <div>
                <FilterAndSearch search={search} filterValue={filterValue}
                    filterData={filterData} onSearchChange={onSearchChange} 
                    onFilterChange={onFilterChange} sortData={sortData}
                    sortValue={sortValue} onSortChange={onSortChange}></FilterAndSearch>
                <CustomersList rowData={customers} columnDefs={columnDefs}></CustomersList>
            </div>
        </Fragment>
    )
}

export default withRouter(CustomersContainer)