import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

export const NotificationComponent = ({ error }) => {
  return (
    <div id="notification-box">
      <div className="notification-icon">
        <CloseCircleOutlined className="notify-icon" />
      </div>
      <div className="notification-content">
        <p>{error.message}😊</p>
      </div>
    </div>
  );
};
export default NotificationComponent;
