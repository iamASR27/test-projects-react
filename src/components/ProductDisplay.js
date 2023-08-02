import React from "react";
import Button from "./Button/Button";
import styles from "./ProductDisplay.module.css";

const ProductDisplay = (props) => {
  const deleteHandler = (productId) => {
    props.onDelete(productId);
  };

  const categoryData = {};
  for (const data of props.onFormData) {
    const category = data.category;
    if (!categoryData[category]) {
      categoryData[category] = [];
    }
    categoryData[category].push(data);
  }

  return (
    <div className={styles.display}>
      <div>
        <h5>Electronics Items</h5>
        <ul>
          {categoryData["electronics"] &&
            categoryData["electronics"].map((data) => (
              <li key={data.id}>
                {data.name} - {data.price}
                <Button type="delete" onClick={() => deleteHandler(data.id)}>
                  Delete
                </Button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h5>Food Items</h5>
        <ul>
          {categoryData["food"] &&
            categoryData["food"].map((data) => (
              <li key={data.id}>
                {data.name} {data.price}
                <Button type="delete" onClick={() => deleteHandler(data.id)}>
                  Delete
                </Button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h5>Skincare Items</h5>
        <ul>
          {categoryData["skincare"] &&
            categoryData["skincare"].map((data) => (
              <li key={data.id}>
                {data.name} {data.price}
                <Button type="delete" onClick={() => deleteHandler(data.id)}>
                  Delete
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
  //   <div className={styles.display}>
  //     {categoryProduct.map((category) => (
  //       <div key={category}>
  //         <h5>{category}</h5>
  //         <ul>
  //           {categoryData[category].map((data) => (
  //             <li key={data.id}>
  //               {data.name} {data.price}
  //               <Button onClick={() => deleteHandler(data.id)}>
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

export default ProductDisplay;
