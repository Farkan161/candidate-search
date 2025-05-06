import React, { useState, useEffect } from "react";
import { searchGithub } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      setCandidate(data);
    } catch (err) {
      setError("Failed to fetch candidate data.");
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
      savedCandidates.push(candidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    }
    fetchCandidate();
  };

  const skipCandidate = () => {
    fetchCandidate();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!candidate) return <p>No more candidates available.</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="100" />
        <h2>{candidate.name}</h2>
        <p>Username: {candidate.login}</p>
        <p>Location: {candidate.location || "N/A"}</p>
        <p>Email: {candidate.email || "N/A"}</p>
        <p>Company: {candidate.company || "N/A"}</p>
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
          GitHub Profile
        </a>
      </div>
      <button onClick={saveCandidate}>+</button>
      <button onClick={skipCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;