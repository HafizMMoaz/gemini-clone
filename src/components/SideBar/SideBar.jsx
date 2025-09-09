import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const SideBar = () => {

    const [extended, setExtended] = useState(false);
    const { history, loadFromHistory, newChat } = useContext(Context);

    return (
        <>
            <div className="sidebar" style={{ width: extended && '250px' }}>
                <div className="top">
                    <img className="menu" src={assets.menu_icon} alt="" onClick={() => setExtended(prev => !prev)} />
                    <div className="new-chat" onClick={newChat}>
                        <img src={assets.plus_icon} alt="" />
                        {extended && <p>New Chat</p>}
                    </div>
                    {extended &&
                        <div className="recent">
                            <p className="recent-title">Recent</p>
                            {history.slice().reverse().map((item, index) => (
                                <div
                                    key={index}
                                    className="recent-entry"
                                    onClick={() => loadFromHistory(item)}
                                >
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.prompt.slice(0, 25)}</p>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className="bottom">
                    <div className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="" />
                        {extended && <p>Help</p>}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {extended && <p>History</p>}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.setting_icon} alt="" />
                        {extended && <p>Settings</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar