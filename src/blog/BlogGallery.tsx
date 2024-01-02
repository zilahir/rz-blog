import React from "react";

import { format } from "date-fns";
import Link from "next/link";

import { Pagination, IPaginationProps } from "../pagination/Pagination";
import { PostItems } from "../types/Post";

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <ul>
      {props.posts.map((elt) => (
        <li key={elt.slug} className="mb-3 flex justify-between">
          <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
            <a className="no-underline">
              <h2 className="text-2xl text-deep-blush-400">{elt.title}</h2>
            </a>
          </Link>

          <div className="text-right">
            {format(new Date(elt.date), "LLL d, yyyy")}
          </div>
        </li>
      ))}
    </ul>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { BlogGallery };
