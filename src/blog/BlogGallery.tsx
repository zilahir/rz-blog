import React from "react";

import { format } from "date-fns";
import Link from "next/link";
import slugify from "slugify";

import Category from "../components/Category";
import Language from "../components/language";
import { Pagination } from "../pagination/Pagination";
import { PaginatedPosts } from "../types/Post";

interface IBlogGalleryProps extends PaginatedPosts {
  hideTags?: boolean;
}

function BlogGallery(props: IBlogGalleryProps) {
  return (
    <>
      <ul>
        {props.posts.map((elt) => (
          <li key={elt.slug} className="mb-3 flex justify-between flex-col">
            <div className="flex flex-1 items-center mb-3">
              <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
                <a className="flex-1 no-underline text-deep-blush-400 dark:hover:text-deep-blush-400">
                  <h2 className="text-2xl dark:text-deep-blush-400">
                    {elt.title}
                  </h2>
                </a>
              </Link>
              <div className="flex">
                <div className="text-right">
                  {format(new Date(elt.date), "yyyy MMM dd")}
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center">
              {!props.hideTags && (
                <div className="flex">
                  <ul>
                    {elt.categories.map((category) => (
                      <li key={category}>
                        <Link
                          href="/category/[category]"
                          as={`/category/${slugify(category)}`}
                        >
                          <a>
                            <Category category={category} />
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-1 justify-end">
                <ul>
                  {elt.languages.map((language) => (
                    <li key={language}>
                      <Link
                        href="/language/[language]"
                        as={`/language/${language}`}
                      >
                        <a>
                          <Language language={language} />
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {props.pagination.next ||
        (props.pagination.previous && (
          <Pagination
            previous={props.pagination.previous}
            next={props.pagination.next}
          />
        ))}
    </>
  );
}

export { BlogGallery };
