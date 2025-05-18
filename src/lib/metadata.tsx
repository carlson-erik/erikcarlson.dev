export const getPageMetadata = (pageName: string) => {
  const title = `${pageName} | Erik Carlson`;
  return (
    <>
      <title>{title}</title>
      <link
        rel="icon"
        href="favicon.ico"
        type="image/<generated>"
        sizes="<generated>"
      />
      <link
        rel="apple-touch-icon"
        href="apple-icon.png"
        type="image/<generated>"
        sizes="<generated>"
      />
    </>
  );
};
