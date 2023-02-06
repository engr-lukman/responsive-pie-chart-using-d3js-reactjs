import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { APP_NAME } from 'utils/AppConstant';
import Feature from 'features';

function App() {
  return (
    <>
      <div className="flex items-stretch h-screen overflow-hidden bg-white">
        <div className="w-full h-screen overflow-hidden bg-gray-300">
          <main className="flex-1 app-content h-screen overflow-auto bg-gray-100 text-black text-sm">
            <header className="flex w-full h-[10vh] justify-center items-center bg-gray-300 px-10 text-lg font-bold">
              {APP_NAME}
            </header>
            <div className="flex w-full h-[85vh] justify-center items-start bg-gray-200">
              <div className="w-[90vw] h-[85vh] overflow-hidden bg-gray-100">
                <Feature />
              </div>
            </div>
            <footer className="flex w-full h-[5vh] justify-center items-center bg-gray-300 px-10">
              {new Date().getFullYear()} &copy; {APP_NAME}
            </footer>
            <ToastContainer />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
