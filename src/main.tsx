// main.tsx
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./app/store";
import { fetchUsers } from "./features/users/usersSlice";

store.dispatch(fetchUsers());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
