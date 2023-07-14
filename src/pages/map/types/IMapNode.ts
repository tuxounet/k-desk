import { KindView } from "../../../contexts/kinds";

export interface IMapNode {
  id: number;

  label: string;
  view: KindView;
  group?: number;
}
