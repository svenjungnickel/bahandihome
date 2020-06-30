import React from 'react'

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      <label htmlFor="optionPicker">{name}</label>
      <select
        className="block border border-solid border-black rounded p-2 w-full"
        id="optionPicker"
        onBlur={onChange}
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
