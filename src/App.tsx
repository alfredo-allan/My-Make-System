import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PropertyGrid from "./Components/ PropertyGrid/ PropertyGrid";
import StockRecord from "./Components/StockRecord/StockRecord";
import SalesBox from "./Components/SalesBox/SalesBox";
import Sales from "./Components/Sales/Sales";
import Report from "./Components/Report/Report";


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"PropertyGrid" | "StockRecord" | "SalesBox" | "Sales" | "Report" | "Help">("PropertyGrid");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onNavigate={(view) => setCurrentView(view)} />
      <main className="flex-grow-1 container mt-4">
        {currentView === "PropertyGrid" && <PropertyGrid onNavigate={(view) => setCurrentView(view)} />}
        {currentView === "StockRecord" && <StockRecord />}
        {currentView === "SalesBox" && <SalesBox />}
        {currentView === "Sales" && <Sales />}
        {currentView === "Report" && <Report />}

        {/* Outros componentes podem ser adicionados aqui conforme implementados */}
      </main>
      <Footer onNavigate={(view) => setCurrentView(view)} />
    </div>
  );
};

export default App;
