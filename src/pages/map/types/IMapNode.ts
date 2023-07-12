import { KindView } from "../../../contexts/kinds";

export interface IMapNode {
  id: string;
  label: string;
  sequence: number
  view: KindView;
  group: number;
}
