export const mapWithBezeich = (items, prefix) =>
  items
    ? items.map((item) => ({
        label: `${item[prefix]} - ${item.bezeich}`,
        value: item.bezeich,
      }))
    : [];
export const mapGroup = (items, name, prefix) =>
  items
    ? items.map((item) => ({ 
      label: `${item[prefix]}.${item[name]}`, 
      value: item[prefix] 
    }))
    : [];
export const mapArticel = (items, name, prefix) =>
  items
    ? items.map((item) => ({ 
      label: `${item[prefix]} - ${item[name]}`, 
      value: item[prefix] 
    }))
    : [];

export const mapWithadjustmain = (items, prefix) =>
  items
    ? items.map((item) => ({
        label: `${item[prefix]} - ${item.bezeich}`,
        value: item.endkum,
      }))
    : [];
export const mapWithadjuststore = (items, prefix) =>
  items
    ? items.map((item) => ({
        label: `${item[prefix]} - ${item.bezeich}`,
        value: item['lager-nr'],
      }))
    : [];	
    
export const mapWithMeal = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item[prefix]} - ${item.depart}`,
      value: item.num,
    }))
    : [];

export const mapInterkitchen = (items, prefix) =>
  items
    ? items.map((item) => ({
      label: `${item.num} - ${item.depart}`,
      value: item.num,
    }))
    : [];
