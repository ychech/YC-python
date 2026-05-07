import Link from "next/link";
import { knowledgeTree, type KnowledgeNode } from "@/lib/knowledge";
import styles from "./SidebarTree.module.css";

function StatusDot({ status }: { status?: KnowledgeNode["status"] }) {
  return <span className={styles[`dot_${status ?? "todo"}`]} aria-hidden="true" />;
}

function NodeRow({ node, depth }: { node: KnowledgeNode; depth: number }) {
  const href = node.children?.length ? `/learn/${node.slug}` : `/learn/${node.slug}`;
  return (
    <div className={styles.row} style={{ paddingLeft: 12 + depth * 14 }}>
      <StatusDot status={node.status} />
      <Link className={styles.link} href={href}>
        {node.title}
      </Link>
    </div>
  );
}

function renderNode(node: KnowledgeNode, depth: number) {
  return (
    <div key={node.id} className={styles.node}>
      <NodeRow node={node} depth={depth} />
      {node.children?.length ? (
        <div className={styles.children}>{node.children.map((c) => renderNode(c, depth + 1))}</div>
      ) : null}
    </div>
  );
}

export function SidebarTree() {
  return (
    <aside className={styles.root} aria-label="知识体系">
      <div className={styles.title}>知识体系</div>
      <div className={styles.tree}>{knowledgeTree.map((n) => renderNode(n, 0))}</div>
    </aside>
  );
}
