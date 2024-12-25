import React from "react";
import { formatDate } from "../utils/DataFormatter";

const EmailList = ({ emails, onSelect, activeEmail ,setPage,Pages,currentPage }) => {
  return (
    <section
      className={`emailList overflow-auto flex flex-col gap-5 ${
        activeEmail ? "w-1/3" : "w-full"
      } `}
    >
      {emails.map((email) => (
        <div
          key={email.id}
          className={`px-4 py-2 border-b cursor-pointer border-2 rounded-md ${
            email.read ? "bg-gray-100" : "bg-white"
          } ${activeEmail === email.id ? "bg-blue-100" : ""}`}
          onClick={() => onSelect(email.id)}
        >
          <article className="flex items-start text-[#636363]">
            <figure className="px-3 py-1 rounded-full bg-[#E54065] flex items-center justify-center text-white font-bold">
              {email.from.name.charAt(0).toUpperCase()}
            </figure>
            <section className="ml-4 text-sm  text-[#636363]">
              <h2 className="">
                {" "}
                From: <span className="font-semibold">{email.from.email}</span>
              </h2>
              <h3>
                {" "}
                Subject:{" "}
                <span className="text-sm font-semibold">{email.subject}</span>
              </h3>
              <p className="mt-3">
                {" "}
                {activeEmail
                  ? `${email.short_description.substring(0, 45)}...`
                  : email.short_description}
              </p>
              <p className="text-xs mt-1 text-gray-400">
                {formatDate(email.date)}
              </p>
            </section>
          </article>
        </div>
      ))}
      <footer className="flex gap-10 items-center">
        {Pages.map((item,index)=>{
          return (
            <button
              key={index}
              onClick={()=>setPage(item)}
              className={`border-2 border-[#CFD2DC] px-2 rounded-md ${item === currentPage? 'bg-blue-400 text-white' : 'text-gray-600'}`}
            >
              {item}
            </button>
          )
        })}
      </footer>
    </section>
  );
};

export default EmailList;
