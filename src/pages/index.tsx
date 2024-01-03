import React from "react";

import { GetStaticProps } from "next";

import { BlogGallery } from "../blog/BlogGallery";
import { Meta } from "../layout/Meta";
import { IPaginationProps } from "../pagination/Pagination";
import { Main } from "../templates/Main";
import { PaginatedPosts } from "../types/Post";
import { AppConfig } from "../utils/AppConfig";
import { getAllPosts } from "../utils/Content";

interface IBlogGalleryProps extends PaginatedPosts {}

const Index = (props: IBlogGalleryProps) => (
  <Main
    meta={
      <Meta
        title="Made with Next.js, TypeScript, ESLint, Prettier, PostCSS, Tailwind CSS"
        description={AppConfig.description}
      />
    }
  >
    <BlogGallery posts={props.posts} pagination={props.pagination} />
  </Main>
);

export const getStaticProps: GetStaticProps<IBlogGalleryProps> = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "languages",
    "categories",
  ]);
  const pagination: IPaginationProps = {};

  if (posts.length > AppConfig.pagination_size) {
    pagination.next = "/page2";
  }

  return {
    props: {
      posts: posts.slice(0, AppConfig.pagination_size),
      pagination,
    },
  };
};

export default Index;
