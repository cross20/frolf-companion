import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import EditHole from "../../../../components/hole/edit-hole";
import Layout from "../../../../components/Layout";

export default function ChangeHole(props) {
    if (!props.authorId) {
        throw new Error('Holes must have an author ID');
    }

    const router = useRouter();
    const { name, holeName } = router.query;

    const [hole, setHole] = useState(null);

    useEffect(() => {
        fetch('../../../../api/find-course-by-name', {
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
            const course = data.course;

            fetch('../../../../api/find-hole-by-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: course.id,
                    name: holeName.replace('-', ' '),
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setHole(data.hole);
            });
        });
    }, []);

    const Content = () => {
        if (hole) {
            return (
                <EditHole holeId={hole.id} />
            )
        } else {
            return (
                <p>Loading...</p>
            )
        }
    }

    return (
        <Layout>
            <div>
                <h1>Update Hole</h1>
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