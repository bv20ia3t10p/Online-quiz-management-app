import React, { useState } from "react";
import Email from "./Email";
import { AiOutlineMail } from "react-icons/ai";

const ContactSupport = ({ name, email }) => {
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  if (!isOpeningModal)
    return (
      <div
        className="open_email_support"
        onClick={() => setIsOpeningModal(true)}
      >
        <AiOutlineMail className="icon" />
      </div>
    );
  return (
    <div className="email_sp_modal">
      <Email name={name} email={email} setIsSendingEmail={setIsOpeningModal} />
    </div>
  );
};

export default ContactSupport;
