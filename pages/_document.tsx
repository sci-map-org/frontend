import Document, { Html, Head, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    resetServerContext(); // necessary for dnd to work
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
