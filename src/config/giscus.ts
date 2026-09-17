/**
 * 评论系统：Giscus（基于 GitHub Discussions，零部署、零成本）
 *
 * 参数获取：https://giscus.app
 * 前置条件：仓库已开启 Discussions，且已安装 Giscus App。
 */
export const GISCUS = {
  enable: true,
  /** 仓库（owner/repo） */
  repo: 'clerimia/clerimia.github.io',
  repoId: 'R_kgDOQ3OhaQ',
  /** Discussion 分类，需为已存在的分类 */
  category: 'Announcements',
  categoryId: 'DIC_kwDOQ3Ohac4DFxw1',
  /** 评论与页面的关联方式：pathname / url / title / og:title */
  mapping: 'pathname',
  reactionsEnabled: true,
  inputPosition: 'top'
}
