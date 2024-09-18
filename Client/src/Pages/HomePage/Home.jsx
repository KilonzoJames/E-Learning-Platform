import Sidebar from "./Sidebar";
import Header from "./Header";
import Intro from "./Intro";
import Profile from "./Profile";
import CommentForm from "./commentform";
import CommentList from "./commentlist";
import Logout from "./Logout";
import { useEffect, useState } from "react";

function Home() {
  const [comments, setComments] = useState([]);
  const [activeComponent, setActiveComponent] = useState("profile");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  function handleComment(newComment) {
    const updatedArray = [...comments, newComment];
    setComments(updatedArray);
  }
  const renderComponent = () => {
    switch (activeComponent) {
      case "intro":
        return <Intro/>;
      case "profile":
        return <Profile />;
      case "CommentForm":
        return <CommentForm handleComment={handleComment} />;
      case "CommentList":
        return <CommentList comments={comments} setComment={setComments} />;
        case "logout":
          return <Logout/>
    }
  };
  
  return (
    <div className="home">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="rightdiv flex flex-col h-screen">
        <Header />
        {renderComponent()} {/* Conditionally render component */}
      </div>
    </div>
  );
}

export default Home;
