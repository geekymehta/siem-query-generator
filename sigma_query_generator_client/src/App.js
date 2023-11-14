import React, { useState, useEffect } from "react";
import useQueryGenerator from "./hooks/useQueryGenerator";
import FormComponent from "./components/FormComponent";
import LoadingComponent from "./components/LoadingComponent";
import ErrorComponent from "./components/ErrorComponent";
import QueryComponent from "./components/QueryComponent";

import "./App.css";

function App() {
  const [target, setTarget] = useState("splunk");
  const [format, setFormat] = useState("default");
  const [pipeline, setPipeline] = useState([]);
  const [rule, setRule] = useState("");

  const { query, loading, error, fetchData } = useQueryGenerator(
    target,
    format,
    pipeline,
    rule
  );

  useEffect(() => {
    fetchData(); // Trigger fetch when any of the inputs change
  }, [target, format, pipeline, rule, fetchData]);

  const handleInputChange = (name, value) => {
    switch (name) {
      case "target":
        setTarget(value);
        break;
      case "format":
        setFormat(value);
        break;
      case "pipeline":
        setPipeline(value);
        break;
      case "rule":
        setRule(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <div className="form-container">
          <div className="title">Ruleset Configurations</div>
          <FormComponent
            target={target}
            format={format}
            pipeline={pipeline}
            rule={rule}
            onInputChange={handleInputChange}
          />
        </div>

        <div className="result-container">
          <div className="title">Query</div>
          {loading && <LoadingComponent />}
          {error && <ErrorComponent error={error} />}
          {!loading && !error && query && <QueryComponent query={query} />}
        </div>
      </div>
    </div>
  );
}

export default App;
