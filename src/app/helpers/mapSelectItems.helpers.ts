export const mapWithBezeich = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item[prefix]} - ${item.bezeich}`,
      value: item.bezeich,
    }))
    : [];


export const mapWithMeal = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item[prefix]} - ${item.depart}`,
      value: item.num,
    }))
    : [];