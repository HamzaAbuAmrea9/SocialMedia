import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function UserSearch() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cookie = new Cookie();
  const token = cookie.get("socialmedia");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/socialmedia/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, allUsers]);

  const handleSearch = (username) => {
    setSearchTerm(username);
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(username.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search for People you know"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
     
      {searchTerm && (
        <div className="search-results">
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <img src={`data:image/jpeg;base64,${user.profileImage}`} alt={user.username} />
              <p>{user.username}</p>
              <Link to={`/profile/${user.id}`} target="_blank">View Profile</Link>
            </div>
          ))}
        </div>
      )}

<FontAwesomeIcon
        icon={faMagnifyingGlass}
        onClick={() => handleSearch(searchTerm)}
        style={{marginLeft:"90px"}}
      />
    </div>
  );
}

export default UserSearch;
