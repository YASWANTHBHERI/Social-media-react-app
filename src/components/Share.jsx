import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaRedditAlien,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CopyToClipBoard } from "./CopyToClipBoard";

// eslint-disable-next-line react/prop-types
export const Share = ({ handleClose,copyUrl }) => {
  const socialLinks = [
    {
      id: 1,
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://facebook.com",
      bg: "bg-blue-600",
    },
    {
      id: 2,
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com",
      bg: "bg-blue-400",
    },
    {
      id: 3,
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com",
      bg: "bg-pink-500",
    },
    {
      id: 4,
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://linkedin.com",
      bg: "bg-blue-700",
    },
    {
      id: 5,
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: "https://whatsapp.com",
      bg: "bg-green-500",
    },
    {
      id: 6,
      name: "Reddit",
      icon: <FaRedditAlien />,
      url: "https://reddit.com",
      bg: "bg-orange-500",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <FaArrowLeftLong
          className="relative cursor-pointer self-start"
          onClick={handleClose}
        />
        <div className="grid grid-cols-3 gap-4 p-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 ${link.bg} text-white rounded-full hover:scale-110 transition-transform`}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <CopyToClipBoard copyUrl={copyUrl}/>
      </div>
    </div>
  );
};


