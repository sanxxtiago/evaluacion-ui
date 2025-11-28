import { Routes, Route } from "react-router-dom";
import CognitiveRouter from "./cognitive/CognitiveRouter";


export default function Roads() {
    return (
        <Routes>
            <Route path="/cognitivo/*" element={<CognitiveRouter />} />
        </Routes>
    );
}
