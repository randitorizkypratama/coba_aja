export interface LayoutState {
  currentModule: string | null;
}

interface Submodule {
  path: string;
  name: string;
  icon: string;
}

export interface SubmoduleList {
  GL: Submodule[];
  Inventory: Submodule[];
}
