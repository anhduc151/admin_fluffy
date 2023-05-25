import "../Viewcourse/viewcourses.css"
import React, { useEffect, useState } from "react";
import { Button, Collapse, Modal, Radio, Rate } from "antd";
import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import client from "../../configGQL";
import { useDispatch } from "react-redux";
import { setError } from "../../Redux/feat/notificationSlice";
import "./viewcourses.css";
import { Link } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const QUERY_COURSE_DETAIL = gql`
  query getCourseById($courseId: String!) {
    getCourseById(courseId: $courseId) {
      id
      name
      price
      ratting
      imageUrl
      description
      sets {
        id
        isBooked
        name
        availableDates {
          setId
          date
          endTime
          startTime
        }
      }
      category {
        name
      }
      tutorProfile {
        tutorId
        tutor {
          lastName
          firstName
          avatarUrl
        }
      }
      coursePrograms {
        title
        description
        courseProgramPhases {
          name
          order
          overviewUrl
          content
        }
      }
    }
  }
`;



function Viewcourse() {
  const { Panel } = Collapse;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    link: null,
  });

  const [dateSet, setDateSet] = useState([]);
  const [nameSet, setNameSet] = useState()
  const disabledDate = () => true;






  useEffect(() => {
    client
      .query({
        query: QUERY_COURSE_DETAIL,
        variables: {
          courseId: id,
        },
      })
      .then((response) => {
        setCourseData(response.data.getCourseById);
      })
      .catch((error) => {
        dispatch(setError({ message: error.message }));
      });
  }, [id]);

  const showPromiseConfirm = async ({ title, id, name, handle }) => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled />,
      onOk: handle,
      onCancel() { },
    });
  };

  const handleUnPuLish = () => {

  }
  return (
    <>
      <div className="AppGlass">
        <Navbar />
        <div className='App_container'>
          <Sidebar />
          <div className='App_content1'>
            <section id="content">
              {modal.isOpen && (
                <Modal
                  title="Video Modal"
                  width="800px"
                  open={true}
                  footer={null}
                  onCancel={() => setModal({ isOpen: false })}
                >
                  <div className="video-container">
                    <iframe
                      title="YouTube video player"
                      src={modal.link}
                      width="100%"
                      height="100%"
                      allowFullScreen
                    />
                  </div>
                </Modal>
              )}

              <main>
                <div className="feedback__head-title">
                  <div className="feedback__left led1">
                    <h1>View Course</h1>
                  </div>
                </div>
                {courseData && (
                  <>
                    <div className="all__course1">
                      <div className="course_box1">
                        <div className="course_thumnail1">
                          <img src={courseData?.imageUrl} alt="" className="course_image1" />
                        </div>
                        <div className="course_box1_content1">
                          <h3 className="course_box1_content_title1">{courseData.name}</h3>
                          <Rate disabled defaultValue={courseData.ratting} />
                          <div className="course_author1">
                            <div className="course_author_image1">
                              <img src={courseData.tutorProfile.tutor.avatarUrl} alt="" />
                            </div>
                            <h4 className="course_author1_info1">{`${courseData.tutorProfile.tutor.firstName} ${courseData.tutorProfile.tutor.lastName}`}</h4>
                          </div>
                          <div className="course_box1_content_des1">
                            <p>{courseData.description}</p>
                          </div>
                          <h3 className="dollar-h3">
                            {courseData.price || 0}
                            <i className="bx bx-dollar"></i>
                          </h3>
                          <div className="all__button2">
                            <div className="courses_buynow">
                              <Button
                                className="inline-btn1"
                                onClick={() => {
                                  showPromiseConfirm({
                                    title: `Do you want unpulish ${courseData.name}!!`,
                                    handle: () => handleUnPuLish(),
                                  })
                                }}
                              >
                                Un Publish
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="view__content">
                      <div className="view__but212">
                        <h1 className="view__h2r">Course Program:</h1>
                      </div>
                      <Collapse>
                        {courseData.coursePrograms.map((el, index) => (
                          <Panel header={el.title} key={index}>
                            {el.courseProgramPhases.map((phase) => (
                              <p
                                className="introduction__view"
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    link: phase.overviewUrl,
                                  })
                                }
                              >
                                <i className="bx bxs-tv"></i>
                                {phase.name}
                                {/* <span className="span__view">09:28</span> */}
                                <span className="span__view">
                                  <Link>Preview</Link>
                                </span>
                              </p>
                            ))}
                          </Panel>
                        ))}
                      </Collapse>
                    </div>
                  </>
                )}
              </main>
            </section>
          </div>
        </div>

      </div>
    </>
  );
}

export default Viewcourse;
