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

export const mapOU = (items, prefix, name) =>
  items
    ? items.map((item) => ({
        label: `${item[prefix]} - ${item[name]}`,
        value: item[prefix],
      }))
    : [];

export const mapGroup = (items, name, prefix) =>
  items
    ? items.map((item) => ({ label: item[name], value: item[prefix] }))
    : [];
