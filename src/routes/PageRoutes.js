import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeRoute from "./Home/HomeRoute";
import Callback from "./Callback";
import NotFound from './Error/NotFoundRoute'

  
export default function PageRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeRoute/>}/>
                <Route path="callback" element={<Callback/>} />
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}
