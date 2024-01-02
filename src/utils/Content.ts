import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

import { Fields } from "../types/Post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: Fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  console.log("data", data);

  const items = Object.assign(
    {},
    ...Object.entries({ ...fields }).map(([_, b]) => {
      if (b === "slug") {
        return {
          slug: realSlug,
        };
      }
      if (b === "content") {
        return {
          content,
        };
      }
      return {
        [b]: data[b],
      };
    })
  );

  return items;
}

export function getAllPosts(fields: Fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
