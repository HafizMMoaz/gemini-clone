import { createContext, useState } from "react";
import main from "../config/gemini.js";
import marked from "../config/marked.js";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState();
    const [history, setHistory] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [formattedHtml, setFormattedHtml] = useState("");

    const delayPara = (index, nextChar) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextChar);
        }, 15 * index); // Faster typing
    };

    const loadFromHistory = (item) => {
        setRecentPrompt(item.prompt);
        setResultData(""); // Reset animated output
        setFormattedHtml(item.response);
        setShowResult(true);
    };

    const newChat = () => {
        setInput("");
        setRecentPrompt("");
        setResultData("");
        setFormattedHtml("");
        setShowResult(false);
        setLoading(false);
    }

    const onSent = async () => {
        setResultData("");
        setFormattedHtml("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);

        const res = await main(input);

        const plainText = res.replace(/[`*_#>\[\]\(\)]/g, "");
        for (let i = 0; i < plainText.length; i++) {
            delayPara(i, plainText[i]);
        }

        const html = marked(res);
        console.log(html);

        setTimeout(() => {
            setFormattedHtml(html);
            setLoading(false);
            setInput("");
            setHistory(prev => [...prev, { prompt: input, response: html }]);
        }, 15 * plainText.length + 300);
    };

    const contextValue = {
        input,
        setInput,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        formattedHtml,
        history,
        loadFromHistory,
        newChat
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;