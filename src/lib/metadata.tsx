export const getPageMetadata = (pageName: string, description?: string) => {
  const title = `${pageName} | Erik Carlson`;
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
    </>
  );
};
