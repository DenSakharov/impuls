import React from 'react';

const Notes = ({ data }) => {
  return (
    <div>
      <ul>
        {data && data.map((item, index) => <li key={index}>{index} {item.name}</li>)}
      </ul>
    </div>
  );
};
export default Notes;