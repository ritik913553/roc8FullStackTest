import React, { useEffect, useState } from "react";
import { fetchEmails, fetchEmailBody } from "../services/apiService";
import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import FilterBar from "../components/FilterBar";

const EmailView = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [emailBody, setEmailBody] = useState(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Load emails from localStorage or fetch from API
  useEffect(() => {
    const storedEmails = localStorage.getItem(`emails${page}`);
    if (storedEmails) {
      setEmails(JSON.parse(storedEmails));
    } else {
      fetchEmails(page).then((response) => {
        const emailList = response.data.list.map((email) => ({
          ...email,
          read: false,
          favorite: false,
        }));
        setEmails(emailList);
        localStorage.setItem(`emails${page}`, JSON.stringify(emailList));
      });
    }
  }, [page]);

  // Save updated emails to localStorage whenever emails state changes
  useEffect(() => {
    if (emails.length > 0) {
      localStorage.setItem(`emails${page}`, JSON.stringify(emails));
    }
  }, [emails]);


  const handleSelectEmail = (id) => {
    setSelectedEmailId(id);
    // Mark email as read
    if (id !== null) {
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === id ? { ...email, read: true } : email
        )
      );

      // Fetch and display email body
      fetchEmailBody(id).then((response) =>
        setEmailBody({
          ...response.data,
          favorite: emails.find((email) => email.id === id)?.favorite || false,
          list: emails.find((list) => list.id === response.data.id),
        })
      );
    }
    else{
      setEmailBody(null);
    }
  };

  const handleMarkFavorite = () => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === selectedEmailId ? { ...email, favorite: true } : email
      )
    );

    setEmailBody((prev) => ({ ...prev, favorite: true }));
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "All") return true;
    if (filter === "Favorites") return email.favorite;
    if (filter === "Read") return email.read;
    if (filter === "Unread") return !email.read;
    return true;
  });

  return (
    <div className="h-screen w-full flex flex-col bg-[#f4f5f9] px-10 py-5 gap-3 overflow-y-hidden">
      <FilterBar
        filters={["All", "Favorites", "Read", "Unread"]}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <div className={`flex ${selectedEmailId ? 'gap-5' : 'w-full'} overflow-hidden `}>
        <EmailList
          emails={filteredEmails}
          onSelect={handleSelectEmail}
          activeEmail={selectedEmailId}
          setPage={setPage}
          currentPage={page}
          Pages={[1,2]}
        />
        { selectedEmailId &&
          <EmailBody
          email={emailBody}
          onMarkFavorite={handleMarkFavorite}
          onSelect={handleSelectEmail}
          activeEmail={selectedEmailId}
         
        />
        }
      </div>
    </div>
  );
};

export default EmailView;
