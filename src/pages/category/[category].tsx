import { ReactElement } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import slugify from "slugify";

import { BlogGallery } from "../../blog/BlogGallery";
import { Main } from "../../templates/Main";
import { PaginatedPosts } from "../../types/Post";
import { getAllPosts } from "../../utils/Content";

interface IBlogGalleryProps extends PaginatedPosts {}

function CategoryPosts(props: IBlogGalleryProps): ReactElement {
  return (
    <Main>
      <BlogGallery posts={props.posts} pagination={props.pagination} />
    </Main>
  );
}

type IPostCategory = {
  category: string;
};

export async function getStaticPaths(): Promise<GetStaticPaths<IPostCategory>> {
  const posts = getAllPosts(["categories"]);
  return {
    paths: posts.map((post) => ({
      params: {
        category: slugify(post.categories[0]),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}): Promise<GetStaticProps<IBlogGalleryProps, IPostCategory>> {
  const { category } = params;
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "categories",
    "languages",
  ]).filter((post) =>
    post.categories.some(
      (thisCategoriy: string) => slugify(thisCategoriy) === category
    )
  );

  return {
    props: {
      posts: [...posts],
      pagination: {
        previous: 0,
        next: 0,
      },
    },
  };
}

export default CategoryPosts;
