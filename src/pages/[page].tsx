import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";

import { BlogGallery } from "../blog/BlogGallery";
import { IPaginationProps } from "../pagination/Pagination";
import { Main } from "../templates/Main";
import { PaginatedPosts } from "../types/Post";
import { AppConfig } from "../utils/AppConfig";
import { getAllPosts } from "../utils/Content";
import { convertTo2D } from "../utils/Pagination";

type IPageUrl = {
  page: string;
};

interface IBlogGalleryProps extends PaginatedPosts {}

const PaginatePosts = (props: IBlogGalleryProps) => (
  <Main>
    <BlogGallery posts={props.posts} pagination={props.pagination} />
  </Main>
);

export const getStaticPaths: GetStaticPaths<IPageUrl> = async () => {
  const posts = getAllPosts(["slug"]);

  const pages = convertTo2D(posts, AppConfig.pagination_size);

  return {
    paths: pages.slice(1).map((_, index) => ({
      params: {
        page: `page${index + 2}`,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IBlogGalleryProps,
  IPageUrl
> = async ({ params }) => {
  const posts = getAllPosts(["title", "date", "slug", "languages"]);

  const pages = convertTo2D(posts, AppConfig.pagination_size);
  const currentPage = Number(params!.page.replace("page", ""));
  const currentIndex = currentPage - 1;

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `page${currentPage + 1}`;
  }

  if (currentPage === 2) {
    pagination.previous = "/";
  } else {
    pagination.previous = `page${currentPage - 1}`;
  }

  return {
    props: {
      posts: pages[currentIndex],
      pagination,
    },
  };
};

export default PaginatePosts;
