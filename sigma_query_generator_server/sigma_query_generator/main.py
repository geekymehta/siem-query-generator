
# Import necessary modules
import os
import yaml
import base64
from flask import Flask, render_template, request, Response
from flask_cors import CORS

# Import Sigma modules
from sigma.conversion.base import Backend
from sigma.plugins import InstalledSigmaPlugins
from sigma.collection import SigmaCollection
from sigma.exceptions import SigmaError

# Create a Flask app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) for the app
CORS(app)

# Autodiscover Sigma plugins
plugins = InstalledSigmaPlugins.autodiscover()
backends = plugins.backends
pipeline_resolver = plugins.get_pipeline_resolver()
pipelines = list(pipeline_resolver.list_pipelines())

# Define a route for the home page
@app.route("/")
def home():
    return "welcome to our api home"

# Define a route for Sigma rule conversion
@app.route("/sigma", methods=["POST"])
def convert():
    # Get parameters from the request
    rule = str(base64.b64decode(request.json["rule"]), "utf-8")
    print(rule)

    # Check if the input is valid YAML
    try:
        yaml.safe_load(rule)
    except:
        print("error")
        return Response(
            f"YamlError: Malformed YAML file", status=400, mimetype="text/html"
        )

    # Process additional parameters from the request
    pipeline = []
    if request.json["pipeline"]:
        for p in request.json["pipeline"]:
            pipeline.append(p)

    target = request.json["target"]
    format = request.json["format"]

    # Choose the appropriate backend based on the target
    backend_class = backends[target]
    processing_pipeline = pipeline_resolver.resolve(pipeline)
    backend: Backend = backend_class(processing_pipeline=processing_pipeline)

    try:
        # Convert Sigma rule using the selected backend
        sigma_rule = SigmaCollection.from_yaml(rule)
        result = backend.convert(sigma_rule, format)
        if isinstance(result, list):
            result = result[0]
    except SigmaError as e:
        return Response(f"SigmaError: {str(e)}", status=400, mimetype="text/html")

    # Return the conversion result
    return result

# Run the Flask app if the script is executed directly
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
