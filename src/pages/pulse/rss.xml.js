import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("pulse");
  return rss({
    title: "Пульс веб-платформы",
    description: "Ежедневный дайджест новостей веб-разработки",
    site: context.site,
    items: posts.map((post) => ({
      link: `${import.meta.env.BASE_URL}pulse/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      ...post.data,
    })),
  });
}
