import Layout from "../components/Layout";

export default function Home(props) {
  return (
    <Layout>
      <div className="page">
        <h1>Frisbee Golf</h1>
        <main>
          <p>This is a website to help you find Frisbee golf courses!</p>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
}