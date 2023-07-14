import { KindView } from "../../../contexts/kinds";

export interface IMapNode {
  sequence: number;

  label: string;
  view: KindView;
  group?: number;
}
