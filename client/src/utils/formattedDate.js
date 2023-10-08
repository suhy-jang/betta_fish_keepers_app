const { format: dateFns } = require('date-fns')

const FormattedDate = ({ timestamp, format }) => {
  return dateFns(new Date(+timestamp), format)
}

export default FormattedDate
