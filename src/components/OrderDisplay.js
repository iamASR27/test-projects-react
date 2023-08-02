import React from "react";
import Button from "./Button/Button";
import styles from "./OrderDisplay.module.css";

const OrderDisplay = (props) => {
  const deleteHandler = (orderId) => {
    props.onDelete(orderId);
  };

  const tablesData = {};
  for (const data of props.onFormData) {
    const table = data.table;
    if (!tablesData[table]) {
      tablesData[table] = [];
    }
    tablesData[table].push(data);
  }

  return (
    <div className={styles.display}>
      <div>
        <h5>Table 1</h5>
        <ul>
          {tablesData["table1"] && tablesData["table1"].map((data) => (
            <li key={data.order_id}>
              {data.dish} - {data.price}
              <Button type="delete" onClick={() => deleteHandler(data.order_id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Table 2</h5>
        <ul>
          {tablesData["table2"] && tablesData["table2"].map((data) => (
            <li key={data.order_id}>
              {data.dish} {data.price}
              <Button type="delete" onClick={() => deleteHandler(data.order_id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Table 3</h5>
        <ul>
          {tablesData["table3"] && tablesData["table3"].map((data) => (
            <li key={data.order_id}>
              {data.dish} {data.price}
              <Button type="delete" onClick={() => deleteHandler(data.order_id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  //   <div className={styles.display}>
  //     {tableOrder.map((table) => (
  //       <div key={table}>
  //         <h5>{table}</h5>
  //         <ul>
  //           {tableData[table].map((data) => (
  //             <li key={data.order_id}>
  //               {data.dish} {data.price}
  //               <Button onClick={() => deleteHandler(data.order_id)}>
  //                 Delete
  //               </Button>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     ))}
  //      </div>
  // )
 
};

export default OrderDisplay;
