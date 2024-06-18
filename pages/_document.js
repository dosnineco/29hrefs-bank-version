import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

 
  render() {
    return (
      <Html lang="en">
          <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=code here`}
          />           
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'code hereY', {
                  page_path: window.location.pathname,
                });
            `,
            }}
          />
    
        </Head>     
        <body className='theme-dark-green'>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
