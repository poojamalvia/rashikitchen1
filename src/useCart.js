let total = 0;

let items = [];

const handleItemsChange = (x) => {
  console.log("in items change", x);
  items = x;
  if (Array.isArray(x) && x.length >= 1) {
    let count = 0;
    x.forEach((fld) => {
      console.log("field", fld);
      count = count + fld.total;
    });
    console.log("in hook", count);
    total = count;
    localStorage.setItem("count", count);
    localStorage.setItem("item", JSON.stringify(items));
  }
};

module.exports = {
  total,
  handleItemsChange,
  items,
};
