#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os  # Add this line
from sigma_query_generator.main import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
