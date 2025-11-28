import { Routes, Route } from "react-router-dom";
import CognitiveRouter from "./cognitive/CognitiveRouter";
import HomePage from "./homepage/HomePage";

export default function Roads() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cognitivo/*" element={<CognitiveRouter />} />
        </Routes>
    );
}
