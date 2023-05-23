import '../Chatbox/index.css';
import { Layout, List, Avatar, Input, Modal, Checkbox } from 'antd';
import { SendOutlined, UserAddOutlined, UsergroupAddOutlined, MessageOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react';
import { Upload } from 'antd';

const { Content } = Layout;

function Chatbox() {
    const conversations = [
        { id: 1, name: 'Nguyen', message: 'Hello', content: [{ text: 'hi', sender: 'Nguyen' }] },
        { id: 2, name: 'Tran', message: 'Hi there', content: [{ text: 'hi', sender: 'Tran' }] },
    ];

    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const conversationRef = useRef(null);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [groupModalVisible, setGroupModalVisible] = useState(false);

    const handleConversationClick = (id) => {
        const conversation = conversations.find((item) => item.id === id);
        setSelectedConversation(conversation);
        setCurrentUserId(id);
    };

    const handleSendMessage = () => {
        const newMessage = { text: messageInput, sender: 'You' };
        const updatedConversation = { ...selectedConversation, content: [...selectedConversation.content, newMessage] };
        setSelectedConversation(updatedConversation);
        setMessageInput('');
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const showUserModal = () => {
        setUserModalVisible(true);
    };

    const showGroupModal = () => {
        setGroupModalVisible(true);
    };

    const hideUserModal = () => {
        setUserModalVisible(false);
    };

    const hideGroupModal = () => {
        setGroupModalVisible(false);
    };

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [selectedConversation]);

    // modal add user

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        { id: 1, name: 'User 1', avatar: 'avatar1.jpg' },
        { id: 2, name: 'User 2', avatar: 'avatar2.jpg' },
    ];

    // form


    const [selectedUserNames, setSelectedUserNames] = useState([]);

    const handleChangeCheckbox = (userId, userName) => {
        setSelectedUsers(prevSelectedUsers => {
            const isSelected = prevSelectedUsers.includes(userId);
            let updatedSelectedUsers;

            if (isSelected) {
                updatedSelectedUsers = prevSelectedUsers.filter((id) => id !== userId);
            } else {
                updatedSelectedUsers = [...prevSelectedUsers, userId];
            }

            return updatedSelectedUsers;
        });

        setSelectedUserNames(prevSelectedUserNames => {
            const isSelected = prevSelectedUserNames.includes(userName);
            let updatedSelectedUserNames;

            if (isSelected) {
                updatedSelectedUserNames = prevSelectedUserNames.filter((name) => name !== userName);
            } else {
                updatedSelectedUserNames = [...prevSelectedUserNames, userName];
            }

            return updatedSelectedUserNames;
        });
    };
    return (
        <section id="content">
            <Layout className="message">
                <Content className="conversations-container">
                    <div className="messages_header">
                        <h1><MessageOutlined /> Messages</h1>
                        <UsergroupAddOutlined className="group" onClick={showGroupModal} />
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={conversations}
                        renderItem={(conversation) => (
                            <List.Item
                                onClick={() => handleConversationClick(conversation.id)}
                                className={selectedConversation && selectedConversation.id === conversation.id ? 'selected' : ''}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar>{conversation.name.charAt(0)}</Avatar>}
                                    title={conversation.name}
                                    description={conversation.message}
                                />
                            </List.Item>
                        )}
                    />
                </Content>
                <Content className="conversation-details-container">
                    {selectedConversation && (
                        <div className="conversation-details">
                            <div className="message-content" ref={conversationRef}>
                                <div className="messages-content-name1">
                                    <h2>{selectedConversation.name}</h2>
                                    <div className="messages-content-group">
                                        <UserAddOutlined className="group" onClick={showUserModal} />

                                    </div>
                                </div>
                                <div className="message-content-div">
                                    {selectedConversation.content.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message-content-p ${message.sender === 'You' ? 'right' : 'left'}`}
                                        >
                                            {message.sender !== 'You' && (
                                                <div className="avatar-container">
                                                    <Avatar>{message.sender.charAt(0)}</Avatar>
                                                </div>
                                            )}
                                            <span className="messages-content-span">{message.text}</span>
                                            {message.sender === 'You' && (
                                                <div className="avatar-container">
                                                    <Avatar>{conversations.find((item) => item.id === currentUserId).name.charAt(0)}</Avatar>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="message-input">
                                <Input
                                    rows={4}
                                    value={messageInput}
                                    onChange={handleInputChange}
                                    onPressEnter={handleSendMessage}
                                    suffix={<SendOutlined className="send-icon" onClick={handleSendMessage} />}
                                />
                            </div>
                        </div>
                    )}
                </Content>
            </Layout>
            <Modal title="Add User" visible={userModalVisible} onCancel={hideUserModal}>
                <div className="user">
                    <div className="user-checkboxes">
                        {users.map((user) => (
                            <div key={user.id} className="user-checkbox">
                                <Checkbox
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleChangeCheckbox(user.id, user.name)}
                                />
                                <Avatar src={user.avatar} />
                                <span>{user.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="selected-users">
                        <h4>Selected Users:</h4>
                        <ul>
                            {selectedUserNames.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Modal>
            <Modal title="Add Group" visible={groupModalVisible} onCancel={hideGroupModal} className="add_group">
                <div className="add_group_upload">
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                    <Input style={{ height: "2rem" }} placeholder="Please input group name!" />
                </div>

                <div className="user">
                    <div className="user-checkboxes">
                        {users.map((user) => (
                            <div key={user.id} className="user-checkbox">
                                <Checkbox
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleChangeCheckbox(user.id, user.name)}
                                />
                                <Avatar src={user.avatar} />
                                <span>{user.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="selected-users">
                        <h4>Selected Users:</h4>
                        <ul>
                            {selectedUserNames.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default Chatbox;