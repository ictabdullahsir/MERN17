import Header from "./components/Header";
import LoginCard from "./components/LoginCard";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <LoginCard />
      <Footer />
    </div>
  );
}

export default App;
