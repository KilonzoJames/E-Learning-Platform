import PropTypes from "prop-types";
function Card({ card }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-sweetblue dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tech Course
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {card.title}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {card.content}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {card?.created_at?.split("T")[0] || "N/A"}
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    altText: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
