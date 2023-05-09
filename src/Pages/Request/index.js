import Sidebar from '../../components/SideBar/Sidebar';
import Navbar from '../../components/Navbar';
import React, { useState } from "react";
import { Button, Space, Table, Modal } from 'antd';
import './request.css'
import { useEffect } from 'react';
import client from "../../configGQL"
import { gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../Redux/feat/notificationSlice';

function RequestTutor() {
    const dispatch = useDispatch()
    const schoolsList = useSelector(state => state.schools.schoolsData)
    const [isReload, setIsReload] = useState(true)
    const [tutorList, setTutorList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tutorProfile, setTutorProfile] = useState([])
    
    const CONFIRM_TUTOR = gql`
    mutation confirmTutorProfile($input: ConfirmTutorProfileDto!) {
        confirmTutorProfile(input: $input) {
            message
            success
        }
    }
    `;
    const [confirmTutor] = useMutation(CONFIRM_TUTOR);

    useEffect(() => {
        client
            .query({
                query: gql`
                query getTutors($queryParams: QueryFilterDto!){
                    getTutors(queryParams: $queryParams){
                        items{
                            id
                            lastName
                            firstName
                            email
                            phoneNumber
                            tutorProfile{
                                id
                                isStripeVerified
                                status
                                educations{
                                    schoolId
                                    scoreUrl
                                    fromYear
                                    toYear
                                }
                                experiences{
                                    organization
                                    position
                                    startTime
                                    endTime
                                    description
                                }
                                certifications{
                                    organization
                                    score
                                    awardUrl
                                }
                            }
                        }
                    }
                }`, variables: {
                    queryParams: {
                        page: 1,
                        limit: 99,
                        filters: [
                            {
                                field: "TutorProfile.isStripeVerified",
                                operator: "eq",
                                data: "true"
                            },
                            {
                                field: "TutorProfile.status",
                                operator: "eq",
                                data: "pending"
                            }
                        ]
                    }
                }
            })
            .then(result => {
                setTutorList(result.data.getTutors.items)
            })
    }, [tutorList, isReload]);



    const handleViewClick = (record) => {
        setTutorProfile(record)
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleApprove = (record) => {
        const data = {
            tutorProfileId: record.tutorProfileId,
            isApproved: true
        }

        const getData = async () => {
            try {
                const result = await confirmTutor({
                    variables: {
                        input: data,
                    },
                });

                dispatch(setError({ message: result.data.confirmTutorProfile.message }));
                client.clearStore()
                setIsReload(prevState => ({
                    isReload: !prevState.isReload
                }))
            } catch (error) {
                dispatch(setError({ message: error.message }));
            }
        };
        getData();
    }
    const handleReject = (record) => {
        const data = {
            tutorProfileId: record.tutorProfileId,
            isApproved: false
        }

        const getData = async () => {
            try {
                const result = await confirmTutor({
                    variables: {
                        input: data,
                    },
                });
                dispatch(setError({ message: result.data.confirmTutorProfile.message }));
                client.clearStore()
                setIsReload(prevState => ({
                    isReload: !prevState.isReload
                }))
            } catch (error) {
                dispatch(setError({ message: error.message }));
            }
        };
        getData();
    }

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
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text) => (
                <span>{text ? text : "null"}</span>
            )
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button
                        type='primary'
                        className='request_approve'
                        onClick={() => handleApprove(record)}
                    >
                        Approve
                    </Button>
                    <Button
                        type='default'
                        className='request_reject'
                        onClick={() => handleReject(record)}
                    >
                        Reject
                    </Button>
                </Space>
            ),
        },
    ];

    const data = tutorList.map(data => ({
        id: data.id,
        name: data.lastName + ' ' + data.firstName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        array: data.tutorProfile,
        tutorProfileId: data.tutorProfile?.id
    }))


    return (
        <div className="AppGlass">
            <Navbar />
            <div className='App_container'>
                <Sidebar />
                <div className='App_content'>
                    <h1>Tutor Request</h1>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            defaultPageSize: 10, // Số lượng hàng trên mỗi trang mặc định
                        }}
                    />
                </div>
            </div>
            <Modal
                className='request_modal'
                open={isModalOpen}
                onCancel={handleCancel}
                footer={
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                }
            >
                {tutorProfile && (
                    <>
                        <div className='request_step'>
                            <div className='request_name'>
                                <h2 className='request_title2'><i className='bx bxs-label' ></i>Educations </h2>
                            </div>
                            <div className='request_schools'>
                                {tutorProfile.array?.educations.map(data => {
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
                                                <p>{sch.name}</p>

                                            </div>
                                            <span className='request_span'>From: {dayFrom}/{monthFrom}/{yearFrom}</span>
                                            <span className='request_span'>To: {dayTo}/{monthTo}/{yearTo}</span>
                                            <div className='request_img'>
                                                <img src={data.scoreUrl} alt="" className='request_images' />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='request_step'>
                            <div className='request_experience'>
                                <h2 className='request_title2'><i className='bx bxs-label' ></i>Experience </h2>
                                {tutorProfile.array?.experiences.map(data => {
                                    const isofromYear = data.startTime;
                                    const isotoYear = data.endTime;
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
                                                <h2 className='request_title1'>Organization Name: </h2>
                                                <p className='request_content'>{data.organization}</p>
                                            </div>
                                            <div className='request_child'>
                                                <h2 className='request_title1'>Position: </h2>
                                                <p className='request_content'>{data.position}</p>
                                            </div>
                                            <span className='request_span'>From: {dayFrom}/{monthFrom}/{yearFrom}</span>
                                            <span className='request_span'>To: {dayTo}/{monthTo}/{yearTo}</span>
                                            <div className='request_child'>
                                                <h2 className='request_title1'>Description: </h2>
                                                <p className='request_content'>{data.description}</p>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='request_step'>
                            <div className='request_certifications'>
                                <h2 className='request_title2'><i className='bx bxs-label' ></i>Certifications </h2>
                                {tutorProfile.array?.certifications.map(data => {
                                    return (
                                        <>
                                            <div className='request_child'>
                                                <h2 className='request_title1'>Organization Name: </h2>
                                                <p className='request_content'>{data.organization}</p>
                                            </div>
                                            <div className='request_child'>
                                                <h2 className='request_title1'>Certification Name: </h2>
                                                <p className='request_content'>{data.name}</p>
                                            </div>
                                            <div className='request_child'>
                                                <h2 className='request_title1'>Score: </h2>
                                                <p className='request_content'>{data.score}</p>
                                            </div>
                                            <div className='request_img'>
                                                <img src={data.awardUrl} alt="" className='request_images' />
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

export default RequestTutor;