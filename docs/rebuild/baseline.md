# 重建前基线

2026-11-06，在独立工作副本 `claude/magical-feistel-76cb03`，以 `cf08de85a370c0b7452e9ef0866943fd9497581d` 为基准。未修改文章正文、URL 或字体。

## 实测结果

环境：Windows，Node v24.21.0，npm 11.19.0。

| 项目 | 结果 |
| --- | --- |
| `npm ci` | exit 0 |
| `npm run build` | exit 0；67 页；Astro 构建 8.41s |
| 静态检查 | 102 文件，0 errors / 0 warnings / 0 hints |
| HTML 路由 | 67；黄金清单在根目录 `urls.txt` |
| dist 文件 | 211 |
| Pagefind | 8 页 / 1889 词 / 1 filter |
| sitemap | 42 条；清理 24 条；8 条 lastmod |
| `node --test tests/*.test.mjs` | 50 项，48 通过，2 失败 |
| 双主题语义色 | 各 49 个，包含 6 个终端语义色 |

完整原始输出见 `build.log` 与 `tests.log`。耗时是本机样本，不作性能结论。

## 原有失败

1. `generated color documentation matches CSS tokens`：生成器判定 DESIGN.md 未同步。
2. `agent endpoints are present and readable`：design.md 开头格式断言失败。检查读取的换行格式及实际接口内容，不能删除检查来获得通过。

## 本轮已对齐的实施范围

用户允许在隔离工作副本中整体替换基础，中间态可以暂时不可用；不创建 PR、不合入 main、不发布。

保留 Astro 6，移除模板与 UnoCSS，显式接入 React 19、React 集成 5.x、Tailwind 4。保留 Vite 7。React 仅承担需要它的交互，文章正文继续静态输出；不再要求整张文章页绝对零 island。已有简单交互可保留原生实现，不维护两套相同行为。

保持内容、URL、导航、现有视觉与功能。现有内容中提到旧模板的历史文字必须保留；旧栈清理检查针对代码依赖，不要求删除文章里的词语。域名暂为 TODO(domain)，空 `.pages.yml` 暂保留，Giscus 配置不变，不接入新订阅服务。
