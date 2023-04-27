import React, { useState } from 'react';

function TemporalDropdown() {
  const [year, setYear] = useState(2023); // set the initial year to 2023
  const [month, setMonth] = useState(4); // set the initial month to April (4th month)

  // define an array of months
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  // define a function to handle changes to the dropdown
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    if (name === 'year') {
      setYear(parseInt(value));
    } else if (name === 'month') {
      setMonth(parseInt(value));
    }
  };

  return (
    
    
    <div className="temporal-dropdown">
      <select name="month" value={month} onChange={handleDropdownChange} className="temporal-dropdown__select temporal-dropdown__select--month">
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
      <select name="year" value={year} onChange={handleDropdownChange} className="temporal-dropdown__select temporal-dropdown__select--year">
        <option value={2021}>2021</option>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>
    </div>
  );
}

export default TemporalDropdown;
