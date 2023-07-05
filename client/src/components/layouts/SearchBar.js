import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { search } from '../../actions/search'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'

const SearchBar = ({ search, history }) => {
  const [query, setQuery] = useState('')

  const onChange = (e) => {
    setQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (query.length > 0) {
      search(query)
      history.push('/search')
      setQuery('')
    } else {
      setAlert("Don't leave a blank form", 'danger')
    }
  }

  return (
    <>
      <form name="search-form" onSubmit={(e) => onSubmit(e)}>
        <div className="search-form bg-purple-500">
          <span className="form-control-wrap">
            <input
              type="text"
              name="search"
              value={query}
              id="search"
              size="40"
              className="form-control placeholder-purple-100 text-purple-50"
              placeholder="search"
              onChange={(e) => onChange(e)}
            />
          </span>
          <button
            type="submit"
            className="submit bg-purple-200 text-purple-900"
          >
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
