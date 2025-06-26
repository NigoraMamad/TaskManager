import AppHeader from "../../components/AppHeader/AppHeader";
import UserInfo from "../../components/UserInfo/UserInfo";
import Board from "../../components/Dashboard/Board/Board";

const MainPage = () => {
    return (<>
        <AppHeader />
        <UserInfo />
        <main>
            <div style={{ padding: '22px calc(5.63vw - 1.12px)' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #ccc', display: 'flex', gap: '20px' }}>
                    <h2 style={{ fontSize: '24px', color: '#222', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Table view</h2>
                    <h1 style={{ fontSize: '24px', color: '#5f5fc4', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Board view</h1>
                </div>
                <Board />
            </div>
        </main>
    </>
    )
}

export default MainPage;