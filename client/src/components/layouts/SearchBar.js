import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import { searchUsers } from '../../actions/user'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'

const SearchBar = ({ searchUsers, history }) => {
  const [query, setQuery] = useState('')

  const onChange = e => {
    setQuery(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (query.length > 0) {
      console.log(query)
      searchUsers(query, history, `/search`)
    } else {
      setAlert("Don't leave a blank form", 'danger')
    }
  }

  return (
    <>
      <form name="search-form" onSubmit={e => onSubmit(e)}>
        <div className="search-form">
          <span className="form-control-wrap">
            <input
              type="text"
              name="search"
              value={query}
              id="search"
              size="40"
              className="form-control"
              placeholder="search"
              onChange={e => onChange(e)}
            />
          </span>
          <button type="submit" className="form-control submit">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </form>
    </>
  )
}

SearchBar.propTypes = {
  searchUsers: PropTypes.func.isRequired,
}

export default connect(null, { searchUsers })(withRouter(SearchBar))
