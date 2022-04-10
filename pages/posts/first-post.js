import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

const title = 'Hello World'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            <p>My name is Chad and I am making a website!</p>
        </Layout>
    )
}