import AuthWrapper from "../components/AuthWrapper";
import HeroBanner from "../components/Landing/HeroBanner";
import Services from "../components/Landing/Services";
import { useStateProvider } from "../context/StateContext";
import React from "react";

function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();

  return (
    <div>
      <HeroBanner />
      <Services />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
}

export default Index;
