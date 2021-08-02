import React from 'react';

const UserTabs = (props) => {
  const { handleTabs } = props;

  return (
    <div className="tabs">
        <div className="radio-toolbar">

            <input type="radio" id="choice1"
            name="type" value="Favorites" onClick={handleTabs}/>
            <label htmlFor="choice1">Favs</label>

            <input type="radio" id="choice2"
            name="type" value="Recommendations" onClick={handleTabs}/>
            <label htmlFor="choice2">Recommendations</label>

            <input type="radio" id="choice3"
            name="type" value="Random" onClick={handleTabs}/>
            <label htmlFor="choice3">Random</label>
        </div>

    </div>
  );
};

export default UserTabs;