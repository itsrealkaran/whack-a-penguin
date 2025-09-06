import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";
import GlobalStyle from "./styles/global";
import store from "./store";
import { Provider } from "react-redux";
import { StacksProvider } from "./contexts/StacksContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/leaderboard",
      element: <Leaderboard />,
    },
  ]);

  return (
    <StacksProvider>
      <Provider store={store}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Provider>
    </StacksProvider>
  );
}

export default App;
