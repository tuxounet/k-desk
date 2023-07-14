import ElementDetailView from "./views/ElementDetail";
import AllElemenntView from "./views/AllElements";

interface ElementsPanelProps {
  item?: number;
}

export default function ElementsPanel({ item }: ElementsPanelProps) {
  return (
    <>
      {!item && <AllElemenntView />}
      {item && <ElementDetailView item={item} />}
    </>
  );
}
