import "./index.css";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const CourseComponent = ({course}) => {
  const schoolsList = useSelector((state) => state.schools.schoolsData);
  const { firstName, lastName, avatarUrl } = course.tutorProfile.tutor;
  const tutorEducations = course.tutorProfile.educations;
  const tutorExperiences = course.tutorProfile.experiences;
  const tutorCertifications = course.tutorProfile.certifications;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="course_box">
      <div className="course_thumnail">
        <img src={course.imageUrl} alt="" className="course_image" />
      </div>
      <div className="course_box_content">
        <h3 className="course_box_content_title">{course.name}</h3>
        <div className="course_author">
          <div className="course_author_image">
            <img
              src={course.tutorProfile.tutor.avatarUrl}
              alt=""
              onClick={showModal}
            />
          </div>
          <h4
            onClick={showModal}
            className="course_author_info"
          >{`${firstName} ${lastName}`}</h4>
        </div>

        <div className="course_box_content_des">
          <p>{course.description}</p>
          <h3 h3 className="dollar-h3">
            {course.price}
            <i className="bx bx-dollar"></i>
          </h3>
        </div>
        <Link
          to={
            `/courses/${course.id}`
          }
          className="inline-btn"
        >
          See detail
        </Link>
        <Modal
          closable={false}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={<Button onClick={handleCancel}>Cancel</Button>}
        >
          <div className="information_tutor">
            <div className="infor_title1">
              <img src={avatarUrl} alt="" className="infor_avt1"></img>
              <h2>
                {firstName} {lastName}
              </h2>
            </div>
            <div className="infor_schools">
              <h2 className="infor_content">Schools: </h2>
              {tutorEducations?.map((data) => {
                const sch = schoolsList?.find(
                  (sch) => sch.id === data.schoolId
                );
                return <span>{sch.name}</span>;
              })}
            </div>
            {tutorExperiences?.length !== 0 ? (
              <h3 className="request_title2">
                <i className="bx bxs-label"></i>Experiences :
              </h3>
            ) : null}
            {tutorExperiences?.map((data) => {
              return (
                <>
                  <div className="infor_experience">
                    <div className="infor_company">
                      <h2 className="infor_content bottom">
                        Organization Name:{" "}
                      </h2>
                      <p>{data.organization}</p>
                    </div>
                    <div className="infor_company">
                      <h2 className="infor_content">Position: </h2>
                      <p>{data.position}</p>
                    </div>
                    <div className="infor_company">
                      <h2 className="infor_content">Description: </h2>
                      <p>{data.description}</p>
                    </div>
                  </div>
                </>
              );
            })}
            {tutorCertifications?.length !== 0 ? (
              <h3 className="request_title2">
                <i className="bx bxs-label"></i>Certifications:  
              </h3>
            ) : null}
            {tutorCertifications?.map((data) => {
              return (
                <>
                  <div className="infor_experience">
                    <div className="infor_company">
                      <h2 className="infor_content bottom">
                        Organization Name: 
                      </h2>
                      <p>{data.name}</p>
                    </div>
                    <div className="infor_company">
                      <h2 className="infor_content">Score: </h2>
                      <p>{data.score}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CourseComponent;
