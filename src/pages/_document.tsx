import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
/* ------------------ Theme ------------------ */
import { themeInitScript } from "@/theme/context";

/*
 * The HTML shell (<html>, <head>, <body>) around every page. It only runs on the
 * server (at build time for this static site), never in the browser, so it's where
 * anything that must already be in the HTML file goes. It has two jobs:
 *
 * 1. getInitialProps collects the styled-components CSS used while prerendering and
 *    adds it to <head>. Without it, pages would show unstyled until JavaScript loads.
 * 2. The inline <head> script sets <html data-theme> before the first paint, which
 *    picks the light or dark CSS variables (see @/theme/css-vars). Without it, every
 *    visitor would get the light theme and the OS dark-mode preference would be ignored.
 */
export default class SiteDocument extends Document {
  // Collects styled-components CSS during prerendering so it ships inside the static HTML.
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Must run before first paint so the correct theme shows immediately */}
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
