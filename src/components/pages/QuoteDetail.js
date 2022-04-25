import { Fragment, useEffect } from "react";
import { Route, useParams } from "react-router";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import { Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   {
//     id: 1,
//     author: "Supakit",
//     text: "Learning React is super fun!",
//   },
//   {
//     id: 2,
//     author: "Supakit",
//     text: "Learning React is super great!",
//   },
// ];

const QuoteDetail = () => {
  const { quoteID } = useParams();
  const route = useRouteMatch();

  const {
    sendRequest,
    data: quote,
    status,
    error,
  } = useHttp(getSingleQuote, true);

  //   const quote = DUMMY_QUOTES.find((quotes) => quotes.id === parseInt(quoteID));

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered">{error}</div>;
  }
  if (!quote) {
    return <p>No Quote Found</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote
        text={quote.text}
        author={quote.author}
      ></HighlightedQuote>
      <Route path={`${route.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${route.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${route.path}/comments`}>
        <Comments></Comments>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
