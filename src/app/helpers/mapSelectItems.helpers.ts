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

export const mapWithadjuststore = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item[prefix]} - ${item.bezeich}`,
      value: item['lager-nr'],
    }))
    : [];

export const mapWithadjustmain = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item[prefix]} - ${item.bezeich}`,
      value: item.endkum,
    }))
    : [];

export const mapGroup = (items, name, prefix) =>
  items
    ? items.map((item) => ({ label: item[name], value: item[prefix] }))
    : [];

export const mapInterkitchen = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item.num} - ${item.depart}`,
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

export const mapOU4Label = (items, prefix, name1, name2, name3, name4) =>
  items
    ? items.map((item) => ({
      label: `${item[name1]} - ${item[name2]} - ${item[name3]} - ${item[name4]}`,
      value: item[prefix],
    }))
    : [];
