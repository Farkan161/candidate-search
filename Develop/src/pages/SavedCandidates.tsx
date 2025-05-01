import React, { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }

  return (
    <div>
      <h1>Potential candidates</h1>
      <ul>
        {savedCandidates.map((candidate, index) => (
          <li key={index}>
            <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="50" />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || "N/A"}</p>
            <p>Email: {candidate.email || "N/A"}</p>
            <p>Company: {candidate.company || "N/A"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;