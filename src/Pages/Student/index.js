import Navbar from '../../components/Navbar';
import Sidebar from '../../components/SideBar/Sidebar';
import React, { useState } from "react";
import '../Student/student.css'
import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import client from '../../configGQL';
import { gql } from '@apollo/client';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';


function Student() {
  const schoolsList = useSelector(state => state.schools.schoolsData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState([])
  const [studentsList, setStudentsList] = useState([])

  const handleViewClick = (record) => {
    setStudentProfile(record)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    client
      .query({
        query: gql`
        query getStudents ($queryParams: QueryFilterDto!){
          getStudents (queryParams : $queryParams){
            items{
              id
              email
              lastName
              firstName
              phoneNumber
              isOnboarded
              studentProfile{
                studentEducations{
                  schoolId
                  fromYear
                  toYear
                }
              }
            }
          }
        }
      `, variables: {
          queryParams: {
            limit: 99,
            page: 1
          }
        }
      })
      .then(result => setStudentsList(result.data.getStudents.items))
  }, [studentsList])


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span>{text ? text : "null"}</span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span>{text ? text : "null"}</span>
      )
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text) => (
        <span>{text ? text : "null"}</span>
      )
    },
    {
      title: 'OnBoarding',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => (
        record.tags
          ? <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
          : <CloseCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#eb2f96" />
      ),
    },
    {
      title: 'View profile',
      key: 'viewmore',
      render: (record) => (
        <Button
          type="primary"
          onClick={() => handleViewClick(record)}
        >
          View
        </Button>
      ),
    }
  ];
  const data = studentsList.map((data) => ({
    id: data.id,
    name: data.lastName + ' ' + data.firstName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    tags: data.isOnboarded,
    array: data.studentProfile
  }))

  return (
    <div className="AppGlass">
      <Navbar />
      <div className='App_container'>
        <Sidebar />
        <div className='App_content'>
          <h1>Students</h1>
          <Table columns={columns} dataSource={data} className='table_id'/>
        </div>
      </div>
      <Modal
        className='request_modal'
        closable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Button onClick={() => handleCancel()}>Cancel</Button>
        }
      >
        {studentProfile && (
          <>
            <div className='request_step'>
              <div className='request_name'>
                <h2 className='request_title2'><i className='bx bxs-label' ></i>Educations</h2>
              </div>
              <div className='request_schools'>
                {studentProfile.array?.studentEducations.map(data => {
                  const sch = schoolsList?.find(sch => sch.id === data.schoolId)
                  const isofromYear = data.fromYear;
                  const isotoYear = data.toYear;
                  const sfromYear = new Date(isofromYear);
                  const stoYear = new Date(isotoYear);
                  const dayFrom = sfromYear.getDate();
                  const monthFrom = sfromYear.getMonth() + 1;
                  const yearFrom = sfromYear.getFullYear();
                  const dayTo = stoYear.getDate();
                  const monthTo = stoYear.getMonth() + 1;
                  const yearTo = stoYear.getFullYear();
                  return (
                    <>
                      <div className='request_child'>
                        <h2 className='request_title1'>Schools: </h2>
                        <h2 className='request_content'>{sch.name}</h2>
                      </div>
                      <div className='request_child'>
                        <h2 className='request_title1'>From: </h2>
                        <h2 className='request_content'>{dayFrom}/{monthFrom}/{yearFrom}</h2>
                      </div>
                      <div className='request_child'>
                        <h2 className='request_title1'>To: </h2>
                        <h2 className='request_content'>{dayTo}/{monthTo}/{yearTo}</h2>
                      </div>
                    </>
                  )
                })}
              </div>

            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Student;