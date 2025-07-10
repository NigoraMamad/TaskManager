import './UserInfo.css';
import AppHeading from '../UI/AppHeading/AppHeading';
import AppSpan from '../UI/AppSpan/AppSpan';


type UserInfoProps = {
  id:number;
  username?: string;
  userRole?: string;
  phoneNumber?: string;
};


const UserInfo: React.FC<UserInfoProps> = ({
  username = 'Jane',
  userRole = 'Editor',
  phoneNumber = '+9998 99 212 12 12',
}) => {
  return (
    <div className="userinfowrapper">
      <div className="username">
        <AppHeading level={1}>{`Welcome ${username}!`}</AppHeading>
        <AppSpan>What is on due today?</AppSpan>
        <div className="userRole">{userRole}</div>
      </div>
      <div className="userphone">
        <AppHeading level={2}>User phone number:</AppHeading>
        <AppSpan>{phoneNumber}</AppSpan>
      </div>
    </div>
  );
};

export default UserInfo;
