import React from "react";
import { TARGET_LIST, FORMAT_LIST, PIPELINE_LIST } from "../data";
import "./FormComponent.css"; // Import the updated CSS file

const FormComponent = ({ target, format, pipeline, rule, onInputChange }) => {
  const handlePipelineChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    onInputChange("pipeline", selectedValues);
  };

  return (
    <form className="form-component-container">
      <div>
        <label>
          Backend:
          <select
            name="backend-input"
            value={target}
            onChange={(event) => onInputChange("target", event.target.value)}
          >
            {TARGET_LIST.map((backend) => (
              <option key={backend} value={backend}>
                {backend}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Format:
          <select
            name="format-input"
            value={format}
            onChange={(event) => onInputChange("format", event.target.value)}
          >
            {FORMAT_LIST.map((formatOption) => (
              <option key={formatOption} value={formatOption}>
                {formatOption}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Pipeline:
          <select
            name="pipeline-input"
            value={pipeline}
            onChange={handlePipelineChange}
            multiple
          >
            {PIPELINE_LIST.map((pipelineOption) => (
              <option key={pipelineOption} value={pipelineOption}>
                {pipelineOption}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Rule:
          <textarea
            name="rule-input"
            rows="15"
            cols="50"
            type="text"
            value={rule}
            onChange={(event) => onInputChange("rule", event.target.value)}
          />
        </label>
      </div>
    </form>
  );
};

export default FormComponent;
