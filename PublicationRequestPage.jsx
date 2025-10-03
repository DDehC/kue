import React, { useState } from "react";
import "../App.css";
import { publicationRequest } from "../api/req";
import "../styles/PublicationRequestPage.css";
import PublicationForm from "../components/PublicationForm.jsx";

export default function PublicationRequestPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [org, setOrg] = useState("");
  const [all, setAll] = useState(false);
  const [depts, setDepts] = useState([]);
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [_location, setLocation] = useState("");

async function onSubmit(e) {
  e.preventDefault();

  const payload = {
    title: title.trim(),
    author: author.trim(),
    organization: org.trim(),
    _location: _location.trim(),
    email: email.trim(),
    departments: all
      ? { type: "all_departments" }
      : { type: "departments", departments: depts },
    description: description.trim(),
    date: new Date().toISOString(),
  };

  try {
    const body = await publicationRequest(payload, files);
    console.log("publicationRequest returned →", body);

    const publication = body?.publication ?? body;
    console.log("publication →", publication);

    resetForm();
  } catch (err) {
    console.error("publicationRequest error:", err);
  }
}


function resetForm() {
    setTitle("");
    setDescription("");
    setAuthor("");
    setEmail("");
    setOrg("");
    setAll(false);
    setDepts([]);
    setFiles([]);
    setLocation("");
  }

  return (
    <main className="pr-container container">
      <div className="pr-card">
        <h1 className="pr-title">Publication Request</h1>
        <PublicationForm
          title={title} setTitle={setTitle}
          description={description} setDescription={setDescription}
          author={author} setAuthor={setAuthor}
          email={email} setEmail={setEmail}
          org={org} setOrg={setOrg}
          _location={_location} setLocation={setLocation}
          all={all} setAll={setAll}
          depts={depts} setDepts={setDepts}
          files={files} setFiles={setFiles}
          onSubmit={onSubmit}
          onReset={resetForm}
        />
      </div>
    </main>
  );
}
