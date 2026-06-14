import { BackendLoader } from "../components/system/BackendLoader";
import { AppProviders } from "./providers";
import { AppRouter } from "./router";

function App() {
  return (
    <AppProviders>
      <BackendLoader>
        <AppRouter />
      </BackendLoader>
    </AppProviders>
  );
}

export default App;
