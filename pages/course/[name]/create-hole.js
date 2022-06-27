import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import NewHole from "../../../components/hole/new-hole";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

export default function Create(props) {
    if (!props.authorId) {
        throw new Error('Holes must have an author ID');
    }

    const router = useRouter();
    const { name } = router.query;
    
    // todo: retrieve course ID.
    // todo: set course attributes.

    const [course, setCourse] = useState({ id: 'Loading...'}); // todo: retrieve course.

    useEffect(() => {
        console.log('test');

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
            const newCourse = data.course;

            if (newCourse) {
                setCourse(data.course);
            } else {
                setCourse({ id: 'No course found'});
            }

            

            console.log('success');
        }); // todo: change request url so it's not dependent on location relative to api directory. // todo: handle cases where name includes hyphen.
    }, []);

    return (
        <Layout>
            <div>
                <h1>Create Hole</h1>
                <main>
                    <p>Course id: {course.id}</p>
                    <NewHole courseId={course.id} authorId={props.authorId}/>
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