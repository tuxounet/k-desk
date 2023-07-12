import { IElement } from "../../../contexts/datastore/types/IElement";
import ElementListItem from "./ElementListItem";

interface ElementListProps {
  elements: IElement[];
  selected?: number;
}
export default function ElementList({ elements }: ElementListProps) {
  return (
    <>
      {elements.map((item) => (
        <ElementListItem element={item} key={item.sequence} />
      ))}
    </>
  );
}
