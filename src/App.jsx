import React from "react";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routes from "./Routes";
import AIAssistantChat from './components/AIAssistantChat';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
        <AIAssistantChat />
      </div>
    </Provider>
  );
}

export default App;