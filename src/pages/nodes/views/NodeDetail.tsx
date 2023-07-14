import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";

import { KindContext } from "../../../contexts/kinds";
import {
  DataNodeStatus,
  IDataNode,
} from "../../../contexts/datastore/types/IDataNode";
import NodeIcon from "../components/NodeIcon";
import NodeStatusText from "../components/NodeStatusText";
import changeNodeStatusOperation from "../operations/changeNodeStatus";
import DateText from "../components/DateText";
import LinkToNode from "../components/LinkToNode";
import { FileContext } from "../../../contexts/file";

interface NodeDetailViewProps {
  item?: number;
}
export default function NodeDetailView({ item }: NodeDetailViewProps) {
  const { readonly } = React.useContext(FileContext);
  const storeContext = React.useContext(DataStoreContext);
  const { setData } = React.useContext(KindContext);

  const [node, setNode] = React.useState<IDataNode>();

  React.useEffect(() => {
    let allNodes: IDataNode[] = storeContext.store.nodes.items || [];

    if (item) {
      const found = allNodes.find((e) => e.sequence === item);
      if (found) {
        setNode(found);
        console.dir(found);
        return;
      } else {
        setNode(undefined);
      }
    }
  }, [storeContext, item]);
  const onChangeStatus = (newStatus: DataNodeStatus) => {
    if (!node) return;
    changeNodeStatusOperation(node, newStatus, storeContext);
  };
  return (
    <>
      {node && (
        <>
          <div className="card is-fullwidth">
            <header className="card-header">
              <a className="card-header-title">
                <span className="icon">
                  <NodeIcon kind={node.kind} />
                </span>
                <span className="has-text-weight-semibold ml-2">
                  #{node.sequence} {node.title} (
                  <NodeStatusText status={node.status} />)
                </span>
                <button
                  className="delete ml-3"
                  onClick={() => {
                    setData(undefined);
                  }}
                ></button>
              </a>
            </header>
            <div className={`card-content`}>
              <p>Description: {node.description}</p>
              <hr />
              <p>
                Crée le: <DateText date={node.createdAt} />
                <br />
                Dernière mise à jour: <DateText date={node.updatedAt} />
              </p>
              <hr />
            </div>
          </div>
          {!readonly && (
            <div className="card is-fullwidth">
              <header className="card-header">
                <a className="card-header-title">Etat</a>
              </header>
              <footer className={`card-footer`}>
                {node.status !== "COMPLETED" && (
                  <>
                    {node.status === "ACTIVE" && (
                      <a
                        className="card-footer-item"
                        onClick={() => {
                          onChangeStatus("PENDING");
                        }}
                      >
                        Suspendre
                      </a>
                    )}
                    {node.status === "PENDING" && (
                      <a
                        className="card-footer-item"
                        onClick={() => {
                          onChangeStatus("ACTIVE");
                        }}
                      >
                        Reprendre
                      </a>
                    )}
                    <a
                      className="card-footer-item"
                      onClick={() => {
                        onChangeStatus("COMPLETED");
                      }}
                    >
                      Terminer
                    </a>
                  </>
                )}
                {node.status === "COMPLETED" && (
                  <>
                    <a
                      className="card-footer-item"
                      onClick={() => {
                        onChangeStatus("ACTIVE");
                      }}
                    >
                      Réactiver
                    </a>
                  </>
                )}
              </footer>
            </div>
          )}
          <div className="card is-fullwidth">
            <header className="card-header">
              <a className="card-header-title">Références</a>
            </header>
            <div className={`card-content`}>
              <div className="panel-block">
                Parent :
                <LinkToNode
                  sequence={node.parent}
                 
                />{" "}
              </div>
              {node.childs &&
                node.childs.map((item) => (
                  <div className="panel-block">
                    {item.type} :
                    <LinkToNode sequence={item.target} key={`#${item}`} />{" "}
                  </div>
                ))}
            </div>{" "}
            {!readonly && (
              <div className="card is-fullwidth">
                <header className="card-header">
                  <a className="card-header-title">Actions</a>
                </header>

                <footer className={`card-footer`}>
                  {node.sequence !== node.parent && (
                    <a className="card-footer-item has-background-danger-light">
                      Supprimer
                    </a>
                  )}
                </footer>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
