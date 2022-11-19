import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import NewHole from "../../../components/hole/new-hole";
import Layout from "../../../components/Layout";
import Course from "../../../components/course/course";

export default function Create(props) {
    if (!props.authorId) {
        throw new Error('Holes must have an author ID');
    }

    const router = useRouter();
    const { name } = router.query;

    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch('../../../api/find-course-by-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.replace('-', ' '),
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setCourse(data.course);
        }); // todo: change request url so it's not dependent on location relative to api directory. // todo: handle cases where name includes hyphen.
    }, []);

    const Content = () => {
        if (course) {
            return (
                <>
                    <p>Add a new hole to <Course name={course.name} />.</p>
                    <NewHole courseId={course.id} authorId={props.authorId}/>
                </>
            )
        } else {
            // todo: return standarized loading component once created.
            return (
                <p>Loading</p>
            )
        }
    }

    return (
        <Layout>
            <div>
                <h1>Create Hole</h1>
                <main>
                    <Content />
                </main>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            authorId: session.id,
        }
    }
}