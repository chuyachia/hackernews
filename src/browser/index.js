import App from "../shared/App";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {render} from "react-dom";

render(<BrowserRouter>
            <App/>
        </BrowserRouter>,
    document.getElementById("root")
    );
