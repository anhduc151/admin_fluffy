import Sidebar from '../../components/SideBar/Sidebar';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from "react";
import { Button, Space, Table, Modal } from 'antd';
import './request.css'
import chungchi from '../../imgs/chungchi1.png'
import schoolscore from '../../imgs/schoolcrore.png'

function RequestTutor() {
    const [selected, setSelected] = useState(4);
    useEffect(() => {
        setSelected(4);
    }, []);

    // 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //   

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date of birth',
            dataIndex: 'dateofbirth',
            key: 'dateofbirth',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'View More',
            key: 'viewmore',
            dataIndex: 'viewmore',
            render: (text, record) => (
                <Button
                    type="primary"
                    className="view__payment"
                    onClick={showModal}
                >
                    View more
                </Button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' className='request_approve'>Approve</Button>
                    <Button type='default' className='request_reject'>Reject</Button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className="AppGlass">
            <Navbar />
            <div className='App_container'>
                <Sidebar />
                <div className='App_content'>
                    <h1>Tutor Request</h1>
                    <Table columns={columns} dataSource={data} />
                </div>

                <Modal className='request_modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className='request_step'>
                        <div className='request_name'>
                            <h2 className='request_title2'><i className='bx bxs-label' ></i>Information </h2>
                            <div className='request_child'>
                                <h2 className='request_title1'>Name: </h2>
                                <p className='request_content'>John Dang</p>
                            </div>
                        </div>


                        <div className='request_date'>
                            <div className='request_child'>
                                <h2 className='request_title1'>Date of birth: </h2>
                                <p className='request_content'>22/04/2001</p>
                            </div>
                        </div>

                        <div className='request_email'>
                            <div className='request_child'>
                                <h2 className='request_title1'>Email: </h2>
                                <p className='request_content'>john.nth@gmail.com</p>
                            </div>
                        </div>

                        <div className='request_schools'>
                            <div className='request_child'>
                                <h2 className='request_title1'>Schools: </h2>
                                <p className='request_content'>Duy Tan University</p>
                            </div>
                            <div className='request_img'>
                                <img src={schoolscore} alt="" className='request_images' />
                            </div>
                        </div>
                    </div>

                    <div className='request_step'>
                        <div className='request_experience'>
                            <h2 className='request_title2'><i className='bx bxs-label' ></i>Experience </h2>
                            <div className='request_child'>
                                <h2 className='request_title1'>Organization Name: </h2>
                                <p className='request_content'>Amazon</p>
                            </div>
                            <span className='request_span'>From: 22/04/2020 To: 19/02/2022</span>
                            <div className='request_child'>
                                <h2 className='request_title1'>Description: </h2>
                                <p className='request_content'>I promise this is the truth</p>
                            </div>
                        </div>
                    </div>

                    <div className='request_step'>
                        <div className='request_certifications'>
                            <h2 className='request_title2'><i className='bx bxs-label' ></i>Certifications </h2>
                            <div className='request_child'>
                                <h2 className='request_title1'>Organization Name: </h2>
                                <p className='request_content'>IELTS</p>
                            </div>
                            <div className='request_child'>
                                <h2 className='request_title1'>Certification Name: </h2>
                                <p className='request_content'>IELTS1</p>
                            </div>
                            <div className='request_child'>
                                <h2 className='request_title1'>Score: </h2>
                                <p className='request_content'>7.5</p>
                            </div>
                            <div className='request_img'>
                                <img src={chungchi} alt="" className='request_images' />
                            </div>
                        </div>
                    </div>

                </Modal>
            </div>

        </div>
    );
}

export default RequestTutor;