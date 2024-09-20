import { useState, useEffect } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import Card from "./Card";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <header className="flex justify-between border-b-2 border-grey p-4">
        <div className="flex gap-6 items-center text-sweetblue font-bold">
          <span className="font-extrabold text-3xl align-self">Sheen</span>
          <nav className="md:flex gap-4 text-sweetblue font-bold hidden">
            <a href="">Contact</a>
            <a href="">About</a>
          </nav>
        </div>
        <div className="flex gap-6 items-center ">
          <div className="md:flex gap-6 text-sweetblue font-bold hidden">
            <a href="">For Admins</a>
            <a href="">Take a quiz</a>
          </div>
          <div className="md:flex gap-6 hidden">
            <a
              href="/home"
              className="border-2 border-sweetblue rounded-md font-bold text-sm py-1 px-2 text-sweetblue"
            >
              Home
            </a>
            <a
              href="/login"
              className="border-2 border-sweetblue rounded-md font-bold text-sm py-1 px-2 text-sweetblue"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-sweetblue text-blue-50 text-sm rounded-md font-bold py-1 px-2"
            >
              Sign Up
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNavBar}>
              {isOpen ? (
                <AiOutlineClose size="32" />
              ) : (
                <FaBarsStaggered size="32" />
              )}
            </button>
          </div>
        </div>
        {/* {isOpen && (
          <div className="flex flex-col">
            <NavLinks />
          </div>
        )} */}
      </header>

      <section className="rounded-2xl mx-auto w-5/6 flex gap-6 items-center flex-col my-10 bg-blue-50 py-20">
        <div>
          <p className="text-5xl text-sweetblue font-extrabold max-w-lg text-center">
            Take the next step in your educational journey.
          </p>
        </div>

        <div className="border-4 border-blue-200 rounded flex justify-around">
          <input
            className="p-3 w-96 mx-1 "
            type="text"
            name=""
            id=""
            placeholder="Search Job"
          />
          <button
            className="p-3 text-blue-50 font-bold bg-sweetblue"
            type="submit"
          >
            Search Job
          </button>
        </div>
      </section>

      <section className="flex flex-col w-5/6 mx-auto gap-10">
        <div>
          <h1 className="text-2xl font-bold text-sweetblue ">Recent Courses</h1>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {posts.map((card) => {
            return <Card key={card.id} card={card} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
