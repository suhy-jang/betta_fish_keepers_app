import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { searchProfiles } from '../../actions/profile'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'

const SearchBar = ({ searchProfiles, history }) => {
  const [query, setQuery] = useState('')

  const onChange = e => {
    setQuery(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (query.length > 0) {
      searchProfiles(query, history, `/search`)
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
  searchProfiles: PropTypes.func.isRequired,
}

export default connect(null, { searchProfiles })(withRouter(SearchBar))
