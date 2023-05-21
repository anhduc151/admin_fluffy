import '../Session/session.css'
import Sidebar from '../../components/SideBar/Sidebar';
import Navbar from '../../components/Navbar';
import { Button, Space, Table, Modal } from 'antd';
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import client from "../../configGQL/index";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { setError } from '../../Redux/feat/notificationSlice';


const GET_BOOKED_SESSION = gql`
  query getBookedSessions($queryParams: QueryFilterDto!){
    getBookedSessions(queryParams: $queryParams){
      items{
        id
        price
        checkoutSessionId
        status
        data
        isTransfer
        course{
          name
        }
        tutor{
          lastName
          firstName
          email
        }
      }
    }
  }
`
const TRANSFER_TUTOR = gql`
  mutation transferToTutorAfterCompletedCourse($bookedSessionId: String!){
    transferToTutorAfterCompletedCourse(bookedSessionId: $bookedSessionId){
      success
      message
    }
  }
`

function Session() {
  const { confirm } = Modal;
  const dispatch = useDispatch()
  const [listBooked, setListBooked] = useState([])
  // console.log("🚀 ~ file: index.js:35 ~ Session ~ listBooked:", listBooked)
  useEffect(() => {
    client
      .query({
        query: GET_BOOKED_SESSION,
        variables: {
          queryParams: {
            page: 1,
            limit: 99,
          }
        }
      })
      .then(respon => setListBooked(respon.data.getBookedSessions.items))
      .catch(error => dispatch(setError({ message: error })))
  }, [listBooked]);
      

  const [transferTutor] = useMutation(TRANSFER_TUTOR);
  const handleCheckOut = (record) => {
    // console.log(record);
    // client
    //   .mutate({
    //     mutation: TRANSFER_TUTOR,
    //     variables: {
    //       bookedSessionId: record.id
    //     }
    //   })
    //   .then(repons => dispatch(setError({ message: repons.data.message })))
    //   .cacth(error => dispatch(setError({ message: error.message })))

    const getData = async () => {
      try {
        const result = await transferTutor({
          variables: {
            bookedSessionId: record.id
          },
        });
        dispatch(setError({ message: result.data.transferToTutorAfterCompletedCourse.message }));
      } catch (error) {
        dispatch(setError({ message: error.message }));
      }
    };
    getData();
  }


  const showPromiseConfirmTransfer = async (record) => {
    if (record.status === 'COMPLETED') {
      confirm({
        title: `Do you want transfer to tutor ?`,
        icon: <ExclamationCircleFilled />,
        onOk: () => handleCheckOut(record),
        onCancel() { },
      });
    } else
      confirm({
        title: `Course is not done yet!!`,
        icon: <ExclamationCircleFilled />,
        okButtonProps: { style: { display: 'none' } },
        onCancel() { },
      });
  };
  const columns = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor'
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (text) => {
        const truncatedText = `${text.substring(0, 40)}...`;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: 'checkoutId',
      dataIndex: 'checkoutId',
      key: 'checkoutId',
      render: (text) => {
        const truncatedText = `${text.substring(0, 20)}...`;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        const truncatedText = `${text} $`;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        if (record.status === 'COMPLETED') {
          if (text) {
            return (
              <Button
                type='primary'
                className='request_approve'
                disabled={true}
              >
                Transferred
              </Button>
            );
          } else {
            return (
              <Button
                type='primary'
                className='request_approve'
                onClick={() => showPromiseConfirmTransfer(record)}
              >
                Transfer
              </Button>
            );
          }
        } else {
          return (
            <Button
              type='primary'
              className='request_approve'
              disabled={true}
            >
              Transfer
            </Button>
          );
        }
      },
    },
  ];
  const data = listBooked.map(data => ({
    id: data.id,
    tutor: data.tutor.firstName + " " + data.tutor.lastName,
    course: data.course.name,
    checkoutId: data.checkoutSessionId,
    price: data.price,
    status: data.status,
    action: data.isTransfer,
  }))

  return (
    <>
      <div className="AppGlass">
        <Navbar />
        <div className='App_container'>
          <Sidebar />
          <div className='App_content'>
            <h1>Session</h1>
            <div className='payment_table'>
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Session;