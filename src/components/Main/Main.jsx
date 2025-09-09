import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, formattedHtml } = useContext(Context)
    const [isListening, setIsListening] = useState(false);

    const handleMicClick = () => {
        if (!recognition || loading) return;

        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();
            setIsListening(true);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Transcription result:', transcript);
                setInput(transcript);
                setIsListening(false);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);

                if (event.error === 'no-speech') {
                    alert('No speech detected. Please try again.');
                } else if (event.error === 'not-allowed') {
                    alert('Microphone access denied. Please allow it in your browser settings.');
                } else {
                    alert(`Speech recognition error: ${event.error}`);
                }

                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };
        }
    };


    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readabilty of following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className="result">
                        <div className="result-title">
                            <p>{recentPrompt}</p>
                            <img src={assets.user_icon} alt="" />
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {
                                loading ? (
                                    resultData ? (
                                        <p>{resultData}</p> // Typing animation
                                    ) : (
                                        <div className="loader">
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                    )
                                ) : (
                                    formattedHtml && (
                                        <p dangerouslySetInnerHTML={{ __html: formattedHtml }} />
                                    )
                                )
                            }

                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            id='prompt-input'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Ask Gemini"
                            disabled={loading} // Disable when loading
                            className={loading ? "disabled-input" : ""}
                        />
                        <div>
                            {/* <img
                                src={assets.gallery_icon}
                                alt=""
                                style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto" }}
                            /> */}
                            <img
                                onClick={handleMicClick}
                                src={assets.mic_icon}
                                alt="Mic"
                                title={isListening ? "Stop Listening" : "Start Listening"}
                                style={{
                                    opacity: loading ? 0.5 : 1,
                                    pointerEvents: loading ? "none" : "auto",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    filter: isListening ? "drop-shadow(0 0 6px #0f0)" : "none"
                                }}
                            />

                            {isListening && <p className="mic-hint">🎤 Listening... speak now</p>}
                            {input &&
                                <img
                                    onClick={() => {
                                        if (!loading) onSent();
                                    }}
                                    src={assets.send_icon}
                                    alt=""
                                    style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto", cursor: loading ? "not-allowed" : "pointer" }}
                                />
                            }
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate or offensive information that doesn't represent Google.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main