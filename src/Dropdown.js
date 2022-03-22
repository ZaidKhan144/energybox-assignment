import React from 'react'

const Dropdown = (props) => {
  const { optionVal, handleChange, optionsList, title } = props;

  return (
    <div>
        {title} &emsp;
        <select value={optionVal} onChange={handleChange}>
            {optionsList?.concat()?.map((val, idx) => (
                <option key={idx} value={val}>
                    {val}
                </option>
            ))}
        </select>
        &emsp; &emsp;
    </div>
  )
}

export default Dropdown