import React from 'react'
import PropTypes from 'prop-types'

const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      <label htmlFor="optionPicker">{name}</label>
      <select
        className="block border border-solid border-gray-300 rounded p-2 w-full"
        id="optionPicker"
        onChange={onChange}
        value={selected}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

OptionPicker.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
}

export { OptionPicker }
