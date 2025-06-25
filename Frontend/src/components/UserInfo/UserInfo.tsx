import './UserInfo.css';
import AppHeading from '../UI/AppHeading/AppHeading';
import AppSpan from '../UI/AppSpan/AppSpan';


type UserInfoProps = {
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
        <>
            <div className="userinfowrapper">
                <div className="username">
                    <AppHeading level={1} children={`Welcome ${username}!`} />
                    <AppSpan children="What is on due today?" />
                    <div className="userRole">{userRole}</div>
                </div>
                <div className="userphone">
                    <AppHeading level={2} children={"User phone number:"} />
                    <AppSpan children={`${phoneNumber}`} />
                </div>
            </div>
        </>
    )
}

export default UserInfo;