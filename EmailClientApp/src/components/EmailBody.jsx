import React from "react";
import { extractParagraphs } from "../utils/RemoveHtmlTags";
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatDate } from "../utils/DataFormatter";

const EmailBody = ({ email, onMarkFavorite, onSelect, activeEmail }) => {
  if (!email) return <div className="w-0 bg-yellow-200"></div>;

  return (
    <article
      className={` emailBody h-[100%] w-2/3 overflow-auto p-6  border-2 rounded-md bg-white flex items-start gap-4`}
    >
      <figure className="px-3 py-1 rounded-full bg-[#E54065] flex items-center justify-center text-white font-bold">
        {email.list.from.email.charAt(0).toUpperCase()}
      </figure>
      <div className="text-[#636363]">
        <header className="flex justify-between items-start">
          <h1 className="font-semibold text-xl">{email.list.subject}</h1>
          <button
            onClick={onMarkFavorite}
            className={`px-2  rounded-full bg-[#E54065] text-white text-sm ${
              email.favorite ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {email.favorite ? "Marked as Favorite" : "Mark as favorite"}
          </button>
        </header>
        <time className="mt-4 inline-block text-sm text-gray-500">{formatDate(email.list.date)}</time>
        {extractParagraphs(email.body).map((item, index) => (
          <p key={index} className="mt-5 text-sm">
            {item}
          </p>
        ))}
        <footer
          onClick={() => onSelect(null)}
          className="px-2  mt-5 text-xl bg-[#E1E4EA] rounded-md w-fit cursor-pointer"
        >
          <IoMdArrowRoundBack />
        </footer>
      </div>
    </article>
  );
};

export default EmailBody;
