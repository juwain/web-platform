export const getBreadcrumbs = (
  parent: { url?: string; title: string },
  title: string
) => {
  return [
    parent,
    {
      title,
    },
  ];
};
