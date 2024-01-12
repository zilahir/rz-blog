import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? "",
  {
    auth: {
      persistSession: false,
    },
  }
);

export const getTopSlugsByCount = async (): Promise<{ slug: string }[]> => {
  const { data, error } = await supabase
    .from("views")
    .select("slug,count")
    .order("count", { ascending: false })
    .limit(5);

  return data as { slug: string }[];
};

const getViews = async (slug: string): Promise<number> => {
  const { data: views, error } = await supabase
    .from("views")
    .select(`count`)
    .match({ slug })
    .single();

  console.log("error", error);
  if (error && error.details.includes(`0 rows`)) {
    const { data, error } = await supabase
      .from(`views`)
      .insert({ slug, count: 1 }, { count: `planned` })
      .returns()
      .single();
    return (data as unknown as { count: number })?.count ?? 0;
  }
  return views?.count ?? 0;
};

const registerView = async (slug: string): Promise<void> => {
  await supabase.rpc("increment", {
    slug_text: slug,
  });
};

export { getViews, registerView };
