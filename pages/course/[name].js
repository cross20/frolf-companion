import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import Holes from "../../components/hole/holes";

export default function Course() {
    const router = useRouter();
    const { name } = router.query;

    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (name) {
            fetch('../api/find-course-by-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setCourse(data.course);
            }); // todo: change request url so it's not dependent on location relative to api directory.
        }
    }, [name]);

    const Content = () => {
        if (course) {
            return (
                <>
                    <h1>{course.name}</h1>
                    <main>
                        <p>{course.description}</p>
                        <h2>Holes</h2>
                        <Holes courseId={course.id} />
                    </main>
                </>
            );
        } else {
            // todo: return standarized loading component once created.
            return (
                <p>Loading</p>
            );
        }
    }

    return (
        <Layout>
            <div>
                <Content />
            </div>
        </Layout>
    );
}