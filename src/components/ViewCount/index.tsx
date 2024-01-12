import { ReactElement, useEffect } from "react";

import useSWR from "swr";

import { fetcher } from "../../database/fetcher";
import { ViewCount } from "../../types/Post";

interface IViewCounter {
  slug: string;
  shouldRegisterView?: boolean;
}

const ViewCounter = ({
  slug,
  shouldRegisterView = false,
}: IViewCounter): ReactElement => {
  const { data, error } = useSWR<ViewCount>(`/api/views/${slug}`, fetcher);
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      });

    if (shouldRegisterView) {
      registerView();
    }
  }, [slug, shouldRegisterView]);
  return <p>Views: {data?.count}</p>;
};
export default ViewCounter;
