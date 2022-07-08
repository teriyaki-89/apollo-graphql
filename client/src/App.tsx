import React from "react";
import logo from "./logo.svg";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import DisplayData from "./components/DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
      ;
    </ApolloProvider>
  );
}

export default App;
