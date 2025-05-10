import React from "react";

function useCart() {
  const total = React.useRef(null);
  const [items, setItems] = React.useState([]);

  const handleItemsChange = (x) => {
    // console.log("in items change", Array.isArray(x) && x.length >= 1, x);
    setItems(x);
    if (Array.isArray(x) && x.length >= 1) {
      let count = 0;
      x.forEach((fld) => {
        console.log("field", fld);
        count = count + fld.total;
      });
      console.log("in hook", count);
      total.current = count;
    }
  };
  // console.log("Total", total);
  return {
    total: total.current,
    items,
    handleItemsChange,
  };
}

export default useCart;
