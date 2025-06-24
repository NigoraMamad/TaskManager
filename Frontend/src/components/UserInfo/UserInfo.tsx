import './UserInfo.css';

const UserInfo = () => {
    return (
        <>
            <div className="userinfowrapper">
                <div className="username">
                    <h1>Welcome Jane!</h1>
                    <span>What is on due today?</span>
                    <div className="userRole">Editor</div>
                </div>
                <div className="userphone">
                    <h2>User phone number:</h2>
                    <span>+9998 99 212 12 12</span>
                </div>

            </div>
        </>
    )
}

export default UserInfo;