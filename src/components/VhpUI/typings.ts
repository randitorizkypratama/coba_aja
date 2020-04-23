export interface TableHeader {
  name?: string;
  label?: string;
  field: string | Function;
  required?: boolean;
  align?: string;
  sortable?: boolean;
  sort?: Function;
  format?: Function;
  style?: string;
  classes?: string;
  headerStyle?: string;
  headerClasses?: string;
}
