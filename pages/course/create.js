
import { getSession } from "next-auth/react";
import NewCourse from "../../components/course/new-course";
import Layout from "../../components/Layout";

export default function Create(props) {
    return (
        <Layout>
        <div>
            <h1>Create Course</h1>
            <main>
                <NewCourse authorId={props.authorId} />
            </main>
        </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            authorId: session.id,
        }
    }
}