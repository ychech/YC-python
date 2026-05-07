export type KnowledgeNode = {
  id: string;
  title: string;
  slug: string;
  children?: KnowledgeNode[];
  status?: "locked" | "todo" | "doing" | "done" | "review";
};

export const knowledgeTree: KnowledgeNode[] = [
  {
    id: "basics",
    title: "1. 基础入门",
    slug: "basics",
    children: [
      { id: "install", title: "环境安装", slug: "install", status: "done" },
      { id: "types", title: "变量与数据类型", slug: "types", status: "doing" },
      { id: "io", title: "输入输出", slug: "io", status: "todo" },
      { id: "ops", title: "运算符", slug: "ops", status: "locked" },
    ],
  },
  {
    id: "flow",
    title: "2. 流程控制",
    slug: "flow",
    children: [
      { id: "if", title: "if 判断", slug: "if", status: "locked" },
      { id: "loops", title: "for / while 循环", slug: "loops", status: "locked" },
      { id: "break", title: "break / continue", slug: "break", status: "locked" },
    ],
  },
  {
    id: "ds",
    title: "3. 数据结构",
    slug: "data-structures",
    children: [
      { id: "list", title: "列表 list", slug: "list", status: "locked" },
      { id: "dict", title: "字典 dict", slug: "dict", status: "locked" },
      { id: "tuple", title: "元组 tuple", slug: "tuple", status: "locked" },
      { id: "set", title: "集合 set", slug: "set", status: "locked" },
    ],
  },
];

export function findKnowledgeBySlug(slug: string) {
  const queue: KnowledgeNode[] = [...knowledgeTree];
  while (queue.length) {
    const node = queue.shift();
    if (!node) break;
    if (node.slug === slug) return node;
    if (node.children) queue.push(...node.children);
  }
  return null;
}
