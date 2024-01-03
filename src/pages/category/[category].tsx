import { ReactElement } from "react";

import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  PreviewData,
} from "next";
import slugify from "slugify";

import { BlogGallery } from "../../blog/BlogGallery";
import { IPaginationProps } from "../../pagination/Pagination";
import { Main } from "../../templates/Main";
import { PaginatedPosts } from "../../types/Post";
import { AppConfig } from "../../utils/AppConfig";
import { getAllPosts } from "../../utils/Content";

interface IBlogGalleryProps extends PaginatedPosts {}

function CategoryPosts(props: IBlogGalleryProps): ReactElement {
  return (
    <Main>
      <BlogGallery
        hideTags={true}
        posts={props.posts}
        pagination={props.pagination}
      />
    </Main>
  );
}

type IPostCategory = {
  category: string;
};

export const getStaticPaths: GetStaticPaths<IPostCategory> = async () => {
  const posts = getAllPosts(["categories"]);
  return {
    paths: posts.map((post) => ({
      params: {
        category: slugify(post.categories[0]),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IBlogGalleryProps,
  IPostCategory
> = async ({ params }: GetStaticPropsContext<IPostCategory, PreviewData>) => {
  const { category } = params!;
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

  const pagination: IPaginationProps = {};

  if (posts.length > AppConfig.pagination_size) {
    pagination.next = "/page2";
  }

  return {
    props: {
      posts: [...posts],
      pagination,
    },
  };
};

export default CategoryPosts;
