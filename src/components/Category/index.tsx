import { ReactElement } from "react";

interface ICategory {
  category: string;
}

function Category({ category }: ICategory): ReactElement {
  return (
    <div className="dark:bg-deep-blush-602 text-white-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-deep-blush-400 dark:text-blue-300">
      <p>{category}</p>
    </div>
  );
}

export default Category;
