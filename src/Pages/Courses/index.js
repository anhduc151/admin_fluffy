import '../Courses/courses.css'
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import CourseComponent from "../../components/Course";
import { useEffect, useState } from 'react';
import Pagination from "../../components/Pagnigation";
import client from '../../configGQL';
import { gql } from '@apollo/client';


const GET_COURSES = gql`
  query getCourses($params: QueryFilterDto!) {
    getCourses(query: $params) {
      items {
        id
        name
        imageUrl
        numberOfProgramRequired
        price
        description
        tutorProfile {
          tutor {
            firstName
            lastName
            avatarUrl
          }
          educations {
            schoolId
          }
          experiences {
            organization
            description
            position
          }
          certifications {
            name
            score
          }
        }
      }
      meta {
        totalPages
        currentPage
        itemCount
        totalItems
        itemsPerPage
      }
    }
  }
`;

function Courses() {
    const [courses, setCourses] = useState([]);
    const [params, setParams] = useState({
        limit: 9,
        page: 1,
    });
    const [meta, setMeta] = useState(null);


    useEffect(() => {
        const getCourse = async () => {
            const result = await client.query({
                query: GET_COURSES,
                variables: {
                    params,
                },
            });

            setCourses(result.data.getCourses.items);
            setMeta(result.data.getCourses.meta);
        };

        getCourse();
    }, [params]);

    return (
        <div className="AppGlass">
            <Navbar />
            <div className='App_container'>
                <Sidebar />
                <div className='App_content1'>
                    <h1>Courses</h1>
                    <div className="course-list-tutor">
                        <div className="student__box">
                            {courses &&
                                courses.map((course) => (
                                    <CourseComponent course={course} />
                                ))}
                        </div>
                        {meta && <Pagination meta={meta} setParams={setParams} />}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Courses;