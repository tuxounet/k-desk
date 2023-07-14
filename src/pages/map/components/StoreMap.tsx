import React from "react";

import ForceGraph2D from "react-force-graph-2d";
import { IElement } from "../../../contexts/datastore/types/IElement";
import { ITopic } from "../../../contexts/datastore/types/ITopic";
import { IMapNode } from "../types/IMapNode";
import { IMapLink } from "../types/IMapLink";
import { KindContext } from "../../../contexts/kinds";
interface StoreMapProps {
  elements: IElement[];

  topics: ITopic[];
}

export default function StoreMap({ elements, topics }: StoreMapProps) {
  const [nodes, setNodes] = React.useState<IMapNode[]>([]);
  const [links, setLinks] = React.useState<IMapLink[]>([]);
  const { setCurrent, setData } = React.useContext(KindContext);
  React.useEffect(() => {
    const links: IMapLink[] = [];
    const topicNodes = topics.map((item) => {
      const result: IMapNode = {
        id: "T" + item.sequence,
        sequence: item.sequence,
        label: item.title,
        group: 0,
        view: "topics",
      };
      return result;
    });
    const elementNodes = elements.map((item) => {
      const result: IMapNode = {
        id: "E" + item.sequence,
        sequence: item.sequence,
        label: item.title,
        group: item.topic,
        view: "elements",
      };
      links.push({
        source: "T" + item.topic,
        target: "E" + item.sequence,
        value: "contains",
      });
      return result;
    });

    setNodes([...topicNodes, ...elementNodes]);
    setLinks(links);
  }, [elements, topics]);
  const onNodeSelected = (node: IMapNode) => {
    setData(node.sequence);
    setCurrent(node.view);
  };
  return (
    <>
      <ForceGraph2D
        graphData={{
          nodes,
          links,
        }}
        onNodeClick={(node) => {
          onNodeSelected(node);
        }}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          ); // some padding

          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fillRect(
            (node.x ?? 0) - bckgDimensions[0] / 2,
            (node.y ?? 0) - bckgDimensions[1] / 2,
            bckgDimensions[0],
            bckgDimensions[1]
          );

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x ?? 0, node.y ?? 0);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions &&
            ctx.fillRect(
              (node.x ?? 0) - bckgDimensions[0] / 2,
              (node.y ?? 0) - bckgDimensions[1] / 2,
              bckgDimensions[0],
              bckgDimensions[1]
            );
        }}
      />
    </>
  );
}
