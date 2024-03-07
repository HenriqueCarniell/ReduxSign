// Arquivo: store.tsx
import { createStore } from "redux";

import rootReducer from "./rootreducer";

const Store = createStore(rootReducer)

export default Store;
