import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Hello, I'm Chad. I'm a web developer and a city planning enthusiast.</p>
          <p>
            If you want, take a look at{' '}
            <Link href="/posts/first-post">
              <a>my first post</a>
            </Link>
            .
          </p>
          <p>
            (this is a sample website - you'll be building a site like this on {' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
          </p>
        </section>
    </Layout>
  )
}
