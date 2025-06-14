import React, { useEffect, useState } from "react";

const Whatsapp = () => {
  const [showObject, setShowObject] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const triggerHeight = 200; // Altura de desencadenamiento en píxeles

      if (scrollPosition > triggerHeight) {
        setShowObject(true);
      } else {
        setShowObject(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" whatsapp ">
      {showObject && (
        <div>
          <a className="" href="http://wa.me/+584245116397">
            <img
              className="  "
              src="/images/whatsapp.png"
              alt=""
              style={{ maxWidth: "6vh" }}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;
