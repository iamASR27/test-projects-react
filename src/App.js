import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  // const [listTitle, setListTitle] = useState("My List");
  const [sortOrder, setSortOrder] = useState("ascending");

  // const changeTitleHandler = useCallback(() => {
  //   setListTitle("New Title");
  // }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  const toggleSortOrderHandler = useCallback(() => {
    setSortOrder((prevOrder) =>
      prevOrder === "ascending" ? "descending" : "ascending"
    );
  }, []);

  const listTitle = `Sorted List in ${
    sortOrder === "ascending" ? "Ascending" : "Descending"
  } Order`;


  const buttonTitle = `${
    sortOrder === "ascending"
      ? "Change to descending order"
      : "Change to ascending order"
  }`;
  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} sortOrder={sortOrder}/>
      {/* <Button onClick={changeTitleHandler}>Change to increasing order</Button> */}
      <Button onClick={toggleSortOrderHandler}>{buttonTitle}</Button>
    </div>
  );
}

export default App;
