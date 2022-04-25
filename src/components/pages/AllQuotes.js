import QuoteList from "../quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";

const DUMMY_QUOTES = [
  {
    id: 1,
    author: "Supakit",
    text: "Learning React is super fun!",
  },
  {
    id: 2,
    author: "Supakit",
    text: "Learning React is super great!",
  },
];

const AllQuotes = () => {
  const { sendRequest, data, status} = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest])

  if(status === 'pending') {
      return (
          <div className='centered'>
              <LoadingSpinner/>
          </div>
      )
  } 

  if(status === 'completed' && (!data || data.length === 0)) {
      return <NoQuotesFound></NoQuotesFound>
  }

  return <QuoteList quotes={data}></QuoteList>;
};

export default AllQuotes;
