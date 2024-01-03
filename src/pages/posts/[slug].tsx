import React from "react";

import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";

import { Content } from "../../content/Content";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { Post } from "../../types/Post";
import { getAllPosts, getPostBySlug } from "../../utils/Content";
import { markdownToHtml } from "../../utils/Markdown";

type IPostUrl = {
  slug: string;
};

const DisplayPost = (props: Post) => (
  <Main
    meta={
      <Meta
        title={props.title}
        description={props.description}
        post={{
          image: props.image,
          date: props.date,
          modified_date: props.modified_date,
          languages: props.languages,
          categories: props.categories,
        }}
      />
    }
  >
    <div className="text-sm mb-8">
      <h1 className="font-bold text-3xl text-gray-900">{props.title}</h1>
      <h2>{format(new Date(props.date), "LLLL d, yyyy")}</h2>
    </div>

    <Content>
      <div
        // eslint-disable-next-line react/no-danger
        className="dark:text-white-200"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </Content>
  </Main>
);

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Post, IPostUrl> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    "title",
    "description",
    "date",
    "modified_date",
    "image",
    "content",
    "slug",
    "languages",
    "categories",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date,
      image: post.image,
      content,
      categories: post.categories,
      languages: post.languages,
    },
  };
};

export default DisplayPost;
