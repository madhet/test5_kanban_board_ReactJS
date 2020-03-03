import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import Kanban from './components/Kanban';
import Message from './components/Message';
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './main.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-react">
        {/* <div>Kanban</div> */}
        <Message />
        <Kanban />
      </div>
    </Provider>
  );
}

export default App;