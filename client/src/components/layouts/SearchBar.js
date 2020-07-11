import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { search } from '../../actions/search'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'

const SearchBar = ({ search, history }) => {
  const [query, setQuery] = useState('')

  const onChange = e => {
    setQuery(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (query.length > 0) {
      search(query)
      history.push('/search')
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
  search: PropTypes.func.isRequired,
}

export default connect(null, { search })(withRouter(SearchBar))
